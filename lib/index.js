var Asteroid = require('./Asteroid.js');
var Bullet = require('./Bullet.js');
var Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var startScreen = document.getElementById('start-screen');
var spaceship1 = new Spaceship(300, 300);

var asteroids = [];
var bullets = [];

var arrowLeft = 65;
var arrowUp = 87;
var arrowRight = 68;
var arrowDown = 83;

window.addEventListener('keydown', turnSpaceshipKey);
window.addEventListener('keyup', fireBulletKey);
window.addEventListener('mousemove', mouseMove)
startScreen.addEventListener('click', startScreenButton);

function startScreenButton() {
  console.log('test')
  this.style.display = "none";
}

gameloop()
createAsteroids()

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (spaceship1.alive === true) {
    spaceship1.update()

    bullets.forEach(bullet => {
      bullet.update()
    })
  }



  asteroids.forEach(asteroid => {
    asteroid.draw().update();
  })



  asteroidSpaceShipCollision()
  removeOffscreenBullet()
  loopBullets()
}

function mouseMove(e) {
  var mouseX = e.clientX
  var mouseY = e.clientY
  spaceship1.updateCanon(mouseX, mouseY)
}

function turnSpaceshipKey(e) {
  if (e.keyCode === arrowLeft) {
    e.preventDefault()
    spaceship1.moveLeft();
  } else if (e.keyCode === arrowRight) {
    e.preventDefault()
    spaceship1.moveRight();
  } else if (e.keyCode === arrowUp) {
    e.preventDefault()
    spaceship1.moveUp();
  } else if (e.keyCode === arrowDown) {
    e.preventDefault()
    spaceship1.moveDown();
  }
}

function fireBulletKey(e) {
  if (spaceship1.alive === true) {
    if (e.keyCode === 32) {
      fireBullet(spaceship1);
    }
  }
}

function fireBullet(spaceship1) {
  // var angle = spaceship.updateCanon();
  console.log('spaceship angle:', spaceship1.angle)
  let dx = Math.cos(spaceship1.angle)
  let dy = Math.sin(spaceship1.angle)
  let bullet = new Bullet(spaceship1.x, spaceship1.y, dx, dy)
  bullets.push(bullet)
}

function createAsteroids() {
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function removeOffscreenBullet() {
  for (let i = 0; i < bullets.length; i++) {
    if (
      // if bullet exits top or bottom
      (bullets[i].y <= 0 || bullets[i].y >= canvas.width) ||
      // if bullet exits left or right
      (bullets[i].x <= 0 || bullets[i].x >= canvas.width)
    ) {
      // remove bullet
      bullets.splice(i, 1)
    }
  }
}

function asteroidSpaceShipCollision() {
  for (let i = 0; i < asteroids.length; i++) {
    // if asteroid is in the same space as spaceship
    if (
      // Horizontal detection
      // leftside of spaceship <= rightside of asteroid
      (spaceship1.x - (spaceship1.radius) <= asteroids[i].x + asteroids[i].radius &&
        // rightside of spaceship >= leftside of asteroid
        spaceship1.x + (spaceship1.radius) >= asteroids[i].x - asteroids[i].radius) &&
      // and
      // Vertical detection  
      // bottom of asteroid <= top of asteroid
      (asteroids[i].y + asteroids[i].radius >= spaceship1.y - (spaceship1.radius) &&
        // top of asteroid <= bottom of asteroid
        asteroids[i].y - asteroids[i].radius <= spaceship1.y + (spaceship1.radius))
    ) {
      // do this
      spaceship1.alive = false;
    }
  }
}

function loopBullets() {
  if (bullets.length > 0) {
    bullets.forEach(function (bullet, index) {
      checkBulletCollision(bullet, index);
    })
  }
}

function checkBulletCollision(bullet, index) {
  for (var i = 0; i < asteroids.length; i++) {
    if (
      (bullet.x - (bullet.radius) <= asteroids[i].x + asteroids[i].radius &&
        bullet.x + (bullet.radius) >= asteroids[i].x - asteroids[i].radius) &&
      (asteroids[i].y + asteroids[i].radius >= bullet.y - (bullet.radius) &&
        asteroids[i].y - asteroids[i].radius <= bullet.y + (bullet.radius))
    ) {
      asteroids.splice(i, 1)
      bullets.splice(index, 1)
    }
  }
}