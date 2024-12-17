(() => {
    const dataNSFW = localStorage.getItem("filterNSFW");
    const dataSketch = localStorage.getItem("filterSketch");
    const dataVersion = localStorage.getItem("filterVersion");
    const loadMoreButton = document.getElementById('loadMore');
    //console.log('dispGallery------------------------')
    //console.log('dataNSFW display:', dataNSFW)
    //console.log('dataSketch display:', dataSketch)
    //console.log('dataVersion display:', dataVersion)
    //console.log('-----------------------------------')
    console.log('dataNSFW display:', dataNSFW, '\ndataSketch display:', dataSketch, '\ndataVersion display:', dataVersion)
    console.log('init');


    if (dataNSFW === "displayed") {
        var excludeNSFW = false;
    } else {
        var excludeNSFW = true;
    }
    if (dataSketch === "displayed") {
        var excludeSketch = false;
    } else {
        var excludeSketch = true;
    }
    if (dataVersion === "displayed") {
        var excludeVersioning = false;
    } else {
        var excludeVersioning = true;
    }
    // Define filtering variables
    console.log('nsfw hidden', excludeNSFW, '\nsketch hidden', excludeSketch, '\nversioning hidden', excludeVersioning)



    // Store all display images
    let allDisplayImages = [];
    let losslessImages = [];

    async function fetchDisplay() {
        console.log('async fetchDisplay');
        try {
            $(".galleryLoadingInd").html('Hold on...').addClass('holdon');
            console.log('attempting to call');
            const response = await fetch('https://pottob2-dispgallery.pottoart.workers.dev/api/v1/list_all_files?maxFileCount=800');
            if (!response.ok) {
                $(".galleryLoadingInd").html("Bucket responded with " + response.status).removeClass('holdon');
                throw new Error('Something went wrong while trying to fetch files', response.status);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            $(".galleryLoadingInd").html("Something went horribly wrong: list_all_files: " + error.message).removeClass('holdon');
            console.error('*blows up json with mind*', error.message);
            return null;
        }
    }

    function loadImages(start, end) {
        const displayCount = allDisplayImages.slice(start, end);
        const latestWorkGrid = document.getElementById('latestWorks');
        const imgDataFragment = document.createDocumentFragment();

        displayCount.forEach(item => {
            const img = new Image();
            const losslessLinko = document.createElement('p');
            img.setAttribute('data-aos', 'zoom-in');
            img.setAttribute('class', 'imgs self cards b2Imgs');
            img.setAttribute('orbReact', 'true');
            //img.setAttribute('loading', 'lazy');
            img.src = item.urlLossy;
            img.alt = item.nameLossy; // remove file ext
            img.dataset.nsfw = item.nsfw ? 'true' : 'false';
            img.dataset.sketch = item.sketch ? 'true' : 'false';
            img.dataset.versioning = item.versioning ? 'true' : 'false';

            const matchingLossless = losslessImages.find(x => x.nameLossless === item.nameLossy);
            if (matchingLossless) {
                losslessLinko.textContent = 'lossless: ' + matchingLossless.urlLossless;
                img.dataset.lossless = matchingLossless.urlLossless;
            } else if (item.sketch) {
                losslessLinko.textContent = 'Sketch: ' + item.urlLossy;
            } else {
                losslessLinko.textContent = 'No lossless version available';
                img.dataset.lossless = false;
            }

            imgDataFragment.append(img);
        });
        console.log("Display Data:", displayCount);
        console.log("Lossless Data:", losslessImages);

        latestWorkGrid.appendChild(imgDataFragment);
    }

    fetchDisplay()
        .then(data => {
            if (data) {
                console.log('Fetched files:', data);
                console.log("filtering");
                // Data processing

                data.forEach(item => {
                    if (item.contentType.includes('image/')) {
                        if (item.name.includes('display/')) {
                            const nameVariable = 'nameLossy';
                            const urlDisplay = 'urlLossy';
                            const dateUploaded = 'date';
                            const isSketch = item.url.includes('sketch');
                            const isNSFW = item.url.includes('nsfw');
                            const hasVersioning = hasExtraFlags(item.name);

                            if ((!excludeNSFW || !isNSFW) && (!excludeVersioning || !hasVersioning) && (!excludeSketch || !isSketch)) {
                            // Apply filters
                                allDisplayImages.push({
                                    [nameVariable]: item.name.replace(/(?:display|lossless)\//, '').replace('nsfw/', '').replace('sketch/', '').split('.')[0],
                                    [urlDisplay]: item.url,
                                    [dateUploaded]: item.uploadTime,
                                    sketch: isSketch ? true : null,
                                    nsfw: isNSFW ? true : null,
                                    versioning: hasVersioning ? true : null,
                                });
                            }
                        } else if (item.name.includes('lossless/')) {
                            const nameVariable = 'nameLossless';
                            losslessImages.push({
                                [nameVariable]: item.name.replace(/(?:display|lossless)\//, '').replace('nsfw/', '').split('.')[0],
                                urlLossless: item.url,
                                date: item.uploadTime
                            });
                        }
                    }
                });

                allDisplayImages.sort((a, b) => new Date(b.date) - new Date(a.date));


                //DISP COUNT
                loadImages(0, 16);
                $(".galleryLoadingInd").fadeOut();
                $(loadMoreButton).fadeIn()

            } else {
                // Handle the case when data is null
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
            $(".galleryLoadingInd").html("Fetching was successful but something still went wrong, not good news tell you that now. "+ error).removeClass('holdon');
        });

    // use '<filename> -<any>' as trigger for "flags"
    function getFlags(input) {
        let ret = [];
        let entries = input.split(".").join(" ").split(" ");
        entries.forEach(entry => {
            if (entry.startsWith("-")) {
                ret.push(entry.substr(1));
            }
        });
        return ret;
    }

    // flag exception
    // check chain
    // noflag                               false
    // flag = "sfw"                         false
    // flag = (0 OR "default" OR "origin")  false
    // nocatch                              true
    //
    function hasExtraFlags(imgsFilename) {
        const flags = getFlags(imgsFilename);
        if (flags.length === 0) return false;
        if (flags.length === 1 && flags.includes("sfw")) return false;
        if (flags.includes("0" || "default" || "origin")) return false;
        return true;
    }
    
    // Loader
    let start = 16; // init start index for next batch
    let end = 24; // init end index for next batch
    
    function disableLoader () {
        //loadMoreButton.disabled = true;
        $(".wideGoTitle").html("Nothing else to load or limit reached!...")
        $(loadMoreButton).css('pointer-events', 'none')
        setTimeout(() => {
            $(loadMoreButton).fadeOut()
        }, 5000);
    }

    loadMoreButton.addEventListener('click', () => {
        console.log('loading more')
        console.log('end, ', end, " less equal ", "allDisplayImages, ", allDisplayImages.length, " = ", end <= allDisplayImages.length )

        if (end <= allDisplayImages.length) {
            loadImages(start, end);
            start += 8; // Increment start by 8 for next batch
            end += 8; // Increment end by 8 for next batch
            console.log('start, ', start, ' end, ', end)
        } else {
            loadImages(start, allDisplayImages.length);
            disableLoader()
        }
    });

})();
