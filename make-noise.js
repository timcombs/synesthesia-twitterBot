var Timbre = require('timbre');

module.exports =
  function toneGen(slice){
    //slice would be best as an array right now
    //should be converted to numerical form prior to function call

    //How The Music Is Structured

    //imagine jpg is a 2d grid
    //x-axis is time moving from left to right
    //each set of tones will be played as each column is "reached" on the x-axis

    //how to make the tones 1/4 or 1/8 notes?

    //need to convert those black pixels into "notes" of certain lengths
        //each "song" length is correlated to the width of the jpg
        //for ex: if each note is 1/4sec long, 140 pixel width ~ 35sec long
        //multiple "tones" at each x will be played as a "chord""
        //how to deviate tone length? necessary?
    //need to find the x & y coordinates of each black pixel

    //white pixels are not played 
    //black pixels are actual notes?
    //grays are converted to noise

    //what does albedo do? should it trigger a delay or reverb effect?

    //var colHeight = jpg.height //this should probably be passed in
    for (var i = 0; i < colHeight; i++) {
      if (slice[i] === 255) {
        //play tone based on height in jpg
        //maybe play the pulse
      }else if (slice[i] !== 0) {
        //play noise based on grayscale
      }else{} //do nothing
    }

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

  }