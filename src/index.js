import $ from 'jquery';

let seconds = 0;

setInterval(() => {
    seconds = seconds + 1;
    $('#main').html("You've been on this page for " + seconds + " seconds!");
}, 1000)

