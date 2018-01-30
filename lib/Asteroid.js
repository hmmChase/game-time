class Asteroid {
  constructor() {
    this.x = -60;
    this.y = -60;
    this.dx = (Math.random() - .5) * 5;
    this.dy = (Math.random() - .5) * 5;
    this.radius = 30;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = 'orange';
    ctx.stroke();
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
    this.x += this.dx;
    this.y += this.dy;

    return this;
  }

}

module.exports = Asteroid;