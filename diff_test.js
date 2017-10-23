require('colors')
var jsdiff = require('diff');
//https://github.com/kpdecker/jsdiff
const fs = require('fs');
var debug = true;

var one = 'beep boop';
var other = 'beep boob blah';
var diff = jsdiff.diffChars(one, other);

diff.forEach(function(part){
  // green for additions, red for deletions
  // grey for common parts
  var color = part.added ? 'green' :
    part.removed ? 'red' : 'grey';
//  process.stderr.write(part.value[color]);
});

//if (debug) { console.log(); }


function readJsonFile(whichFile) {
  if(debug) console.log('whichFile='+whichFile);

  var fromJSONObj = {};
  try {
    fromJSONObj = JSON.parse(fs.readFileSync(whichFile, 'utf8'));
  } catch(e) {
    fromJSONObj = {'fail':'true'};
  }
  return fromJSONObj;
}


var json1 = readJsonFile('mill1.json');
var json2 = readJsonFile('tony1.json');


var diffJson = jsdiff.diffJson(json1, json2);

//if(debug) { console.log(JSON.stringify(diffJson)); }
//if(debug) { console.log(diffJson); }

diffJson.forEach(function(part){
  var color = part.added ? 'green' : part.removed ? 'red' : 'grey';
  //if grey then is the same
  //if red then it is different and the text in green shows the difference
    if(debug) { console.log(part.value[color]); }
//  process.stderr.write(part.value[color]);
});

//console.log();
