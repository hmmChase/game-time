const chai = require('chai');
const { assert, expect } = chai;
const Asteroid = require('../lib/Asteroid.js');
const canvas = {
  width: 1000,
  height: 600
}

describe('Asteroid', function() {
  const asteroids = [];
  
  beforeEach(function () {
    for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
    }
  })

  it('should generate 10 asteroids on start', function () {
    assert.equal(asteroids.length, 10) 
  });

  it('should be a function', function () {
    assert.isFunction(Asteroid)
  });

  it('should have an x coordinate', function () {
    assert.equal(asteroids[5].x, -60)
  })

  it('should have an y coordinate', function () {
    assert.equal(asteroids[5].y, -60)
  })

  it('should have a radius', function () {
    assert.equal(asteroids[5].radius, 30)
  })

  // it('should', function () {
  //   asteroids.forEach((asteroid) => {
      
  //   }update()
  // })

})
