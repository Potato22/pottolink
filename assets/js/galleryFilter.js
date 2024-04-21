const nsfwToggle = document.querySelector('#nsfw-toggle');
const sketchToggle = document.querySelector('#sketch-toggle');
const versionToggle = document.querySelector('#version-toggle');
const currentFilterConf = localStorage.getItem('filterConf');

//defaults
var filterConf = {
    "nsfw": false,
    "sketch": true,
    "version": false
}


if (currentFilterConf) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    console.log('fromMem "'+ currentTheme +'"')
  
    if (currentTheme === 'light') {
        toggleSwitch.checked = true;
        $(".icon").text("dark_mode")
        //$(".videobanner").attr("src", "assets/video/pottogravity.webm")
        console.log('applied "'+ currentTheme +'"')
    } else {
        $(".icon").text("light_mode")
        //$(".videobanner").attr("src", "assets/video/pottogravitydark.webm")
        console.log('applied "'+ currentTheme +'"')
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        //$(".videobanner").attr("src", "assets/video/pottogravity.webm")
        $(".splash").addClass("splashanim")
        setTimeout((function () {
            $(".splash").removeClass("splashanim")
        }), 500)
        $(".icon").text("dark_mode")
        console.log('addMem "light"')
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        //$(".videobanner").attr("src", "assets/video/pottogravitydark.webm")
        $(".splash").addClass("splashanim")
        setTimeout((function () {
            $(".splash").removeClass("splashanim")
        }), 500)
        $(".icon").text("light_mode")
        console.log('addMem "dark"')
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);