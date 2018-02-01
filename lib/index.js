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
  currentScoreValue.innerText = 0;
  highScoreValue.innerText = highScore;
  game.asteroidhighScore = highScore;
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

  game.update()
  currentScoreValue.innerText = game.asteroid.score;

  game.levelUp(levelValue);
  removeOffscreenBullet();
}

function input(e) {
  const input = e.keyCode;
  switch (input) {
    case 87:
      game.spaceship.moveNeg('y', 'dy');
      break;
    case 65:
      game.spaceship.moveNeg('x', 'dx');
      break;
    case 68:
      game.spaceship.movePos('x', 'dx');
      break;
    case 83:
      game.spaceship.movePos('y', 'dy');
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

