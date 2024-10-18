let fishX, fishY, fishSize;
let fishColor;
let fishX2, fishY2, fishSize2;
let fishColor2;
let aquariumName = "My Aquarium";
let foodX, foodY;
let foodDropped = false;
let bubbles = [];
let speed = 5


function setup() {
  createCanvas(800, 600);
  fishX = width / 2;
  fishY = height / 2;
  fishSize = 50;
  fishColor = color(200, 100, 10); 
  fishX2 = width / 4;
  fishY2 = height / 4;
  fishSize2 = 50;
  fishColor2 = color(173, 216, 230); 


  // Initialize bubbles
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(5, 15)
    });
  }
}


function draw() {
  background(50, 150, 200);
 
  // Display aquarium name
  textSize(24);
  fill(255);
  text(aquariumName, 10, 30);
 
  // Draw fish
  fill(fishColor);
  ellipse(fishX, fishY, fishSize, fishSize / 2);
  triangle(fishX - fishSize / 2, fishY, fishX - fishSize, fishY - fishSize / 4, fishX - fishSize, fishY + fishSize / 4);


  // Fish follows mouse
  fishX = lerp(fishX, mouseX, 0.05);
  fishY = lerp(fishY, mouseY, 0.05);


  // Draw bubbles
  for (let i = 0; i < bubbles.length; i++) {
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].size);
    bubbles[i].y -= 1;


    // Reset bubble to bottom if it goes off the top
    if (bubbles[i].y < 0) {
      bubbles[i].y = height;
    }
  }
 
  // Draw food
  if (foodDropped) {
    fill(255, 204, 0);
    ellipse(foodX, foodY, 10, 10);
    foodY += 2;
    if (foodY > height) {
      foodDropped = false;
    }
  }
 
  // Check if fish is near food
  if (dist(fishX, fishY, foodX, foodY) < fishSize / 2 && foodDropped) {
    fishColor = color(100, 200, 100);
    foodDropped = false;
  } else {
    fishColor = color(200, 100, 100);
  }

  // move second fish
  if(keyIsDown(LEFT_ARROW)) {
    fishX2 -= speed
  }
  if(keyIsDown(RIGHT_ARROW)) {
    fishX2 += speed
  }
  if(keyIsDown(UP_ARROW)) {
    fishY2 -= speed
  }
  if(keyIsDown(DOWN_ARROW)) {
    fishY2 += speed
  }

  // draw second fish
  fill(fishColor2);
  ellipse(fishX2, fishY2, fishSize2, fishSize2 / 2);
  triangle(fishX2 - fishSize2 / 2, fishY2, fishX2 - fishSize2, fishY2 - fishSize2 / 4, fishX2 - fishSize2, fishY2 + fishSize2 / 4);
  
}


function keyPressed() {
  // Drop food
  if (key === 'F' || key === 'f') {
    foodX = random(width);
    foodY = 0;
    foodDropped = true;
  }
}


