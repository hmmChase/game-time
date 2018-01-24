var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Asteroid {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.dx = (Math.random() - 0.5) * 10;
    this.dy = (Math.random() - 0.5) * 10;
    this.radius = 30;
  }

  draw() {
    // for (var i = 0; i < 5; i++) {
    //   this.x = Math.random() * canvas.width;
    //   this.y = Math.random() * canvas.height;
    //   ctx.beginPath();
    //   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //   ctx.strokeStyle = 'blue';
    //   ctx.stroke();
    // }

    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
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


    // if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
    //   this.dx = -this.dx;
    // }
    // if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
    //   this.dy = -this.dy;
    // }
    // this.x += this.dx;
    // this.y += this.dy;
    // this.draw()
  }

  erase(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }
}

module.exports = Asteroid;