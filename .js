let fruits = [];
let score = 0;
let lives = 3;
let gameIsOver = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if (!gameIsOver) {
    // Draw the fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
      let fruit = fruits[i];
      fruit.update();
      fruit.display();

      // Check for slicing the fruit
      if (fruit.isSliced(mouseX, mouseY)) {
        score += 10;
        fruits.splice(i, 1);
      }

      // Check if the fruit reached the bottom of the screen
      if (fruit.y > height) {
        fruits.splice(i, 1);
        if (--lives <= 0) {
          gameIsOver = true;
        }
      }
    }

    // Display score and lives
    fill(0);
    textSize(18);
    text(`Score: ${score}`, 20, 30);
    text(`Lives: ${lives}`, 20, 50);

    // Add a new fruit every second
    if (frameCount % 60 === 0) {
      fruits.push(new Fruit());
    }

  } else {
    // Game Over screen
    fill(0);
    textSize(30);
    text("Game Over!", width / 2 - 70, height / 2 - 15);
    textSize(18);
    text(`Your score: ${score}`, width / 2 - 60, height / 2 + 15);
  }
}

function mousePressed() {
  if (!gameIsOver) {
    // Check for slicing fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
      let fruit = fruits[i];
      if (fruit.isSliced(mouseX, mouseY)) {
        score += 10;
        fruits.splice(i, 1);
      }
    }
  }
}

class Fruit {
  constructor() {
    this.x = random(width - 20);
    this.y = 0;
    this.size = random(20, 40);
    this.speed = random(2, 5);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isSliced(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.size / 2;
  }
}
