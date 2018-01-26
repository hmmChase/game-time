var Asteroid = require('./Asteroid.js');
var Bullet = require('./Bullet.js');
var Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var spaceship1 = new Spaceship(250, 300, 200, 100);
var asteroids = [];
var bullets = [];

var arrowRight = 39;
var arrowLeft = 37;


window.addEventListener('keydown', function (e) {
  if (e.keyCode === arrowLeft) {
    console.log('turn Left!9191')
    spaceship1.turnLeftUpdate();


  } else if (e.keyCode === arrowRight) {
    console.log('Right!')
    spaceship1.turnRight();
  }
})

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 32) {
    fireBullet();
  }
})

gameloop()
createAsteroids()

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  spaceship1.update()

  bullets.forEach(bullet => {
    bullet.update()
  })

  asteroids.forEach(asteroid => {
    asteroid.draw().update();
  })




  asteroidCollision()
}

function fireBullet() {
  let bullet = new Bullet(424, 400, 3, 3, 5, 0)


  bullets.push(bullet)
}

function createAsteroids() {
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function asteroidCollision() {
  for (let i = 0; i < asteroids.length; i++) {
    // if asteroid is in the same space as spaceship
    if (
      // horizontal detection
      // (400 <= a[i].x + 30) & (400 + ss.x >= i.x - 30)
      (spaceship1.x <= asteroids[i].x + asteroids[i].radius &&
        spaceship1.x + spaceship1.width >= asteroids[i].x - asteroids[i].radius) &&
      // vertical detection  
      // (a[i].y + 30 >= ss.y) & ()
      (asteroids[i].y + asteroids[i].radius >= spaceship1.y &&
        asteroids[i].y - asteroids[i].radius <= spaceship1.y + spaceship1.height)
    ) {
      // do this
      ctx.fillStyle = "red";
    }
  }
}