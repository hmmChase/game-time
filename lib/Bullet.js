class Bullet {
  constructor(x, y, dx, dy) {
    // super(x, y, radius, dx, dy)
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.stroke();
    return this;
  }

  update() {
    this.x += this.dx * 5;
    this.y += this.dy * 5;
    return this;
  }

  // removeOffscreenBullet(game) {
  //   for (let i = 0; i < game.bullets.length; i++) {
  //     if (
  //       // if bullet exits top or bottom
  //       (game.bullets[i].y <= 0 || game.bullets[i].y >= 1000) ||
  //       // if bullet exits left or right
  //       (game.bullets[i].x <= 0 || game.bullets[i].x >= 600)
  //     ) {
  //       // remove bullet
  //       game.bullets.splice(i, 1)
  //     }
  //   }
  // }
}

module.exports = Bullet;