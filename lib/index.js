var Asteroid = require('./Asteroid.js');
var Bullet = require('./Bullet.js');
var Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var startScreen = document.getElementById('start-screen');
var spaceship1 = new Spaceship(300, 300);

var asteroids = [];
var bullets = [];

// window.addEventListener('keydown', keyDown);
// window.addEventListener('keyup', keyUp)

window.addEventListener('keydown', input);
window.addEventListener('keyup', fireBulletKey);
window.addEventListener('mousemove', mouseMove)
startScreen.addEventListener('click', startScreenButton);

function startScreenButton() {
  console.log('test')
  this.style.display = "none";
}

// const map = {
//   87: false, // up
//   65: false, // left
//   68: false, // down
//   83: false, // right
// }

// function keyDown(e) {
//   if (e.keyCode in map) {
//     map[e.keyCode] = true;
//     if (map[87]) {
//       spaceship1.moveUp()
//     } else if (map[65]) {
//       spaceship1.moveLeft()
//     } else if (map[68]) {
//       spaceship1.moveDown()
//     } else if (map[83]) {
//       spaceship1.moveRight() 
//     } else if (map[87] && map[65]) {
//       spaceship1.moveUpLeft()
//     } else if (map[87] && map[83]) {
//       spaceship1.moveUpRight()
//     } else if (map[68] && map[65]) {
//       spaceship1.moveDownLeft()
//     } else if (map[68] && map[83]) {
//       spaceship1.moveDownRight()
//     }
//   }
// }

function keyUp(e) {
  if (e.keyCoe in map) {
    map[e.keyCode] = false;
  }
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

function input(e){
  var input = e.keyCode;
  switch (input) {
    case 87: spaceship1.moveUp();
    break;
    case 65: spaceship1.moveLeft();
    break;
    case 68: spaceship1.moveRight();
    break;
    case 83: spaceship1.moveDown();
    break;
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