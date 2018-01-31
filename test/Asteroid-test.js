const chai = require('chai');
const { assert, expect } = chai;
const Asteroid = require('../lib/Asteroid.js');
const canvas = {
  width: 1000,
  height: 600
}

describe('Asteroid', () => {
  const asteroids = [];
  
  beforeEach( () => {
    for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
    }
  })

  it('should generate 10 asteroids on start', () => {
    assert.equal(asteroids.length, 10) 
  });

  it('should be a function', () => {
    assert.isFunction(Asteroid)
  });

  it('should have an x coordinate', () => {
    assert.equal(asteroids[5].x, -60)
  })

  it('should have an y coordinate', () => {
    assert.equal(asteroids[5].y, -60)
  })

  it('should have a radius', () => {
    assert.equal(asteroids[5].radius, 30)
  })

  it('should have a random velocity', () => {

  })

  it('should loop around the bottom', () => {
    asteroids[5].y = 600;
    asteroids[5].dx = 0;
    asteroids[5].dy = 20
    assert.equal(asteroids[5].y, 600);
    for (let i = 0; i < 3; i ++) { 
      asteroids[5].update(canvas);
    }
    assert.equal(asteroids[5].y, -10);
  })

  it('should loop over the top', () => {
    asteroids[5].y = 0;
    asteroids[5].dx = 0;
    asteroids[5].dy = -20
    assert.equal(asteroids[5].y, 0);
    for (let i = 0; i < 3; i ++) { 
      asteroids[5].update(canvas);
    }
    assert.equal(asteroids[5].y, 610);
  })

  it('should loop around the left side', () => {
    asteroids[5].y = 300;
    asteroids[5].x = 0
    asteroids[5].dx = -20;
    asteroids[5].dy = 0;
    assert.equal(asteroids[5].x, 0);
    for (let i = 0; i < 3; i ++) { 
      asteroids[5].update(canvas);
    }
    assert.equal(asteroids[5].x, 1010);
  })

  it('should loop around the right side', () => {
    asteroids[5].y = 300;
    asteroids[5].x = 1000;
    asteroids[5].dx = 20;
    asteroids[5].dy = 0;
    assert.equal(asteroids[5].x, 1000);
    for (let i = 0; i < 3; i ++) { 
      asteroids[5].update(canvas);
    }
    assert.equal(asteroids[5].x, -10);
  })  
})
