/*
This twitter bot is based on the amazing tutorials and repository by Daniel Shiffman
https://github.com/CodingTrain/Rainbow-Code/tree/master/bots
*/

var Timbre = require('timbre');
var Twit = require('twit');

// this code takes rgb values of a pixel and picks a ascii character
// from a string that best fits it? not totally sure of functionality
// const asciifyPixel = require("asciify-Pixel");

//can this be used to create "frames" for a video component?

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
var T = new Twit(config);

var userStream = T.stream('user');

//stream follows @reverseocr bot - huh?
//this syntax is not correct?
var ocrBotStream = T.stream('statuses/filter', {follow: 2865812463});

// logs each tweet to console as they is structured like
userStream.on('tweet', function (tweet) { console.log(tweet) });

// need to grab the url of the jpg out of the tweet
// then analyze the file with an npm pkg

//support MP4 video format with H264 format with AAC audio
//max file size is 512K and max length is 2:20
//Min resolution: 32 x 32 -- Max resolution: 1920 x 1200 (and 1200 x 1900)
//Aspect ratios: 1:2.39 - 2.39:1 range (inclusive)
//Max frame rate: 40 fps
//Max bitrate: 25 Mbps

//How The Music Is Structured
// need to find the x & y coordinates of each black pixel
// need to convert those black pixels into "notes" of certain lengths
    // each "song" will be same length correlated to the width of the jpg
    // each "note" will be played as it is "reached" on the x-axis
    // multiple "notes" at each x will be played as a chord
    // not sure how to deviate note length, if necessary
// need to grab text of tweet
    // not sure if i will convert each character to ascii code
    // not sure if i will "sing" text using speech synthesis

Timbre('square', {freq: 1600, mul:0.5}).play();
Timbre('noise', {freq:1600, mul:0.25}).play();
// T("fnoise", {freq:T(function(count) {
//   return [220, 440, 880, 1760, 3520, 7040, 14080][count % 7];
// }), mul:0.15}).play();
// T("pink", {mul:0.50}).play();
// T("fnoise", {mul:5}).play();
// T("sin", {freq:879, mul:0.5}).play();
// T("sin", {freq:878, mul:0.5}).play();
// T("sin", {freq:870, mul:0.5}).play();
// T("sin", {freq:871, mul:0.5}).play();
Timbre('sin', {freq:Timbre('pulse', {freq:(Math.floor(Math.random()*10)+1), add:100, mul:5}).kr(), mul:0.5}).play();
