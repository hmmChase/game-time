const chai = require('chai');
const { assert, expect } = chai;
const Spaceship = require('../lib/Spaceship.js');
const Game = require('../lib/Game.js');
const canvas = {
  width: 1000,
  height: 600
}

describe('Spaceship', function() {

  let game;
  let spaceship;
  
  beforeEach(function () {
    game = new Game();
    spaceship = new Spaceship();
  })

  it('should be an constructor', function () {
    assert.isFunction(Spaceship, true)
  });

  it('spaceship is alive', function () {
    assert.equal(spaceship.alive, true)
  });

  it('should start horizontal', function() {
    assert.equal(spaceship.angle, 0)
  })

  it('should generate in the middle of the screen', function() {
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 300);
  })

  it('should move left', function() {
    spaceship.moveLeft()
    assert.equal(spaceship.x, 480);
    assert.equal(spaceship.y, 300);
  })

  it('should move right', function() {
    spaceship.moveRight()
    assert.equal(spaceship.x, 520);
    assert.equal(spaceship.y, 300);
  })

  it('should move up', function() {
    spaceship.moveUp()
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 280);
  })

  it('should move down', function() {
    spaceship.moveDown()
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 320);
  })



})


