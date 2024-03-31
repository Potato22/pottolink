$(function () {

    var $win = $(window);
    var winH = $win.height(); // window height

    $win.on("scroll", function () {
        if ($(this).scrollTop() > winH) {
            //console.log('navOff')
            $('.dynamicnav').removeClass('navOff');
        } else {
            //console.log('navOn')
            $('.dynamicnav').addClass('navOff');
        }
    }).on("resize", function () { // read window size change
        winH = $(this).height(); // update height value
    });
});
$(function () {
    $('.creation').click(function () {
        $('.dimmer').fadeIn(300);
        $('.creationdialog').addClass('cdactive');
    })
    $('.xcont, .cbutton').click(function () {
        $('.creationdialog').removeClass('cdactive');
        $('.dimmer').fadeOut(300);
    })
})

function chapter() {
    //calc offset
    var about = $('#about').offset().top - $(window).scrollTop();

    var create = $('#create').offset().top - $(window).scrollTop();
    var gall = $('#gall').offset().top - $(window).scrollTop();
    var comm = $('#comm').offset().top - $(window).scrollTop();
    var trivia = $('#trivia').offset().top - $(window).scrollTop();
    var extra = $('#threed').offset().top - $(window).scrollTop();
    
    

    //BOOL
    var aboutbool;
    var createbool;
    var gallbool;
    var commbool;
    var triviabool;
    var extrabool;

    if (about <= 0) {
        aboutbool = true;
        //console.log("about active")
    } else {
        aboutbool = false;
    }

    if (create <= 0) {
        createbool = true;
        aboutbool = false;
    } else {
        createbool = false;
    }

    if (gall <= 0) {
        gallbool = true;
    } else {
        gallbool = false;
    }

    if (comm <= 0) {
        commbool = true;
        gallbool = false;
    } else {
        commbool = false;
    }

    if (trivia <= 0) {
        triviabool = true;
        commbool = false;
    } else {
        triviabool = false;
    }

    if (extra <= 0) {
        extrabool = true;
        triviabool = false;
    } else {
        extrabool = false;
    }

    console.log('creatbool', createbool, '\n gallbool', gallbool, '\n commbool', commbool, '\n triviabool', triviabool, '\n extrabool', extrabool )
    //console.log('createbool %s, gallbool %s, triviabool %s', createbool, gallbool, triviabool, extrabool)

    if (aboutbool == true) {
        $('.s1').addClass('activestrike')
    } else {
        $('.s1').removeClass('activestrike')
    }

    if (createbool == true) {
        $('.s2').addClass('activestrike')
    } else {
        $('.s2').removeClass('activestrike')
    }
    if (gallbool == true) {
        $('.s2-1').addClass('blockactive')
    } else {
        $('.s2-1').removeClass('blockactive')
    }

    if (commbool == true) {
        $('.s2-2').addClass('blockactive')
    } else {
        $('.s2-2').removeClass('blockactive')
    }

    if (triviabool == true) {
        $('.s2-3').addClass('blockactive')
    } else {
        $('.s2-3').removeClass('blockactive')
    }

    if (extrabool == true) {
        $('.s2-4').addClass('blockactive')
    } else {
        $('.s2-4').removeClass('blockactive')
    }
}
chapter();
$(window).scroll(chapter);