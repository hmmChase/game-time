const chai = require('chai');
const { assert, expect } = chai;

const Game = require('../lib/Game.js');
const Asteroid = require('../lib/Asteroid.js');

describe('Game', () => {

  let asteroids;
  let game;
  
  beforeEach( () => {
    game = new Game();
    asteroids = [];
    for (let i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }
  });

  it('should be a function', () => {
    assert.isFunction(Game)
  });

  it('should have a default level of one', () => {
    assert.equal(game.level, 1)
  })

  it('should have a default score', () => {
    assert.equal(game.score, 0)
  })

  it('should have a default high score', () => {
    assert.equal(game.highScore, 0)
  })

  it('should have more asteroids on level two', () => {
    game.levelTwoCreateAsteroids();
    assert.lengthOf(game.asteroids, 15);
  });

  it('should be able to make spaceship objects', () => {
    expect(game).to.be.a('object')
  })

  it('should be able to make asteroid objects', () => {
    game.levelOneCreateAsteroids;
    expect(game.asteroids).to.be.a('array')
  })

  it('should have more asteroids on level 2', () => {
    game.levelTwoCreateAsteroids();
    expect(game.asteroids.length).to.equal(15);
  });

  it('should have even more asteroids on level 3', () => {
    game.levelThreeCreateAsteroids();
    expect(game.asteroids.length).to.equal(20)
  })

  it('should have a ton of asteroids on level 4', () => {
    game.levelFourCreateAsteroids();
    expect(game.asteroids.length).to.equal(25)
  })

  it('should have the most amount of of asteroids on level 5', () => {
    game.levelFiveCreateAsteroids();
    expect(game.asteroids.length).to.equal(30)
  })
  
  it('should have random, faster asteroids on level 2', () => {
    game.levelTwoCreateAsteroids;
    expect(asteroids[4].dx).to.be.within(-3.5, 3.5);
    expect(asteroids[7].dx).to.be.within(-3.5, 3.5);
  })

  it('should have random, faster asteroids on level 3', () => {
    game.levelThreeCreateAsteroids;
    expect(asteroids[2].dx).to.be.within(-5, 5);
    expect(asteroids[9].dx).to.be.within(-5, 5);
  })

  it('should have random, faster asteroids on level 4', () => {
    game.levelFourCreateAsteroids;
    expect(asteroids[3].dx).to.be.within(-6, 6);
    expect(asteroids[8].dx).to.be.within(-6, 6);
  })

  it('should have random, faster asteroids on level 5', () => {
    game.levelFiveCreateAsteroids;
    expect(asteroids[1].dx).to.be.within(-7.5, 7.5);
    expect(asteroids[6].dx).to.be.within(-7.5, 7.5);
  })
})