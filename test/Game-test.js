const chai = require('chai');
const { assert, expect } = chai;
const Game = require('../lib/Game.js');
const Asteroid = require('../lib/Asteroid.js');

describe('Game', function() {
  let asteroids;
  let game;

  beforeEach(function() {
    game = new Game();
    asteroids = [];
    for (let i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }
  });

  it('should be a function', function() {
    assert.isFunction(Game);
  });

  it('should have a default level of one', function() {
    assert.equal(game.level, 1);
  });

  it('should have a default score', function() {
    assert.equal(game.score, 0);
  });

  it('should have a default high score', function() {
    assert.equal(game.highScore, 0);
  });

  it('should have more asteroids on level two', function() {
    const game = new Game();
    game.levelTwoCreateAsteroids();
    assert.lengthOf(game.asteroids, 15);
  });

  it('should be able to make spaceship objects', function() {
    expect(game).to.be.a('object');
  });

  it('should be able to make asteroid objects', function() {
    game.levelOneCreateAsteroids();
    expect(game.asteroids).to.be.a('array');
  });

  it('should have more asteroids on level 2', function() {
    game.levelTwoCreateAsteroids();
    expect(game.asteroids.length).to.equal(15);
  });

  it('should have random, faster asteroids on level 2', function() {
    game.levelTwoCreateAsteroids();
    expect(asteroids[2].dx).to.be.within(-3.5, 3.5);
  });

  it('');

  // it.skip('should have a new high score', function () {
  //   let game1 = new Game();
  //   assert.equal(game1.score, 0);
  //   assert.equal(game1.highScore, 0);
  //   game1.score = 10;
  //   game1.checkScore();
  //   let game2 = new Game();
  //   assert.equal(game2.highScore, 10)
  // })

  // it.skip('should increment to level two, if alive and all asteroids destroyed', function () {
  //   const game = new Game();
  //   game.levelOneCreateAsteroids();
  //   assert.equal(game.level, 1)
  //   game.asteroids = [];
  //   assert.equal(game.spaceship.alive, true)
  //   game.levelUp()
  //   assert.equal(game.level, 2)
  // })
});
