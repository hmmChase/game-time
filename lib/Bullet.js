var Spaceship = require('./Spaceship.js');  
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Bullet {
  constructor(x, y, width, height, dx, dy) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = 3;
    this.dx = dx;
    this.dy = dy;
  }

  draw( ) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();
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