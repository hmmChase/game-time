const chai = require('chai');
const { assert, expect } = chai;
const Spaceship = require('../lib/Spaceship.js')

describe('Spaceship', function() {

  it('should be a function', function () {
    assert.isFunction(Spaceship)
  });

  it('spaceship is alive', function () {
    let spaceship = new Spaceship();
    assert.equal(spaceship.alive, true)
  });

  
})


