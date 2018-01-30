const Game = require('./Game.js');
// const Gamepiece = require('./Gamepiece.js');
const Asteroid = require('./Asteroid.js');
const Bullet = require('./Bullet.js');
const Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var startScreen = document.getElementById('start-screen');
var gameStats = document.getElementById('game-stats');
var levelValue = document.getElementById('level-value');
var currentScoreValue = document.getElementById('current-score-value');
var highScoreValue = document.getElementById('high-score-value');
var endScreen = document.getElementById('end-screen');

var game = new Game(...arguments);
var spaceship = new Spaceship();
// var asteroids = [];
var bullets = [];
var level = 1;
var currentScore = 0;
var highScore = localStorage.getItem('highscore');

window.addEventListener('keydown', input);
window.addEventListener('keyup', fireBulletKey);
window.addEventListener('mousemove', mouseMove);
startScreen.addEventListener('click', initCanvas);
endScreen.addEventListener('click', restartGame);

function initCanvas() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameStats.style.display = "flex";
  game.levelOneCreateAsteroids();
  gameloop()
  levelValue.innerText = game.level;
  currentScoreValue.innerText = spaceship.currentScore || 0;
  var highScore = localStorage.getItem('highscore');

  highScoreValue.innerText = highScore;
}

function gameOver() {
  endScreen.style.display = "block";
  checkScore()
}

function checkScore() {
  if (currentScore > highScore) {
    localStorage.setItem('highscore', currentScore)
  } else {
    localStorage.setItem('highscore', highScore)
  }
}

function restartGame() {
  window.location.reload(true)
}

// function levelUp() {
//   if (game.level === 1 && spaceship.alive && game.asteroids.length === 0) {
//     game.level = 2;
//     levelValue.innerText = game.level;
//     levelTwoCreateAsteroids();
//   } else if (level === 2 && spaceship.alive && game.asteroids.length === 0) {
//     game.level ++;
//     levelValue.innerText = game.level;
//     levelThreeCreateAsteroids()
//   } else if (level === 3 && spaceship.alive && game.asteroids.length === 0) {
//     game.level++;
//     levelValue.innerText = game.level;
//     levelFourCreateAsteroids();
//   } else if (level === 4 && spaceship.alive && game.asteroids.length === 0) {
//     game.level++;
//     levelValue.innerText = game.level;
//     levelFiveCreateAsteroids(); 
//   }
// }

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (spaceship.alive === true) {
    spaceship.draw(ctx).update(canvas)

    bullets.forEach(bullet => {
      bullet.draw(ctx).update(canvas)
    })
  } else {
    gameOver();
  }

  game.asteroids.forEach(asteroid => {
    asteroid.draw(ctx).update(canvas);
  })

  game.levelUp(levelValue)
  asteroidSpaceShipCollision()
  removeOffscreenBullet()
  loopBullets()
}

function mouseMove(e) {
  var mouseX = e.clientX
  var mouseY = e.clientY

  spaceship.updateCanon(mouseX, mouseY, canvas)
}

function input(e) {
  var input = e.keyCode;

  switch (input) {
    case 87:
      spaceship.moveUp();
      break;
    case 65:
      spaceship.moveLeft();
      break;
    case 68:
      spaceship.moveRight();
      break;
    case 83:
      spaceship.moveDown();
      break;
  }
}

function fireBulletKey(e) {
  if (spaceship.alive === true) {
    if (e.keyCode === 32) {
      e.preventDefault()
      fireBullet(spaceship);
    }
  }
}

function fireBullet(spaceship) {
  // var angle = spaceship.updateCanon();
  // console.log('spaceship angle:', spaceship.angle)
  let dx = Math.cos(spaceship.angle)
  let dy = Math.sin(spaceship.angle)
  let bullet = new Bullet(spaceship.x, spaceship.y, dx, dy)

  bullets.push(bullet)
}

// function levelOneCreateAsteroids() {
//   for (let i = 0; i < 10; i++) {
//     asteroids.push(new Asteroid());
//   }
// }



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
  for (let i = 0; i < game.asteroids.length; i++) {
    if (
      // Horizontal detection
      // leftside of spaceship <= rightside of asteroid
      (spaceship.x - (spaceship.radius) <= game.asteroids[i].x + game.asteroids[i].radius &&
        // rightside of spaceship >= leftside of asteroid
        spaceship.x + (spaceship.radius) >= game.asteroids[i].x - game.asteroids[i].radius) &&
      // and
      // Vertical detection  
      // bottom of asteroid <= top of asteroid
      (game.asteroids[i].y + game.asteroids[i].radius >= spaceship.y - (spaceship.radius) &&
        // top of asteroid <= bottom of asteroid
        game.asteroids[i].y - game.asteroids[i].radius <= spaceship.y + (spaceship.radius))
    ) {
      // do this
      spaceship.alive = false;
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
  for (var i = 0; i < game.asteroids.length; i++) {
    if (
      (bullet.x - (bullet.radius) <= game.asteroids[i].x + game.asteroids[i].radius &&
        bullet.x + (bullet.radius) >= game.asteroids[i].x - game.asteroids[i].radius) &&
      (game.asteroids[i].y + game.asteroids[i].radius >= bullet.y - (bullet.radius) &&
        game.asteroids[i].y - game.asteroids[i].radius <= bullet.y + (bullet.radius))
    ) {
      game.asteroids.splice(i, 1)
      bullets.splice(index, 1)
      currentScore++;
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
//       spaceship.moveUp()
//     } else if (map[65]) {
//       spaceship.moveLeft()
//     } else if (map[68]) {
//       spaceship.moveDown()
//     } else if (map[83]) {
//       spaceship.moveRight() 
//     } else if (map[87] && map[65]) {
//       spaceship.moveUpLeft()
//     } else if (map[87] && map[83]) {
//       spaceship.moveUpRight()
//     } else if (map[68] && map[65]) {
//       spaceship.moveDownLeft()
//     } else if (map[68] && map[83]) {
//       spaceship.moveDownRight()
//     }
//   }
// }

// function levelUp() {
//   var alive = spaceship.alive
//   var length = asteroids.length === 0;
//   var level = level;
//   switch (level) {
//   case 1 && alive && length: 
//     level++;
//     levelValue.innerText = level;
//     levelTwoCreateAsteroids();
//     break;
//   case 2 && alive && length: 
//     level++
//     levelValue.innerText = level;
//     levelThreeCreateAsteroids();
//     break;
//   case 3 && alive && length: 
//     level++;
//     levelValue.innerText = level 
//     levelFourCreateAsteroids();
//     break;
//   case 4 && alive && length: level++ 
//   levelValue.innerText = level 
//   levelFiveCreateAsteroids();
//     break;
//   }
// }

