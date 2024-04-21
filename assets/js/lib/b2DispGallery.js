(() => {
    console.log('init')
    async function fetchDisplay() {
        console.log('async fetchDisplay')
        try {
            //call
            $(".galleryLoadingInd").html('Hold on...').addClass('holdon');
            console.log('attempting to call')
            const response = await fetch('https://pottob2-dispgallery.pottoart.workers.dev/api/v1/list_all_files');
            if (!response.ok) {
                $(".galleryLoadingInd").html("Bucket responsed with " + response.status).removeClass('holdon');
                throw new Error('Something went wrong while trying to fetch files', response.status);
            }
            //await json return
            const data = await response.json();
            return data;
        } catch (error) {
            $(".galleryLoadingInd").html("Something went horribly wrong: " + error.message).removeClass('holdon');
            console.error('*blows up json with mind*', error.message);
            return null;
        }
    }
    fetchDisplay()
        .then(data => {
            if (data) {
                console.log('Fetched files:', data);
                console.log("delivered")
                console.log("filtering")
                //data processing
                const displayImages = [];
                const losslessImages = [];

                data.forEach(item => {
                    if (item.contentType.includes('image/')) {
                        let nameVariable, urlDisplay, dateUploaded, nsfw;

                        //function hasExtraFlags(imgsFilename) {
                        //    // detect -flags but exclude -sfw
                        //    const regex = / -\w+/g;
                        //    const flags = imgsFilename.match(regex);
                        //
                        //    if (flags) {
                        //        const sfwIndex = flags.findIndex(flag => flag.trim() === "-sfw");
                        //        if (sfwIndex !== -1 && flags.length === 1) {
                        //            // sfw only; false
                        //            return false;
                        //        } else {
                        //            // sfw + other flags; true
                        //            return true;
                        //        }
                        //    } else {
                        //        return false; //no flag
                        //    }
                        //}
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
                        function hasExtraFlags(imgsFilename) {
                            // detect -flags but exclude -sfw
                            const flags = getFlags(imgsFilename);
                            console.log(item.name, flags)
                            // No flags
                            if (flags.length === 0) return false;
                            // Flags but only SFW
                            if (flags.length === 1 && flags.includes("sfw")) return false;
                            // Has flags (not just SFW)
                            return true;
                        }

                        if (item.name.includes('display/')) {
                            nameVariable = 'nameLossy';
                            urlDisplay = 'urlLossy';
                            dateUploaded = 'date';
                            displayImages.push({
                                [nameVariable]: item.name.replace(/(?:display|lossless)\//, '').replace('nsfw/', '').replace('sketch/', '').split('.')[0],
                                [urlDisplay]: item.url,
                                [dateUploaded]: item.uploadTime,
                                sketch: item.url.includes('sketch') ? true : null,
                                nsfw: item.url.includes('nsfw') ? true : null,
                                versioning: hasExtraFlags(item.name) ? true : null,
                            });
                        } else if (item.name.includes('lossless/')) {
                            nameVariable = 'nameLossless';
                            losslessImages.push({
                                [nameVariable]: item.name.replace(/(?:display|lossless)\//, '').replace('nsfw/', '').split('.')[0],
                                urlLossless: item.url,
                                date: item.uploadTime
                            });
                        }
                        //console.log(item.name, hasExtraFlags(item.name))
                    }
                });

                displayImages.sort((a, b) => new Date(b.date) - new Date(a.date));
                const displayCount = displayImages.slice(0, 12);

                console.log("Display Data:", displayCount);
                console.log("Lossless Data:", losslessImages);

                const latestWorkGrid = document.getElementById('latestWorks');
                const imgDataFragment = document.createDocumentFragment();

                displayCount.forEach(item => {
                    const img = new Image();
                    const losslessLinko = document.createElement('p');
                    img.setAttribute('data-aos', 'zoom-in')
                    img.setAttribute('class', 'imgs cards imgcard b2Imgs')
                    img.setAttribute('orbReact', 'true')
                    img.setAttribute('loading', 'lazy')
                    img.src = item.urlLossy;
                    img.alt = item.nameLossy; // remove file ext
                    img.dataset.flag = item.nsfw ? 'true' : 'false';
                    img.dataset.sketch = item.sketch ? 'true' : 'false';
                    img.dataset.versioning = item.versioning ? 'true' : 'false';

                    //TODO: add DL button

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

                    img.dataset.lossless = losslessImages.find(x => x.nameLossless === item.nameLossy) ?
                        losslessImages.find(x => x.nameLossless === item.nameLossy).urlLossless :
                        false;
                    imgDataFragment.append(img);
                    //imgDataFragment.append(losslessLinko); // appended the paragraph element
                });

                latestWorkGrid.replaceChildren(imgDataFragment);
                $(".galleryLoadingInd").fadeOut()

            } else {
                //alert("Either something went horribly-horribly wrong on Potto's B2 or the bucket is just that empty that nothing gets listed. One is worse than the other. Wondering how on earth did they managed to mess that up? Honestly string theory might just be more comprehensive than their head.");
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
})();