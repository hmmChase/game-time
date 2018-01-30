const chai = require('chai');
const { assert } = chai;
// const assert = chai.assert;
const Asteroid = require('../lib/Asteroid.js')

describe('Asteroid', function() {

  it('should be a function', function () {
    assert.isFunction(Asteroid)
  });
  
})
