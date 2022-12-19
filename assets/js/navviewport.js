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
    
    
    var contact = $('#contact').offset().top - $(window).scrollTop();

    //BOOL
    var aboutbool;
    var createbool;
    var contactbool;
    var gallbool;
    var commbool;
    var triviabool;

    if (about <= 0) {
        aboutbool = true;
        //console.log("about active")
    } else {
        aboutbool = false;
    }

    if (create <= 0) {
        createbool = true;
        aboutbool = false;
        //console.log("create active")
    } else {
        createbool = false;
    }
    if (gall <= 0) {
        gallbool = true;
        //console.log("create active")
    } else {
        gallbool = false;
    }
    if (comm <= 0) {
        commbool = true;
        gallbool = false;
        //console.log("create active")
    } else {
        commbool = false;
    }
    if (trivia <= 0) {
        triviabool = true;
        commbool = false;
        //console.log("create active")
    } else {
        triviabool = false;
    }

    if (contact <= 0) {
        contactbool = true;
        creatbool = false;
        //console.log("comm active")
    } else {
        contactbool = false;
    }
    console.log('creatbool', createbool, '\n gallbool', gallbool, '\n commbool', commbool, '\n triviabool', triviabool )

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


    if (contactbool == true) {
        $('.s3').addClass('activestrike')
    } else {
        $('.s3').removeClass('activestrike')
    }
}
chapter();
$(window).scroll(chapter);