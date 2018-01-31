const chai = require('chai');
const { assert, expect } = chai;
const Spaceship = require('../lib/Spaceship.js');
const Game = require('../lib/Game.js');
const canvas = {
  width: 1000,
  height: 600
}

describe('Spaceship', () => {

  let game;
  let spaceship;
  
  beforeEach(function () {
    game = new Game();
    spaceship = new Spaceship();
  })

  it('should be an constructor', () => {
    assert.isFunction(Spaceship, true)
  });

  it('spaceship is alive', () => {
    assert.equal(spaceship.alive, true)
  });

  it('should start horizontal', () => {
    assert.equal(spaceship.angle, 0)
  })

  it('should generate in the middle of the screen', () => {
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 300);
  })

  it('should move left', () => {
    spaceship.moveLeft()
    assert.equal(spaceship.x, 480);
    assert.equal(spaceship.y, 300);
  })

  it('should move right', () => {
    spaceship.moveRight()
    assert.equal(spaceship.x, 520);
    assert.equal(spaceship.y, 300);
  })

  it('should move up', () => {
    spaceship.moveUp()
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 280);
  })

  it('should move down', () => {
    spaceship.moveDown()
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 320);
  })

  it('should loop around the right corner', () => {
    assert.equal(spaceship.x, 500);
    assert.equal(canvas.width, 1000);
    for (let i = 0; i < 25; i ++) {
      spaceship.moveRight()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, 1000);
    for (let i = 0; i < 2; i ++) {
      spaceship.moveRight()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, -30);

  })

  it('should loop around the left corner', () => {
    assert.equal(spaceship.x, 500);
    assert.equal(canvas.width, 1000);
    for (let i = 0; i < 25; i ++) {
      spaceship.moveLeft()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, 0);

    for (let i = 0; i < 2; i ++) {
      spaceship.moveLeft()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, 1030);
  })

  it('should loop over the top', () => {
    assert.equal(spaceship.y, 300);
    assert.equal(canvas.height, 600);
    for (let i = 0; i < 15; i ++) {
      spaceship.moveUp()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, 0);

    for (let i = 0; i < 2; i ++) {
      spaceship.moveUp()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, 630);
  })

  it('should loop around the bottom', () => {
    assert.equal(spaceship.y, 300);
    assert.equal(canvas.height, 600);
    for (let i = 0; i < 15; i ++) {
      spaceship.moveDown()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, 600);

    for (let i = 0; i < 2; i ++) {
      spaceship.moveDown()
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, -30);
  })


})


