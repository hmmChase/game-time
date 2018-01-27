var Spaceship = require('./Spaceship.js');  
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Bullet {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.dx = dx;
    this.dy = dy;
  }

  draw( ) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'red'
    ctx.stroke();
  }

  update() {
    this.x += this.dx * 5;
    this.y += this.dy * 5;
    this.draw()
  }
}

module.exports = Bullet;