//const ntoggleSwitch = document.querySelector("#ntoggle");
//const currentNstate = localStorage.getItem("nstate");

//function nSwitch(event) {
//    if (event.target.checked) {
//        localStorage.setItem("nstate", "displayed");
//        //and do shit
//    } else {
//        localStorage.setItem("nstate", "hidden");
//        //do this fuck
//    }
//}
const nsfwSwitch = document.getElementById("nsfwFTT");
const sketchSwitch = document.getElementById("sketchFTT");
const versioningSwitch = document.getElementById("versioningFTT");

const dataNSFW = localStorage.getItem("filterNSFW");
const dataSketch = localStorage.getItem("filterSketch");
const dataVersion = localStorage.getItem("filterVersion");

//function checkGlobal() {
//    console.log('-----------------------------------')
//    console.log('dataNSFW display:', dataNSFW)
//    console.log('dataSketch display:', dataSketch)
//    console.log('dataVersion display:', dataVersion)
//    console.log('-----------------------------------')
//}

function switchUpdate(switchChange) {
    $("#reloadButton").addClass("reloadReady")
    let whichSwitch = this.id
    if (switchChange.target.checked) {
        switch (whichSwitch) {
            case "nsfwFTT":
                localStorage.setItem("filterNSFW", "displayed");
                $("#nsfw-FT").addClass('FTon');
                break;
            case "sketchFTT":
                localStorage.setItem("filterSketch", "displayed");
                $("#sketch-FT").addClass('FTon');
                break;
            case "versioningFTT":
                localStorage.setItem("filterVersion", "displayed");
                $("#versioning-FT").addClass('FTon');
                break;
            default:
                break;
        }
    } else {
        switch (whichSwitch) {
            case "nsfwFTT":
                localStorage.setItem("filterNSFW", "hidden");
                $("#nsfw-FT").removeClass('FTon');
                break;
            case "sketchFTT":
                localStorage.setItem("filterSketch", "hidden");
                $("#sketch-FT").removeClass('FTon');
                break;
            case "versioningFTT":
                localStorage.setItem("filterVersion", "hidden");
                $("#versioning-FT").removeClass('FTon');
                break;
            default:
                break;
        }
    }
    console.log("which: ", whichSwitch, "(displayed:", switchChange.target.checked, ")")
    //checkGlobal()

}

function setDefaultFallback() {
    $("#nsfw-FT").removeClass('FTon');
    nsfwSwitch.checked = false;
    localStorage.setItem("filterNSFW", "hidden");

    $("#sketch-FT").addClass('FTon');
    sketchSwitch.checked = true;
    localStorage.setItem("filterSketch", "displayed");
    
    $("#versioning-FT").addClass('FTon');
    versioningSwitch.checked = true;
    localStorage.setItem("filterVersion", "displayed");
}

if (dataNSFW === null || dataSketch === null || dataVersion === null) {
    setDefaultFallback();
} else {
    //checkGlobal();
    if ([dataNSFW, dataSketch, dataVersion].every(variable => variable === "hidden")) {
        setDefaultFallback();
    } else {
        if (dataNSFW === "displayed") {
            nsfwSwitch.checked = true;
            $("#nsfw-FT").addClass('FTon');
        } else {
            nsfwSwitch.checked = false;
            $("#nsfw-FT").removeClass('FTon');
        }
        if (dataSketch === "displayed") {
            sketchSwitch.checked = true;
            $("#sketch-FT").addClass('FTon');
        } else {
            sketchSwitch.checked = false;
            $("#sketch-FT").removeClass('FTon');
        }
        if (dataVersion === "displayed") {
            versioningSwitch.checked = true;
            $("#versioning-FT").addClass('FTon');
        } else {
            versioningSwitch.checked = false;
            $("#versioning-FT").removeClass('FTon');
        }
    }
}

$(".filterDropdown").click(function() {
    $(".filterDropdown").toggleClass('holdDrop')
    $(".filterDrop").toggleClass('dropped')
})

$("#reloadButton").click(function(){
    console.log("reloading")
    console.log("dataNSFW: ", dataNSFW, "dataSketch:", dataSketch, "dataVersion:", "dataVersion")
    location.reload();
    //if (dataNSFW && dataSketch && dataVersion === "hidden") {
    //    alert("what are you doing?")
    //} else {
    //}
})

document.querySelectorAll('.FTbutton input[type="checkbox"]').forEach(function (switches) {
    switches.addEventListener("change", switchUpdate, false)

})
//if (currentNstate) {
//    if (currentNstate === "displayed") {
//        ntoggleSwitch.checked = true;
//        //do shit
//    } else {
//        //nah
//    }
//}
//nsfwSwitch.addEventListener("change", nSwitch, false);