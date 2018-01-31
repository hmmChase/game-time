const chai = require('chai');
const { assert, expect } = chai;
// const assert = chai.assert;
const Game = require('../lib/Game.js')
// const Asteroid = require('./Asteroid.js');
// const Bullet = require('./Bullet.js');
// const Spaceship = require('./Spaceship.js');

describe('Game', function() {

  it('should be a function', function () {
    assert.isFunction(Game)
  });

  it('should have a default level of one', function () {
    const game = new Game()
    assert.equal(game.level, 1)
  })

  it('should have a default score', function () {
    const game = new Game()
    assert.equal(game.score, 0)
  })

  it('should have a default high score', function () {
    const game = new Game()
    assert.equal(game.highScore, 0)
  })

  it('should have more asteroids on level two', function() {
    const game = new Game();
    game.levelTwoCreateAsteroids();
    assert.lengthOf(game.asteroids, 15)
  })

  it('should be able to make spaceship objects', function() {
    const game = new Game();
    expect(game).to.be.a('object')
  })

  it('should be able to make asteroid objects', function() {
    const game = new Game();
    game.levelOneCreateAsteroids;
    expect(game.asteroids).to.be.a('array')
  })
})


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

