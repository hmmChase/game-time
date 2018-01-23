var Spaceship = require('./Spaceship.js');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var spaceship1 = new Spaceship(10, 10, 100, 100);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

spaceship1.draw(ctx);

function gameloop() {
  spaceship1.draw(ctx);

  requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);