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


var game = new Game();
// var spaceship = new Spaceship();
// var asteroids = [];
// var bullets = [];
// var level = 1;
// var currentScore = 0;
// var highScore = localStorage.getItem('highscore');

window.addEventListener('keydown', input);
window.addEventListener('keyup', fireBulletKey);
window.addEventListener('mousemove', mouseMove);
startScreen.addEventListener('click', initCanvas);
endScreen.addEventListener('click', game.restartGame);

function initCanvas() {
  var highScore = localStorage.getItem('highscore');

  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameStats.style.display = "flex";
  game.levelOneCreateAsteroids();
  gameloop()
  levelValue.innerText = game.level;
  currentScoreValue.innerText = game.score || 0;
  highScoreValue.innerText = highScore;
  game.highScore = highScore;
}

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (game.spaceship.alive === true) {
    game.spaceship.draw(ctx).update(canvas)

    game.bullets.forEach(bullet => {
      bullet.draw(ctx).update(canvas)
    })
  } else {
    game.gameOver(endScreen);
  }

  game.asteroids.forEach(asteroid => {
    asteroid.draw(ctx).update(canvas);
  })

  game.levelUp(levelValue)
  asteroidSpaceShipCollision()
  removeOffscreenBullet()
  loopBullets()
}

// index
// need to pass in game
function input(e) {
  var input = e.keyCode;

  switch (input) {
    case 87:
      game.spaceship.moveUp();
      break;
    case 65:
      game.spaceship.moveLeft();
      break;
    case 68:
      game.spaceship.moveRight();
      break;
    case 83:
      game.spaceship.moveDown();
      break;
  }
}

// game
// function gameOver() {
//   endScreen.style.display = "block";
//   checkScore()
// }

// game
// function checkScore() {
//   if (currentScore > highScore) {
//     localStorage.setItem('highscore', currentScore)
//   } else {
//     localStorage.setItem('highscore', highScore)
//   }
// }


// game
// function restartGame() {
//   window.location.reload(true)
// }

// index
// need to pass in game
function mouseMove(e) {
  var mouseX = e.clientX
  var mouseY = e.clientY

  game.spaceship.updateCanon(mouseX, mouseY, canvas)
}

// index
function fireBulletKey(e) {
  if (game.spaceship.alive === true) {
    if (e.keyCode === 32) {
      e.preventDefault()
      fireBullet(game.spaceship);
    }
  }
}

// spaceship
// need to pass in game
function fireBullet(spaceship) {
  // var angle = spaceship.updateCanon();
  // console.log('spaceship angle:', spaceship.angle)
  let dx = Math.cos(spaceship.angle)
  let dy = Math.sin(spaceship.angle)
  let bullet = new Bullet(spaceship.x, spaceship.y, dx, dy)

  game.bullets.push(bullet)
}

// bullet
// need to pass in game
function removeOffscreenBullet() {
  for (let i = 0; i < game.bullets.length; i++) {
    if (
      // if bullet exits top or bottom
      (game.bullets[i].y <= 0 || game.bullets[i].y >= canvas.width) ||
      // if bullet exits left or right
      (game.bullets[i].x <= 0 || game.bullets[i].x >= canvas.width)
    ) {
      // remove bullet
      game.bullets.splice(i, 1)
    }
  }
}

// asteroid
// need to pass in game
function asteroidSpaceShipCollision() {
  for (let i = 0; i < game.asteroids.length; i++) {
    if (
      // Horizontal detection
      // leftside of spaceship <= rightside of asteroid
      (game.spaceship.x - (game.spaceship.radius) <= game.asteroids[i].x + game.asteroids[i].radius &&
        // rightside of spaceship >= leftside of asteroid
        game.spaceship.x + (game.spaceship.radius) >= game.asteroids[i].x - game.asteroids[i].radius) &&
      // and
      // Vertical detection  
      // bottom of asteroid <= top of asteroid
      (game.asteroids[i].y + game.asteroids[i].radius >= game.spaceship.y - (game.spaceship.radius) &&
        // top of asteroid <= bottom of asteroid
        game.asteroids[i].y - game.asteroids[i].radius <= game.spaceship.y + (game.spaceship.radius))
    ) {
      // do this
      game.spaceship.alive = false;
    }
  }
}

// bullet
// need to pass in game
function loopBullets() {
  if (game.bullets.length > 0) {
    game.bullets.forEach(function (bullet, index) {
      checkBulletCollision(bullet, index);
    })
  }
}

// bullet
// need to pass in game
function checkBulletCollision(bullet, index) {
  for (var i = 0; i < game.asteroids.length; i++) {
    if (
      (bullet.x - (bullet.radius) <= game.asteroids[i].x + game.asteroids[i].radius &&
      bullet.x + (bullet.radius) >= game.asteroids[i].x - game.asteroids[i].radius) &&
      (game.asteroids[i].y + game.asteroids[i].radius >= bullet.y - (bullet.radius) &&
        game.asteroids[i].y - game.asteroids[i].radius <=bullet.y + (bullet.radius))
    ) {
      game.asteroids.splice(i, 1)
      game.bullets.splice(index, 1)
      game.score++;
      currentScoreValue.innerText = game.score;
    }
  }
}