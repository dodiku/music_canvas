// many thanks to b2renger from https://github.com/processing/p5.js-sound/issues/34
// and all the guys from P5.js

var song, amp, fft;

var amplitude, normAmp; // will be used to set up the SPEED of the drawing
var beat, normBeat; // will be used ot set up the BRUSH SIZE & to change DIRECTION on peaks
var color, normColor; // will be used to set up the COLOR of the brush

var pAmp, pBeat, pColor = 0; // for the printData function

var brushStroke;
var brushSize;
var color;
var location;


var colorScale = d3.scaleLinear()
                .domain([0, 10000])
                .range([0,255]);

var ampScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0,255]);

var beatScale = d3.scaleLinear()
                .domain([0, 300])
                .range([0,30]);


function setup() {
  var canvas = createCanvas(600, 600);
  background(255);
  canvas.parent('place_canvas');
  // song = loadSound("tunes/radiohead.mp3", songLoaded, songError, songLoading);
  // song = loadSound("tunes/Moonage_Daydream.mp3", songLoaded, songError, songLoading);
  // song = loadSound("tunes/Under_Stars.mp3", songLoaded, songError, songLoading);
  // song = loadSound("tunes/Houses_of_the_Holy.mp3", songLoaded, songError, songLoading);
  song = loadSound("tunes/Hours.mp3", songLoaded, songError, songLoading);

  amp = new p5.Amplitude();
  fft = new p5.FFT();
}


function draw() {
  smooth();

  // amplitude
  amplitude = amp.getLevel();
  if (pAmp == 1){
    console.log('amplitude: ' + amplitude);
    console.log('normAmp: ' + normAmp);
  }

  // beat
  fft.analyze();
  beat = fft.getEnergy('lowMid'); // could be also fft.getEnergy('bass')
  if (pBeat == 1){
    console.log('beat: ' + beat);
    console.log('normBeat: ' + normBeat);
  }

  // color
  color = fft.getCentroid();
  if (pColor == 1){
    console.log('color: ' + color);
    console.log('normColor: ' + normColor);
  }

  normColor = colorScale(color);
  // console.log(normColor);

  normAmp = ampScale(amplitude);

  normBeat = beatScale(beat);

  // background(220);
  // ellipse(200,200,beat);

  var brushStroke = random(0, 20);
  var brushSize = normBeat;
  var color1 = random(1, 255);
	var color2 = random(1, 255);
	var color3 = random(1, 255);
	var location1 = random(1, 800);
	var location2 = random(1, 800);
	noStroke();
	fill(normColor, normColor/2, normAmp);
	ellipse(location1, location2, brushSize);

}



function songLoaded (){
  console.log('loaded successfuly');
  song.play();
}

function songError (){
  console.log('there was a problem loading the tune...');
}

function songLoading (){
  console.log('loading...');
}


function printData(value){
  if (value == 'all') {
    pAmp = 1;
    pBeat = 1;
    pColor = 1;
  }
  else if (value == 'amplitude'){
    pAmp = 1;
  }
  else if (value == 'beat'){
    pBeat = 1;
  }
  else if (value == 'color'){
    pColor = 1;
  }
  else if (value == 'stop'){
    pAmp = 0;
    pBeat = 0;
    pColor = 0;
  }
  else if (value == 'help'){
    console.log("to view all data: printData('all')");
    console.log("to view amplitude data: printData('apmlitude')");
    console.log("to view beat data: printData('beat')");
    console.log("to view color data: printData('color')");
    console.log("to stop all views: printData('stop')");
  }
  else {
    console.log('-- incorrect input --');
    console.log("to view all data: printData('all')");
    console.log("to view amplitude data: printData('apmlitude')");
    console.log("to view beat data: printData('beat')");
    console.log("to view color data: printData('color')");
    console.log("to stop all views: printData('stop')");
    console.log("to view help: printData('help')");
  }
}
