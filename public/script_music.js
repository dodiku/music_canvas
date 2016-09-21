// change direction according to

var song, amp, fft;
var pAmp = 0; // to be cleaned
var pEnergy = 0; // to be cleaned



function printAmp(value){
  if (value == 'on'){
    pAmp = 1;
  }
  else {
    pAmp = 0;
  }
}

function printEnergy(value){
  if (value == 'on'){
    pEnergy = 1;
  }
  else {
    pEnergy = 0;
    }
  }

function getData(){
  console.log('waveform() -- ');
  console.log(fft.waveform());

  var ana = fft.analyze();
  console.log('analyze() -- ');
  console.log(ana);
  console.log('getEnergy() -- ');
  // ana = ana.getEnergy();
  // console.log(ana);
  console.log(fft.getEnergy('bass'));
  // console.log(fft.analyze().getEnergy('bass'));
  console.log('getCentroid() -- ');
  console.log(fft.getCentroid());
  console.log('smooth() -- ');
  // console.log(fft.smooth());
  // console.log('end analysis');
}

function setup() {
  createCanvas(400, 400);
  song = loadSound("tunes/Moonage_Daydream.mp3", songLoaded, songError, songLoading);
  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(30, 132, 133, 4);
  smooth();
  if (pAmp == 1){
    console.log(amp.getLevel());
  }
  if (pEnergy == 1){
    fft.analyze();
    console.log(fft.getEnergy('lowMid'));
  }
  ellipse(200,200,fft.getEnergy('bass'));
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
