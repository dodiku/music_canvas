// many thanks to b2renger from https://github.com/processing/p5.js-sound/issues/34
// and all the guys from P5.js

var amp, fft;

var amplitude, normAmp; // will be used to set up the SPEED of the drawing
var beat, normBeat; // will be used ot set up the BRUSH SIZE & to change DIRECTION on peaks
var color, normColor; // will be used to set up the COLOR of the brush

var pAmp, pBeat, pColor = 0; // for the printData function

var brushStroke;
var brushSize;
var color;
var location;

var currentlyPlaying = 1;


var colorScale = d3.scaleLinear()
                .domain([0, 10000])
                .range([0,255]);

var ampScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0,255]);

var beatScale = d3.scaleLinear()
                .domain([0, 300])
                .range([0,30]);

var songButton1, songButton2, songButton3, songButton4, songButton5;


function setup() {
  var canvas = createCanvas(600, 400);
  background(255);
  canvas.parent('place_canvas');

  amp = new p5.Amplitude();
  fft = new p5.FFT();

  songButton1 = select('#tune1');
  songButton2 = select('#tune2');
  songButton3 = select('#tune3');
  songButton4 = select('#tune4');
  songButton5 = select('#tune5');

  song = loadSound("tunes/Moonage_Daydream.mp3", songLoaded, songError, songLoading);

  songButton1.mousePressed(function(){
    console.log('song 1 was clicked');
    song.stop();
    playSong(1);
  });

  songButton2.mousePressed(function(){
    console.log('song 2 was clicked');
    song.stop();
    playSong(2);
  });

  songButton3.mousePressed(function(){
    console.log('song 3 was clicked');
    song.stop();
    playSong(3);
  });

  songButton4.mousePressed(function(){
    console.log('song 4 was clicked');
    song.stop();
    playSong(4);
  });

  songButton5.mousePressed(function(){
    console.log('song 5 was clicked');
    song.stop();
    playSong(5);
  });
}

function playSong (value){
  if (value == 1) {
    song = loadSound("tunes/Moonage_Daydream.mp3", songLoaded, songError, songLoading);
  }
  else if (value == 2) {
    song = loadSound("tunes/radiohead.mp3", songLoaded, songError, songLoading);
  }
  else if (value == 3) {
    song = loadSound("tunes/Houses_of_the_Holy.mp3", songLoaded, songError, songLoading);
  }
  else if (value == 4) {
    song = loadSound("tunes/Hours.mp3", songLoaded, songError, songLoading);
  }
  else if (value == 5) {
    song = loadSound("tunes/Under_Stars.mp3", songLoaded, songError, songLoading);
  }
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
  normAmp = ampScale(amplitude);
  normBeat = beatScale(beat);

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

function songLoaded (value){
  song.play();
  if (value.url == "tunes/Moonage_Daydream.mp3"){
    changeColor(1);
  }
  else if (value.url == "tunes/radiohead.mp3") {
    changeColor(2);
  }
  else if (value.url == "tunes/Houses_of_the_Holy.mp3") {
    changeColor(3);
  }
  else if (value.url == "tunes/Hours.mp3") {
    changeColor(4);
  }
  else if (value.url == "tunes/Under_Stars.mp3") {
    changeColor(5);
  }
  var pacman = select('#pacman');
  pacman.style("background-image", "url('')");
  pacman.style("background-size", "30px 30px");
}

function changeColor(number) {

  // cleaning...
  var tune = "#tune"+currentlyPlaying;
  var name = "#name"+currentlyPlaying;
  var button = "#button"+currentlyPlaying;

  tune = select(tune);
  tune.style("background-color", '#FFF796');

  name = select(name);
  name.style("color", '#F9A03F');

  button = select(button);
  button.style("background-image", "url('')");
  button.style("background-size", "30px 30px");


  // painting...
  tune = "#tune"+number;
  name = "#name"+number;
  button = "#button"+number;

  tune = select(tune);
  tune.style("background-color", '#F9A03F');

  name = select(name);
  name.style("color", '#FFF796');

  button = select(button);
  button.style("background-image", "url('images/Triangle.png')");
  button.style("background-size", "30px 30px");

  // saving currently playing track
  currentlyPlaying = number;
}

function songError (){
  console.log('there was a problem loading the tune...');
}

function songLoading (value){
  console.log('loading...');
  var pacman = select('#pacman');
  pacman.style("background-image", "url('images/pacman.gif')");
  pacman.style("background-size", "30px 30px");
}



// === print function ===


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
