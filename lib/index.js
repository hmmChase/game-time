var Asteroid = require('./Asteroid.js');
var Bullet = require('./Bullet.js');
var Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var spaceship1 = new Spaceship(400, 380, 60, 60);
var asteroid1 = new Asteroid(700, 400, .5, .5, 30);

var bullets = [];

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 32) {
    fireBullet();
  }
})

// asteroid1.draw()

function fireBullet() { 
  console.log('it fired!')
  let bullet = new Bullet(400, 380, 3, 3, 5, 0)
  bullets.push(bullet)
}

function gameloop() { 
  requestAnimationFrame(gameloop);
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  asteroid1.erase(ctx).update().draw();
  spaceship1.update()
  bullets.forEach(bullet => {
    bullet.update()
  })
}

gameloop()



