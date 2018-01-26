var Spaceship = require('./Spaceship.js');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Bullet {
  constructor(x, y, width, height, dx, dy) { 
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }

  // erase(ctx) {
  //   ctx.clearRect(this.x, this.y, this.width, this.height);
  //   return this;
  // }

}

module.exports = Bullet;