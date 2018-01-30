// const Gamepiece = require('./Gamepiece.js');
const Asteroid = require('./Asteroid.js');
const Bullet = require('./Bullet.js');
const Spaceship = require('./Spaceship.js');

class Game {
  constructor() {
    this.time = new Date().getTime();
    this.level = 1;
    this.score = 0;
    this.highScore = 0;
    this.Asteroid = new Asteroid();
    this.asteroids = [];
    this.spaceship = new Spaceship();
  }

  // initCanvas(startScreen, canvas, gameStats) {

  // }

  // initCanvas() {
  //   startScreen.style.display = "none";
  //   canvas.style.display = "block";
  //   gameStats.style.display = "flex";
  //   game.levelOneCreateAsteroids();
  //   gameloop()
  //   levelValue.innerText = game.level;
  //   currentScoreValue.innerText = spaceship.currentScore || 0;
  //   var highScore = localStorage.getItem('highscore');

  //   highScoreValue.innerText = highScore;
  // }


  levelOneCreateAsteroids() {
    for (let i = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid());
    }
  }

  levelTwoCreateAsteroids() {
    for (let i = 0; i < 15; i++) {
      this.asteroids.push(new Asteroid());
      this.asteroids.forEach(function (asteroid) {
        asteroid.dx = (Math.random() - .5) * 7;
        asteroid.dy = (Math.random() - .5) * 7;
      })
    }
  }

  levelThreeCreateAsteroids() {
    for (let i = 0; i < 20; i++) {
      this.asteroids.push(new Asteroid());
      this.asteroids.forEach(function (asteroid) {
        asteroid.dx = (Math.random() - .5) * 10;
        asteroid.dy = (Math.random() - .5) * 10;
      })
    }
  }

  levelFourCreateAsteroids() {
    for (let i = 0; i < 25; i++) {
      this.asteroids.push(new Asteroid());
      this.asteroids.forEach(function (asteroid) {
        asteroid.dx = (Math.random() - .5) * 12;
        asteroid.dy = (Math.random() - .5) * 12;
      })
    }
  }

  levelFiveCreateAsteroids() {
    for (let i = 0; i < 30; i++) {
      this.asteroids.push(new Asteroid());
      this.asteroids.forEach(function (asteroid) {
        asteroid.dx = (Math.random() - .5) * 15;
        asteroid.dy = (Math.random() - .5) * 15;
      })
    }
  }

  levelUp(levelValue) {
    if (this.level === 1 && this.spaceship.alive && this.asteroids.length === 0) {
      this.level = 2;
      levelValue.innerText = this.level;
      this.levelTwoCreateAsteroids();
    } else if (this.level === 2 && this.spaceship.alive && this.asteroids.length === 0) {
      this.level = 3;
      levelValue.innerText = this.level;
      this.levelThreeCreateAsteroids()
    } else if (this.level === 3 && this.spaceship.alive && this.asteroids.length === 0) {
      this.level = 4;
      levelValue.innerText = this.level;
      this.levelFourCreateAsteroids();
    } else if (this.level === 4 && this.spaceship.alive && this.asteroids.length === 0) {
      this.level = 5;
      levelValue.innerText = this.level;
      this.levelFiveCreateAsteroids();
    }
  }

}

module.exports = Game;