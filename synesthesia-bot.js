/*
This twitter bot is based on the amazing tutorials and repository by Daniel Shiffman
https://github.com/CodingTrain/Rainbow-Code/tree/master/bots
*/

var Timbre = require('timbre');
var Twit = require('twit');
var fs = require('fs');

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

console.log('synesthesia bot is now started:');

var T = new Twit(config);

//bots to listen to
// 69... = deSolidState, 27... = reverseocr
var bots = ['699004549017677824', '2704554914'];

//stream follows @reverseocr bot & deSolidState
var botStream = T.stream('statuses/filter', { follow: bots });

// logs the bots tweets to console each time it tweets
botStream.on('tweet', tweetEvent);

// callback function that runs once tweet is "heard"
function tweetEvent(tweet) {
  //git url of jpg from tweet
  var jpg = tweet.entities.media[0].media_url;

  // then analyze the file with an npm pkg
  getPixels(jpg, function(err, pixels) {
    if(err) {
      console.log('bad path or no media present', jpg);
      return;
    }
    console.log('jpg loaded', pixels.shape, pixels.shape.slice());
    console.log(pixels, pixels.data);
    
    //picArr is 1 string of 2 digit hex values
    //the rgba values of each pixel in hex concatenated together
    var picArr = pixels.data.toString('hex');
    //fs.writeFile('give-it.txt', picArr); //for testing

    //use string methods to take the digits in groups of 8
    //1st 2digits are r, 2nd 2 are g, 3rd 2 are b, last 2 are albedo
    //to grayscale the image
    //slice the 1st 2digits, convert to decimal
    //then 2nd 2 - convert, then 3rd 2 - convert, then 4th - DO NOT CONVERT
    //add 1st 3 together then divide by three - convert back to hex
    //concat the avg 3 times to new string - concat 4th
    //then repeat until all pixels converted

    //turn new string back into buffer
    //convert buffer back into jpeg

    grayScaler(picArr);
    //write jpeg to file system
  });
};

function grayScaler(str) {
  var grayStr = '';
  var rgbAvgStr = '';
  var pixel = '';

  while (str) {
    var pixelR = parseInt(str.slice(0, 2), 16);
    var pixelG = parseInt(str.slice(2, 4), 16);
    var pixelB = parseInt(str.slice(4, 6), 16);
    var pixelA = str.slice(6, 8);
    str = str.slice(8);

    //if going this route, need to round down to integer Math.ceil
    //this needs to be a bit more complex cuz if the hex number is under 10
    //this will only make it a single digit, need to add the leading 0
    rgbAvgStr = Math.ceil(((pixelR + pixelG + pixelB) / 3)).toString(16);
    grayStr += rgbAvgStr + rgbAvgStr + rgbAvgStr + pixelA;
  }
  
  fs.writeFile('grayed.txt', grayStr); //for testing
}
                                               

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

//ndarray will let me take column slices of the jpg
//which should allow time to move along the horizontal axis from left to right
//each column slice can be a 1/4 or 1/8 beat of time
//analysis of the color or shade of the pixels in the slice are the tones played.

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
