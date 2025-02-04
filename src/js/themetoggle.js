import $ from "jquery";
const toggleSwitch = document.querySelector('#ttogle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    console.log('fromMem "'+ currentTheme +'"')
  
    if (currentTheme === 'light') {
        toggleSwitch.checked = true;
        $(".tticon").text("dark_mode")
        //$(".videobanner").attr("src", "src/video/pottogravity.webm")
        console.log('applied "'+ currentTheme +'"')
    } else {
        $(".tticon").text("light_mode")
        //$(".videobanner").attr("src", "src/video/pottogravitydark.webm")
        console.log('applied "'+ currentTheme +'"')
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        //$(".videobanner").attr("src", "src/video/pottogravity.webm")
        $(".splash").addClass("splashanim")
        setTimeout((function () {
            $(".splash").removeClass("splashanim")
        }), 500)
        $(".tticon").text("dark_mode")
        console.log('addMem "light"')
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        //$(".videobanner").attr("src", "src/video/pottogravitydark.webm")
        $(".splash").addClass("splashanim")
        setTimeout((function () {
            $(".splash").removeClass("splashanim")
        }), 500)
        $(".tticon").text("light_mode")
        console.log('addMem "dark"')
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);