class Bullet {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'red'
    ctx.stroke();
    return this;
  }

  update(canvas) {
    // if (this.x - this.radius > canvas.width) {
    //   this.x = 0 - this.radius;
    // } else if (this.x + this.radius < 0) {
    //   this.x = canvas.width + this.radius;
    // }
    // if (this.y - this.radius > canvas.height) {
    //   this.y = 0 - this.radius;
    // } else if (this.y + this.radius < 0) {
    //   this.y = canvas.height + this.radius;
    // }
    this.x += this.dx * 5;
    this.y += this.dy * 5;
    // this.draw()
    return this;
  }
}

module.exports = Bullet;