
var overlay = document.getElementById('loading-overlay');
var spinner = document.getElementById('spinner-border');

window.addEventListener('load', function () {
    $(overlay).fadeOut(2000);
    $(spinner).fadeOut(1000);
});
