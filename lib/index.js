var Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var spaceship1 = new Spaceship();


function gameloop() {


  requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);