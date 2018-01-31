const chai = require('chai');
const { assert, expect } = chai;
const Bullet = require('../lib/Bullet.js');

describe('Bullet', function() {
  const bullets = [];

  beforeEach(function() {
    for (let i = 0; i < 1; i++) {
    bullets.push(new Bullet());
    }
  });

  it('should be a function', function() {
    assert.isFunction(Bullet);
  });

  it('should be a small bullet', function() {
    assert.equal(bullets[0].radius, 3);
  });
});
