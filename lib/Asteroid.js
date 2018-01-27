var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Asteroid {
  constructor() {
    this.x = -60;
    this.y = -60;
    this.dx = (Math.random() - .5) * 5;
    this.dy = (Math.random() - .5) * 5;
    this.radius = 30;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    return this;
  }

  update() {
    if (this.x - this.radius > canvas.width) {
      this.x = 0 - this.radius;
    } else if (this.x + this.radius < 0) {
      this.x = canvas.width + this.radius;
    }
    if (this.y - this.radius > canvas.width) {
      this.y = 0 - this.radius;
    } else if (this.y + this.radius < 0) {
      this.y = canvas.width + this.radius;
    }
    this.x += this.dx;
    this.y += this.dy;

    return this;
  }

  erase(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    return this;
  }

}

module.exports = Asteroid;