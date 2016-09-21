console.log('script_music');

function preload() {
  song = loadSound("tunes/radiohead.mp3");
  // mySound = loadSound("https://upload.wikimedia.org/wikipedia/commons/b/bb/Test_ogg_mp3_48kbps.wav");

}

function setup() {
  createCanvas(400, 400);
  // mySound.setVolume(0.1);
  song.play();
}

function draw() {
  background(30, 132, 133, 4);
  smooth();
  // mySound.play();
  }
