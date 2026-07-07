"use strict"




// let w_width;
// let w_height;
let circle_x;
let circle_y;



let theta;
let theta_step;

let center_x
let center_y
let radius_step

let r;

let hue_start;
let hue_inc;

let can;
var capturer;
let duration;
let num_frames;
let min_radius;
let fps;

let h;
let w;

let save_video;

function setup() {
  fps = 30

  duration = 7
  num_frames = duration * fps

  // h =  1080 
  // w = 1920

  h = windowHeight
  w = windowWidth


  // capturer = new CCapture( { format: 'webm' , framerate: fps, height: 1080, width:1920} );
  // capturer = new CCapture({ format: 'webm', framerate: fps, quality: 100 });

  can = createCanvas(w, h).canvas;

  // w_width = windowWidth;
  // w_height = windowHeight;
  circle_x = w / 2;
  circle_y = h / 2;


  // r = w * 0.3;



  // theta = 0

  // theta_step = 0 // is cool


  center_x = w / 2;
  center_y = h / 2;

  // can = createCanvas(windowWidth, windowHeight).canvas;
  // can = createCanvas(1920, 1080).canvas;



  save_video = false;

  // frameRate(30)

  strokeWeight(1);
  // strokeWeight(0.5);

  colorMode(HSB);


  noFill();

  theta_step = 1.2512
  theta_step = 0.01
  
  
  
  
  radius_step = 0.161
  radius_step = 0.3
  
  min_radius = h * 0.4

}



function draw() {
  if (save_video && frameCount == 1) {
    console.log("cap started")
    capturer.start();
  }

  hue_start = 0
  
  hue_inc = 0.49





  // r = w * 0.275;
  // r = w * 0.575;

  // r = h * 1;
  r = h * 1;
  
  theta = 0

  clear()
  background(255)

  var counter = 0

  // console.log(num_frames - frameCount)
  // console.log(num_frames - frameCount)
  while (r > min_radius) {
    counter += 1

    // stroke(hue_start, 100, 100, 0.15);
    stroke(hue_start, 100, 100, 0.2);


    circle(circle_x, circle_y, 1000);
    circle_x = center_x + r * cos(theta)
    circle_y = center_y + r * sin(theta)
    theta += theta_step


    r = r - radius_step

    hue_start = (hue_start + hue_inc) % 300;

    // if (hue_start == 360) {
      // hue_inc = hue_inc * - 1;
    // } else if (hue_start == 0) {
      // hue_inc = hue_inc * - 1;
    // }
  }
  
  theta_step = theta_step + 0.000007
  // theta_step = theta_step + 0.0001
  

  // if (save_video && frameCount < num_frames) {
  //   capturer.capture(can)
  //   console.log("frame captured")

  // } else if (save_video && frameCount == num_frames) {
  //   console.log('ENDENDENDENDENDEND')
  //   capturer.stop()
  //   capturer.save()
  //   noLoop()

  // }
  // console.log("num circl")
  // console.log(counter)
}





