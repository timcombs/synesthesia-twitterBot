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
var ndarray = require('ndarray');
var getPixels  = require('get-pixels');

var T = new Twit(config);

//var userStream = T.stream('user');

//bots to listen to
var bots = ['699004549017677824', '2704554914'];

//stream follows @reverseocr bot - 
var botStream = T.stream('statuses/filter', {follow: bots});
console.log(botStream);

// logs this bots tweets to console each time it tweets
botStream.on('tweet', function (tweet) { console.log(tweet.text) });

// need to grab the url of the jpg out of the tweet
// then analyze the file with an npm pkg

// perhaps not npm package, but def need to analyze
// a 3 dimensional array
/*  r = red, g = green, b = blue, a = albedo,
    w = width = number of pixels in row, h = height = number of pixels in row
  [
    [[r00, g00, b00, a00], [r01, g01, b01, a01],...,[r0w, g0w, c0w, a0w]],
    [[r10, g10, b10, a10], [r11, g11, b11, a11],...,[r1w, g1w, c1w, a1w]],
    ...,
    [[rh0, gh0, bh0, ah0], [rh1, gh1, bh1, ah1],..., [rhw, ghw, chw, ahw]]
  ]
*/

//support MP4 video format with H264 format with AAC audio
//max file size is 512K and max length is 2:20
//Min resolution: 32 x 32 -- Max resolution: 1920 x 1200 (and 1200 x 1900)
//Aspect ratios: 1:2.39 - 2.39:1 range (inclusive)
//Max frame rate: 40 fps
//Max bitrate: 25 Mbps

// this might be helpful cuz it shows how to tweet with media!
// // post a tweet with media
// var b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' })
//
// // first we must post the media to Twitter
// T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//   // now we can assign alt text to the media, for use by screen readers and
//   // other text-based presentations and interpreters
//   var mediaIdStr = data.media_id_string
//   var altText = "Small flowers in a planter on a sunny balcony, blossoming."
//   var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

//   T.post('media/metadata/create', meta_params, function (err, data, response) {
//     if (!err) {
//       // now we can reference the media and post a tweet (media will attach to the tweet)
//       var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

//       T.post('statuses/update', params, function (err, data, response) {
//         console.log(data)
//       })
//     }
//   })
// })


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

//Timbre('square', {freq: 1600, mul:0.5}).play();
//Timbre('noise', {freq:1600, mul:0.25}).play();
// T("fnoise", {freq:T(function(count) {
//   return [220, 440, 880, 1760, 3520, 7040, 14080][count % 7];
// }), mul:0.15}).play();
// T("pink", {mul:0.50}).play();
// T("fnoise", {mul:5}).play();
// T("sin", {freq:879, mul:0.5}).play();
// T("sin", {freq:878, mul:0.5}).play();
// T("sin", {freq:870, mul:0.5}).play();
// T("sin", {freq:871, mul:0.5}).play();
//Timbre('sin', {freq:Timbre('pulse', {freq:(Math.floor(Math.random()*10)+1), add:100, mul:5}).kr(), mul:0.5}).play();
