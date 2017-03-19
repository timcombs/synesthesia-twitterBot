/*
This twitter bot is based on the amazing tutorials and repository by Daniel Shiffman
https://github.com/CodingTrain/Rainbow-Code/tree/master/bots
*/

var fs = require('fs');
var Twit = require('twit');
var ndarray = require('ndarray');
var getPixels  = require('get-pixels');

var config = require('./config');

var makeNoise = require('./make-noise');
var makeGrayer = require('./make-grayer');
var makeNoise = require('./make-ascii');
var postSong = require('./post-song');

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

    grayScaler(picArr);
    //write jpeg to file system
  });
};

//ndarray will let me take column slices of the jpg
//which should allow time to move along the horizontal axis from left to right
//each column slice should be a 1/4 or 1/8 beat of time - 1/2sec maximum
//analysis of the color or shade of the pixels in the slice are the tones played.

//grab each slice, manipulate the data and call makeNoise for each pixel of width
//var jpgWidth = jpg.width //or something
//for (var i = 0; i < jpgWidth; i++) {
//  //get slice using ndarray
//  //manipulate data
//  makeNoise(slice);
//}

