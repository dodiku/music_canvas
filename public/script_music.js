// many thanks to b2renger from https://github.com/processing/p5.js-sound/issues/34
// and all the guys from P5.js

var song, amp, fft;

var amplitude; // will be used to set up the SPEED of the drawing
var beat; // will be used ot set up the BRUSH SIZE & to change DIRECTION on peaks
var color; // will be used to set up the COLOR of the brush

var pAmp, pBeat, pColor = 0; // for the printData function


function setup() {
  createCanvas(400, 400);
  song = loadSound("tunes/Moonage_Daydream.mp3", songLoaded, songError, songLoading);
  amp = new p5.Amplitude();
  fft = new p5.FFT();
}


function draw() {
  // smooth();

  // amplitude
  amplitude = amp.getLevel();
  if (pAmp == 1){
    console.log('amplitude: ' + amplitude);
  }

  // beat
  fft.analyze();
  beat = fft.getEnergy('lowMid'); // could be also fft.getEnergy('bass')
  if (pBeat == 1){
    console.log('beat: ' + beat);
  }

  // color
  color = fft.getCentroid();
  if (pColor == 1){
    console.log('color: ' + color);
  }

  background(30, 132, 133, 4);
  ellipse(200,200,beat);

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
