let speed = 4;
let windows = [];
let windowsNum = 500;
let imgs = [];
let sound, soundLoop;
// let colors = ['orange', 'red', 'green', 'blue', 'white', 'purple', 'aqua']


function preload() {
  for (let i = 0; i < 6; i++) {
   imgs[i] = loadImage('microsoft-windows-' + i + '.png'); 
  }
  
  soundFormats('mp3', 'ogg');
  sound = loadSound('error.mp3');
}

class Window {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
    this.img = random(imgs);
  }
  
  update() {
    this.z = this.z - speed;
    
    if (this.z < 1) {
      this.z = width/2;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }
  
  show() {    
    let sx = map(this.x/this.z, 0, 1, 0, width/2);
    let sy = map(this.y/this.z, 0, 1, 0, height/2);
    
    let r = map(this.z, 0, width/2, 26, 4);

    image(this.img, sx, sy, r, r);
    // tint(this.color);
    
    this.pz = this.z;
  }
}

function setup() {
  createCanvas(600, 600);
    
  let intervalInSeconds = 0.5;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  soundLoop.start();

  
  for(let i=0; i < windowsNum; i++) {
    windows[i] = new Window();
  }
}

function draw() {
  background(0);
  translate(width/2, height/2);
  for(let i=0; i < windows.length; i++) {
    windows[i].update();
    windows[i].show();
  }
}

function onSoundLoop(timeFromNow) {
  delay = new p5.Delay();
  // delay.process() accepts 4 parameters:
  // source, delayTime (in seconds), feedback, filter frequency
  // delay.process(sound, 0.1, .3, 1200);
  sound.play();
}
