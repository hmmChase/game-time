const Gamepiece = require('./Gamepiece.js');

class Spaceship extends Gamepiece {
  constructor(x, y, radius, dx, dy) {
    super(...arguments);
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

  updateCanon(mouseX, mouseY, canvas) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;

    this.angle = Math.atan2(dy, dx);
    this.update(canvas);
    return this;
  }

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