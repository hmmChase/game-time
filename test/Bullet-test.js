const chai = require('chai');
const { assert, expect } = chai;
// const assert = chai.assert;
const Bullet = require('../lib/Bullet.js')

describe('Bullet', function() {

  it('should be a function', function () {
    assert.isFunction(Bullet)
  });
  
})
