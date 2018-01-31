const Game = require('./Game.js');
// const Gamepiece = require('./Gamepiece.js');
// const Asteroid = require('./Asteroid.js');
const Bullet = require('./Bullet.js');
// const Spaceship = require('./Spaceship.js');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const startScreen = document.getElementById('start-screen');
const gameStats = document.getElementById('game-stats');
const levelValue = document.getElementById('level-value');
const currentScoreValue = document.getElementById('current-score-value');
const highScoreValue = document.getElementById('high-score-value');
const endScreen = document.getElementById('end-screen');

const game = new Game();

window.addEventListener('keydown', input);
window.addEventListener('keyup', fireBulletKey);
window.addEventListener('mousemove', mouseMove);
startScreen.addEventListener('click', initCanvas);
endScreen.addEventListener('click', game.restartGame);

function initCanvas() {
  const highScore = localStorage.getItem('highscore');

  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  gameStats.style.display = 'flex';
  game.levelOneCreateAsteroids();
  gameloop();
  levelValue.innerText = game.level;
  currentScoreValue.innerText = game.score || 0;
  highScoreValue.innerText = highScore;
  game.highScore = highScore;
}

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game.spaceship.alive === true) {
    game.spaceship.draw(ctx).update(canvas);

    game.bullets.forEach((bullet) => {
      bullet.draw(ctx).update(canvas);
    });
  } else {
    game.gameOver(endScreen);
  }

  game.asteroids.forEach((asteroid) => {
    asteroid.draw(ctx).update(canvas);
  });

  game.levelUp(levelValue);
  asteroidSpaceShipCollision();
  removeOffscreenBullet();
  loopBullets();
}

// index
// need to pass in game
function input(e) {
  const input = e.keyCode;

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

// index
// need to pass in game
function mouseMove(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  game.spaceship.updateCanon(mouseX, mouseY, canvas);
}

// index
function fireBulletKey(e) {
  if (game.spaceship.alive === true) {
    if (e.keyCode === 32) {
      e.preventDefault();
      fireBullet(game.spaceship);
    }
  }
}

// spaceship
// need to pass in game
function fireBullet(spaceship) {
  // var angle = spaceship.updateCanon();
  // console.log('spaceship angle:', spaceship.angle)
  const dx = Math.cos(spaceship.angle);
  const dy = Math.sin(spaceship.angle);
  const bullet = new Bullet(spaceship.x, spaceship.y, dx, dy);

  game.bullets.push(bullet);
}

// bullet
// need to pass in game
function removeOffscreenBullet() {
  game.bullets.forEach((bullet, index) => {
    if (
      bullet.y <= 0 || bullet.y >= canvas.height ||
      (bullet.x <= 0 || bullet.x >= canvas.width)
    ) {
      game.bullets.splice(index, 1);
    }
  });
}

// asteroid
// need to pass in game
function asteroidSpaceShipCollision() {
  game.asteroids.forEach((asteroid) => {
    if (
      game.spaceship.x - game.spaceship.radius <= asteroid.x + asteroid.radius &&
      game.spaceship.x + game.spaceship.radius >= asteroid.x - asteroid.radius &&
      (asteroid.y + asteroid.radius >= game.spaceship.y - game.spaceship.radius &&
        asteroid.y - asteroid.radius <= game.spaceship.y + game.spaceship.radius)
    ) {
      game.spaceship.alive = false;
    }
  });
}

// bullet
// need to pass in game
function loopBullets() {
  if (game.bullets.length > 0) {
    game.bullets.forEach((bullet, bulletIndex) => {
      checkBulletCollision(bullet, bulletIndex);
    });
  }
}

// bullet
// need to pass in game
function checkBulletCollision(bullet, bulletIndex) {
  game.asteroids.forEach((asteroid, asteroidIndex) => {
    if (
      bullet.x - bullet.radius <= asteroid.x + asteroid.radius &&
      bullet.x + bullet.radius >= asteroid.x - asteroid.radius &&
      (asteroid.y + asteroid.radius >= bullet.y - bullet.radius &&
        asteroid.y - asteroid.radius <= bullet.y + bullet.radius)
    ) {
      game.asteroids.splice(asteroidIndex, 1);
      game.bullets.splice(bulletIndex, 1);
      game.score++;
      currentScoreValue.innerText = game.score;
    }
  });
}