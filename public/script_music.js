var song, amp;
// var amplitude = new Amplitude();

function setup() {
  createCanvas(400, 400);
  song = loadSound("tunes/Moonage_Daydream.mp3", songLoaded, songError, songLoading);
  amp = new p5.Amplitude();
}

function draw() {
  background(30, 132, 133, 4);
  smooth();
  console.log(amp.getLevel());
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
