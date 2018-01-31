const Game = require('./Game.js');
const Bullet = require('./Bullet.js');

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

function mouseMove(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  game.spaceship.updateCanon(mouseX, mouseY, canvas);
}

function fireBulletKey(e) {
  if (game.spaceship.alive === true) {
    if (e.keyCode === 32) {
      e.preventDefault();
      fireBullet(game.spaceship);
    }
  }
}

function fireBullet(spaceship) {
  const dx = Math.cos(spaceship.angle);
  const dy = Math.sin(spaceship.angle);
  const bullet = new Bullet(spaceship.x, spaceship.y, dx, dy);

  game.bullets.push(bullet);
}

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

function asteroidSpaceShipCollision() {
  game.asteroids.forEach((asteroid) => {
    const leftsideSpaceship = game.spaceship.x - game.spaceship.radius;
    const rightsideSpaceship = game.spaceship.x + game.spaceship.radius;
    const topSpaceship = game.spaceship.y - game.spaceship.radius;
    const bottomSpaceship = game.spaceship.y + game.spaceship.radius;
    const leftsideAsteroid = asteroid.x - asteroid.radius;
    const rightsideAsteroid = asteroid.x + asteroid.radius;
    const topAsteroid = asteroid.y - asteroid.radius;
    const bottomAsteroid = asteroid.y + asteroid.radius;

    if (
      leftsideSpaceship <= rightsideAsteroid &&
      rightsideSpaceship >= leftsideAsteroid &&
      (bottomAsteroid >= topSpaceship &&
        topAsteroid <= bottomSpaceship)
    ) {
      game.spaceship.alive = false;
    }
  });
}

function loopBullets() {
  if (game.bullets.length > 0) {
    game.bullets.forEach((bullet, bulletIndex) => {
      checkBulletCollision(bullet, bulletIndex);
    });
  }
}

function checkBulletCollision(bullet, bulletIndex) {
  game.asteroids.forEach((asteroid, asteroidIndex) => {
    const leftsideBullet = bullet.x - bullet.radius;
    const rightsideBullet = bullet.x + bullet.radius;
    const topBullet = bullet.y - bullet.radius;
    const bottomBullet = bullet.y + bullet.radius;
    const leftsideAsteroid = asteroid.x - asteroid.radius;
    const rightsideAsteroid = asteroid.x + asteroid.radius;
    const topAsteroid = asteroid.y - asteroid.radius;
    const bottomAsteroid = asteroid.y + asteroid.radius;

    if (
      leftsideBullet <= rightsideAsteroid &&
      rightsideBullet >= leftsideAsteroid &&
      bottomAsteroid >= topBullet &&
      topAsteroid <= bottomBullet
    ) {
      game.asteroids.splice(asteroidIndex, 1);
      game.bullets.splice(bulletIndex, 1);
      game.score++;
      currentScoreValue.innerText = game.score;
    }
  });
}