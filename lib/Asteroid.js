var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Asteroid {
  constructor(x, y, dx, dy, radius) { 
    this.x = x; // Math.random() * canvas.width;
    this.y = y; // Math.random() * canvas.height;
    this.dx = dx;  // (Math.random() - 0.5) * 2;
    this.dy = dy;  // (Math.random() - 0.5) * 2;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }

  // erase(ctx) {
  //   ctx.clearRect(this.x, this.y, this.width, this.height);
  //   return this;
  // }

}

module.exports = Asteroid;