// Image loader and filter management
class FilterManager {
    constructor() {
        this.filters = {
            nsfw: localStorage.getItem("filterNSFW") !== "displayed",
            sketch: localStorage.getItem("filterSketch") !== "displayed",
            version: localStorage.getItem("filterVersion") !== "displayed"
        };
    }

    applyFilters(images) {
        return images.filter(item => {
            return (!this.filters.nsfw || !item.nsfw) &&
                (!this.filters.sketch || !item.sketch) &&
                (!this.filters.version || !item.versioning);
        });
    }

    updateFilter(type, value) {
        this.filters[type] = value;
        localStorage.setItem(`filter${type.toUpperCase()}`, value ? "" : "displayed");
    }
}

class ImageLoader {
    constructor(batchSize = 8) {
        this.start = 16;
        this.batchSize = batchSize;
        this.loading = false;
        this.setupInfiniteScroll();
    }

    setupInfiniteScroll() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.loading) {
                this.loadMoreImages();
            }
        }, options);

        const loadMoreButton = document.getElementById('loadMore');
        if (loadMoreButton) {
            observer.observe(loadMoreButton);
        }
    }

    async loadMoreImages() {
        if (this.loading || this.start >= allDisplayImages.length) {
            return;
        }

        this.loading = true;
        const end = Math.min(this.start + this.batchSize, allDisplayImages.length);

        try {
            await loadImages(this.start, end);
            this.start = end;

            if (end >= allDisplayImages.length) {
                this.disableLoader();
            }
        } finally {
            this.loading = false;
        }
    }

    disableLoader() {
        const loadMoreButton = document.getElementById('loadMore');
        const titleElement = document.querySelector(".wideGoTitle");

        if (titleElement) {
            titleElement.textContent = "All images loaded!";
        }

        if (loadMoreButton) {
            loadMoreButton.style.pointerEvents = 'none';
            loadMoreButton.classList.add('fade-out');
        }
    }
}

// Main gallery functionality
(() => {
    // Global state
    let allDisplayImages = [];
    let losslessImages = [];
    const filterManager = new FilterManager();
    const imageLoader = new ImageLoader(8);
    const imageMetadata = new WeakMap();
    const flagsCache = new Map();

    // Helper functions
    function getFlags(input) {
        if (flagsCache.has(input)) {
            return flagsCache.get(input);
        }

        const flags = input.split(".")
            .join(" ")
            .split(" ")
            .filter(entry => entry.startsWith("-"))
            .map(entry => entry.substr(1));

        flagsCache.set(input, flags);
        return flags;
    }

    function hasExtraFlags(imgsFilename) {
        const flags = getFlags(imgsFilename);
        if (flags.length === 0) return false;
        if (flags.length === 1 && flags.includes("sfw")) return false;
        if (flags.includes("0") || flags.includes("default") || flags.includes("origin")) return false;
        return true;
    }

    // Image loading functionality
    function loadImages(start, end) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        delete img.dataset.src;
                        observer.unobserve(img);
                    }
                }
            });
        });

        const displayCount = allDisplayImages.slice(start, end);
        const latestWorkGrid = document.getElementById('latestWorks');
        const imgDataFragment = document.createDocumentFragment();

        displayCount.forEach(item => {
            const container = document.createElement('div');
            container.className = 'image-container';

            const img = new Image();
            img.setAttribute('data-aos', 'zoom-in');
            img.className = 'imgs self cards b2Imgs';
            img.setAttribute('orbReact', 'true');

            img.dataset.src = item.urlLossy;
            img.alt = item.nameLossy;
            img.setAttribute('aria-label', item.nameLossy);

            Object.assign(img.dataset, {
                nsfw: item.nsfw ? 'true' : 'false',
                sketch: item.sketch ? 'true' : 'false',
                versioning: item.versioning ? 'true' : 'false'
            });

            const matchingLossless = losslessImages.find(x => x.nameLossless === item.nameLossy);
            img.dataset.lossless = matchingLossless ? matchingLossless.urlLossless : 'false';

            container.appendChild(img);
            imgDataFragment.appendChild(container);
            imageObserver.observe(img);
        });

        latestWorkGrid.appendChild(imgDataFragment);
    }

    // API fetching
    async function fetchDisplay() {
        const loadingIndicator = document.querySelector(".galleryLoadingInd");

        try {
            loadingIndicator.textContent = 'Hold on...';
            loadingIndicator.classList.add('holdon');

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch(
                'https://pottob2-dispgallery.pottoart.workers.dev/api/v1/list_all_files?maxFileCount=800',
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            const errorMessage = error.name === 'AbortError'
                ? 'Request timed out. Please try again.'
                : `Error: ${error.message}`;

            loadingIndicator.textContent = errorMessage;
            loadingIndicator.classList.remove('holdon');
            throw error;
        }
    }

    // Data processing
    function processImages(data) {
        data.forEach(item => {
            if (item.contentType.includes('image/')) {
                if (item.name.includes('display/')) {
                    const isSketch = item.url.includes('sketch');
                    const isNSFW = item.url.includes('nsfw');
                    const hasVersioning = hasExtraFlags(item.name);

                    if ((!filterManager.filters.nsfw || !isNSFW) &&
                        (!filterManager.filters.version || !hasVersioning) &&
                        (!filterManager.filters.sketch || !isSketch)) {
                        allDisplayImages.push({
                            nameLossy: item.name.replace(/(?:display|lossless)\//, '').replace('nsfw/', '').replace('sketch/', '').split('.')[0],
                            urlLossy: item.url,
                            date: item.uploadTime,
                            sketch: isSketch || null,
                            nsfw: isNSFW || null,
                            versioning: hasVersioning || null,
                        });
                    }
                } else if (item.name.includes('lossless/')) {
                    losslessImages.push({
                        nameLossless: item.name.replace(/(?:display|lossless)\//, '').replace('nsfw/', '').split('.')[0],
                        urlLossless: item.url,
                        date: item.uploadTime
                    });
                }
            }
        });

        allDisplayImages.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Initialize the application
    async function initialize() {
        try {
            const data = await fetchDisplay();
            if (!data) return;

            processImages(data);
            loadImages(0, 16);

            document.querySelector(".galleryLoadingInd")?.classList.add('fade-out');
            document.getElementById('loadMore')?.classList.remove('hidden');
        } catch (error) {
            console.error('Initialization failed:', error);
        }
    }

    // Start the application
    initialize();
})();