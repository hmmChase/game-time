// const Gamepiece = require('./Gamepiece.js');
// const Game = require('./Game.js');

class Spaceship {
  constructor() {
    // super(x, y, radius, dx, dy);
    this.x = 500;
    this.y = 300;
    this.radius = 30;
    this.dx = 20;
    this.dy = 20;
    this.angle = 0;
    this.alive = true;
    return this;
  }

  draw(ctx) {

    const img = new Image();

    img.src = './images/ufo.png';
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);

    ctx.drawImage(img, -30, -30, 60, 60);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, -5, 45, 10);
    ctx.restore();

    return this;
  }

  moveLeft() {
    this.x -= this.dx;
  }

  moveRight() {
    this.x += this.dx;
  }

  moveUp() {
    this.y -= this.dy;
  }

  moveDown() {
    this.y += this.dy;
  }

  // moveDownLeft() {
  //   this.x -= this.dx;
  //   this.y += this.dy;
  // }

  // moveUpLeft() {
  //   this.x -= this.dx;
  //   this.y -= this.dy;
  // }

  // moveRightUp() {
  //   this.x += this.dx;
  //   this.y -= this.dy;
  // }

  // moveLeftUp() {
  //   this.x -= this.dx;
  //   this.y -= this.dy;
  // }

  updateCanon(mouseX, mouseY, canvas) {
    // console.log('mouse X:', mouseX)
    // console.log('mouse Y:', mouseY)
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;

    this.angle = Math.atan2(dy, dx);
    this.update(canvas);
    return this;
  }

  // fireBullet() {
  //   let dx = Math.cos(this.angle)
  //   let dy = Math.sin(this.angle)

  //   fireBullet(this.x, this.y, dx, dy)
  // }

  update(canvas) {
    if (this.x - this.radius > canvas.width) {
      this.x = 0 - this.radius;
    } else if (this.x + this.radius < 0) {
      this.x = canvas.width + this.radius;
    }
    if (this.y - this.radius > canvas.height) {
      this.y = 0 - this.radius;
    } else if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
    }
    return this;
  }
}

module.exports = Spaceship;