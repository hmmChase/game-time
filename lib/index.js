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

  asteroidSpaceShipCollision()
  // asteroidBulletCollision()
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

function asteroidSpaceShipCollision() {
  for (let i = 0; i < asteroids.length; i++) {
    // if asteroid is in the same space as spaceship
    if (
      // Horizontal detection
      // (400 - (48/2) <= a[i].x + 30)
      // (ss.x - (half width) <= a.x + its radius)
      // leftside of spaceship <= rightside of asteroid
      (spaceship1.x - (spaceship1.width / 2) <= asteroids[i].x + asteroids[i].radius &&
        // (400 + (48/2) >= a[i].x - 30)
        // (ss.x + (half width) + its width >= a.x - its radius)
        // rightside of spaceship >= leftside of asteroid
        spaceship1.x + (spaceship1.width / 2) >= asteroids[i].x - asteroids[i].radius) &&
      // and
      // Vertical detection  
      // (a[i].y + 30 >= 400)
      // (a.y + its radius >= ss.y)
      // bottom of asteroid <= top of asteroid
      (asteroids[i].y + asteroids[i].radius >= spaceship1.y - (spaceship1.height / 2) &&
        // (a[i].y - 30 <= 400 + 48)
        // (a.y - its radius <= ss.y - its height)
        // top of asteroid <= bottom of asteroid
        asteroids[i].y - asteroids[i].radius <= spaceship1.y + (spaceship1.height / 2))
    ) {
      // do this
      ctx.fillStyle = "red";
    }
  }
}

function asteroidBulletCollision() {
  for (let i = 0; i < asteroids.length; i++) {
    for (let i = 0; i < bullets.length; i++) {
      // if asteroid is in the same space as spaceship
      if (
        // Horizontal detection
        // (400 - (48/2) <= a[i].x + 30)
        // (ss.x - (half width) <= a.x + its radius)
        // leftside of spaceship <= rightside of asteroid
        (spaceship1.x - (spaceship1.width / 2) <= asteroids[i].x + asteroids[i].radius &&
          // (400 + (48/2) >= a[i].x - 30)
          // (ss.x + (half width) + its width >= a.x - its radius)
          // rightside of spaceship >= leftside of asteroid
          spaceship1.x + (spaceship1.width / 2) >= asteroids[i].x - asteroids[i].radius) &&
        // and
        // Vertical detection  
        // (a[i].y + 30 >= 400)
        // (a.y + its radius >= ss.y)
        // bottom of asteroid <= top of asteroid
        (asteroids[i].y + asteroids[i].radius >= spaceship1.y - (spaceship1.height / 2) &&
          // (a[i].y - 30 <= 400 + 48)
          // (a.y - its radius <= ss.y - its height)
          // top of asteroid <= bottom of asteroid
          asteroids[i].y - asteroids[i].radius <= spaceship1.y + (spaceship1.height / 2))
      ) {
        // do this
        ctx.fillStyle = "green";
      }

    }
  }
}