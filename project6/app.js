const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
let brickArray = [];
let count = 0;
let gameTime = 0;

function getRandomArbitrary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
    this.visible = true;
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}

for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function drawCircle() {
  brickArray.forEach((brick) => {
    if (brick.visible && brick.touchingBall(circle_x, circle_y)) {
      count++;
      brick.visible = false;
      xSpeed *= 1;
      ySpeed *= -1;
      if (count == 10) {
        alert("遊戲結束，你花了" + Math.floor(gameTime) + "秒");
        clearInterval(game);
      }
    }
  });

  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  if (circle_x <= radius) {
    xSpeed *= -1;
  }

  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  if (circle_y <= radius) {
    ySpeed *= -1;
  }

  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }

  circle_x += xSpeed;
  circle_y += ySpeed;
  gameTime += 0.025;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.drawBrick();
    }
  });

  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, 200, ground_height);

  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
