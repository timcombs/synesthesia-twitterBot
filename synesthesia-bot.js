var T = require("timbre");
var Twit = require("twit");

// this code takes rgb values of a pixel and picks a ascii character
// from a string that best fits it? not totally sure of functionality
// const asciifyPixel = require("asciify-Pixel");

// console.log(asciifyPixel({
//     r: 255
//   , g: 255
//   , b: 255
//   , a: 0.9
// },  {
//     pixels: " .,:;i1tfLCG08@"
// }));

// const asciifier = new asciifyPixel.Asciifier({
//     pixels: " .,:;i1tfLCG08@"
//   , colored: false
// });

// console.log(asciifier.asciify({
//     r: 255
//   , g: 200
//   , b: 100
// }).toString());

// console.log(asciifier.asciify({
//     r: 255
//   , g: 255
//   , b: 255
// }, {
//   colored: true
// }).toString());

var config = require('./config');
var Tw = new Twit(config);

var stream1 = Tw.stream('user');

// stream follows @reverseocr bot
var stream1 = Tw.stream('statuses/filter', {follow: 2865812463});

// logs each tweet to console as they happen
stream1.on('tweet', function (tweet) { console.log(tweet) });

// need to grab the url of the jpg out of the tweet
// need to find the x & y coordinates of each black pixel
// need to convert those black pixels into "notes" of certain lengths
    // each "song" will be same length correlated to the width of the jpg
    // each "note" will be played as it is "reached" on the x-axis
    // multiple "notes" at each x will be played as a chord
    // not sure how to deviate note length, is necessary
// need to grab text of tweet
    // not sure if i will convert each character to ascii code
    // not sure if i will "sing" text using speech synthesis

T("square", {freq: 1600, mul:0.5}).play();
T("noise", {freq:1600, mul:0.25}).play();
// T("fnoise", {freq:T(function(count) {
//   return [220, 440, 880, 1760, 3520, 7040, 14080][count % 7];
// }), mul:0.15}).play();
// T("pink", {mul:0.50}).play();
// T("fnoise", {mul:5}).play();
// T("sin", {freq:879, mul:0.5}).play();
// T("sin", {freq:878, mul:0.5}).play();
// T("sin", {freq:870, mul:0.5}).play();
// T("sin", {freq:871, mul:0.5}).play();
T("sin", {freq:T("pulse", {freq:(Math.floor(Math.random()*10)+1), add:100, mul:5}).kr(), mul:0.5}).play();
