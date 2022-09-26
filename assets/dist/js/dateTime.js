
// Get Time & Date Span
const time_span = document.getElementById('time');
const day_span = document.getElementById('day');

// Preparing Time & Date Function
function timeDate() {
    var date = new Date();
    var time = date.toLocaleTimeString();
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var day = date.toLocaleDateString('en-US', options);
    time_span.innerHTML = time;
    day_span.innerHTML = day;
}


// Self-Invoked Main Function
(function () {

    setInterval(function () {
        timeDate();
    }, 1000);

})();