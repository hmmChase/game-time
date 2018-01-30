var Asteroid = require('./Asteroid.js');
var Bullet = require('./Bullet.js');
var Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var startScreen = document.getElementById('start-screen');
var gameStats = document.getElementById('game-stats');
var levelValue = document.getElementById('level-value');
var currentScoreValue = document.getElementById('current-score-value');
var highScoreValue = document.getElementById('high-score-value');
var endScreen = document.getElementById('end-screen');

var spaceship1 = new Spaceship(300, 300);

var asteroids = [];
var bullets = [];
var level = 1;
var currentScore = 0;
var highScore = 0;

// window.addEventListener('keydown', keyDown);
// window.addEventListener('keyup', keyUp)

window.addEventListener('keydown', input);
window.addEventListener('keyup', fireBulletKey);
window.addEventListener('mousemove', mouseMove);
startScreen.addEventListener('click', initCanvas);
endScreen.addEventListener('click', restartGame);

highScoreValue.innerText = highScore;

function initCanvas() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameStats.style.display = "flex";
  levelOneCreateAsteroids()
  gameloop()
  levelValue.innerText = level;
}

function gameOver() {
  endScreen.style.display = "block";
  // update scores
}

function restartGame() {
  window.location.reload(true)
}

function levelUp() {
  console.log('Asteroid Count:', asteroids.length)
  if (level === 1 && spaceship1.alive && asteroids.length === 0 ) {
    level = 2;
    levelValue.innerText = level;
    levelTwoCreateAsteroids();
  } else if (level === 2 && spaceship1.alive && asteroids.length === 0) {
    level = 3;
    levelValue.innerText = level;
    levelThreeCreateAsteroids()
  } else if (level === 3 && spaceship1.alive && asteroids.length === 0) {
    level ++;
    levelValue.innerText = level;
    levelFourCreateAsteroids();
  } else if (level === 4 && spaceship1.alive && asteroids.length === 0) {
    level ++;
    levelValue.innerText = level;
    levelFiveCreateAsteroids();
  }
}

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (spaceship1.alive === true) {
    spaceship1.draw(ctx).update(canvas)

    bullets.forEach(bullet => {
      bullet.draw(ctx).update(canvas)
    })
  } else {
    console.log('dead');
    gameOver();
  }

  asteroids.forEach(asteroid => {
    asteroid.draw(ctx).update(canvas);
  })

  levelUp()
  asteroidSpaceShipCollision()
  // removeOffscreenBullet()
  loopBullets()
}

function mouseMove(e) {
  var mouseX = e.clientX
  var mouseY = e.clientY
  spaceship1.updateCanon(mouseX, mouseY, canvas)
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
      e.preventDefault()
      fireBullet(spaceship1);
    }
  }
}

function fireBullet(spaceship1) {
  // var angle = spaceship.updateCanon();
  // console.log('spaceship angle:', spaceship1.angle)
  let dx = Math.cos(spaceship1.angle)
  let dy = Math.sin(spaceship1.angle)
  let bullet = new Bullet(spaceship1.x, spaceship1.y, dx, dy)
  bullets.push(bullet)
}

function levelOneCreateAsteroids() {
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function levelTwoCreateAsteroids() {
  for (let i = 0; i < 15; i++) {
    asteroids.push(new Asteroid());
    asteroids.forEach(function(asteroid) {
      asteroid.dx = (Math.random() - .5) * 7;
      asteroid.dy = (Math.random() - .5) * 7;
    })
  }
}

function levelThreeCreateAsteroids() {
  for (let i = 0; i < 20; i++) {
    asteroids.push(new Asteroid());
    asteroids.forEach(function(asteroid) {
      asteroid.dx = (Math.random() - .5) * 10;
      asteroid.dy = (Math.random() - .5) * 10;
    })
  }
}
function levelFourCreateAsteroids() {
  for (let i = 0; i < 25; i++) {
    asteroids.push(new Asteroid());
    asteroids.forEach(function(asteroid) {
      asteroid.dx = (Math.random() - .5) * 12;
      asteroid.dy = (Math.random() - .5) * 12;
    })
  }
}

function levelFiveCreateAsteroids() {
  for (let i = 0; i < 30; i++) {
    asteroids.push(new Asteroid());
    asteroids.forEach(function(asteroid) {
      asteroid.dx = (Math.random() - .5) * 15;
      asteroid.dy = (Math.random() - .5) * 15;
    })
  }
}

// function removeOffscreenBullet() {
//   for (let i = 0; i < bullets.length; i++) {
//     if (
//       // if bullet exits top or bottom
//       (bullets[i].y <= 0 || bullets[i].y >= canvas.width) ||
//       // if bullet exits left or right
//       (bullets[i].x <= 0 || bullets[i].x >= canvas.width)
//     ) {
//       // remove bullet
//       bullets.splice(i, 1)
//     }
//   }
// }

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
      currentScore ++;
      currentScoreValue.innerText = currentScore;
    }
  }
}


// function keyUp(e) {
//   if (e.keyCoe in map) {
//     map[e.keyCode] = false;
//   }
// }

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