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