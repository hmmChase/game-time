var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Asteroid {
  constructor(x, y, dx, dy, radius) {
    this.x = x; // Math.random() * canvas.width;
    this.y = y; // Math.random() * canvas.height;
    this.dx = dx; // (Math.random() - 0.5) * 2;
    this.dy = dy; // (Math.random() - 0.5) * 2;
    this.radius = radius;
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

    // for a static asteroid
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
  }



  update() {


    if (this.x - this.radius > canvas.width) {
      this.x = 0 - this.radius;
    } 
    // else if (this.x < 0) {
    //   this.x = canvas.width;
    // }
    this.x += this.dx;
    // this.y += this.dy;

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