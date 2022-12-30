function zooming() {
    $(".zoomindimmer").fadeIn(200), $(".zoomin").show(), $(".dynamicnav").addClass("navHide")
}
function zoomout() {
    $(".zoomincontent").attr("src", ""), $(".zoomindimmer").fadeOut(200), $(".zoomin").hide(), $(".dynamicnav").removeClass("navHide")
}
document.getElementById("daImg").addEventListener("galleryLoaded", (function (e) {
    console.log('ready')
    $(".daImgs, .imgs").click((function () {
        $(".zoomincontent").attr("src", $(this).attr("src"))
        zooming();
    }));
    $(".zoomincontent,.zoomin").click((function () {
        zoomout();
    }));
}));