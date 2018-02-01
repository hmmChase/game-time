const chai = require('chai');
const { assert, expect } = chai;
const Gamepiece = require('../lib/Gamepiece.js');
const Asteroid = require('../lib/Asteroid.js');
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
    spaceship = new Spaceship(500, 300, 30, 20, 20);
  })

  it('should be an constructor', () => {
    assert.isFunction(Spaceship, true)
  });

  it('extends the gamepiece class', () => {
    expect(spaceship).to.be.instanceOf(Gamepiece);
  })

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
    spaceship.moveNeg('x', 'dx')
    assert.equal(spaceship.x, 480);
    assert.equal(spaceship.y, 300);
  })

  it('should move right', () => {
    spaceship.movePos('x', 'dx')
    assert.equal(spaceship.x, 520);
    assert.equal(spaceship.y, 300);
  })

  it('should move up', () => {
    spaceship.moveNeg('y', 'dy')
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 280);
  })

  it('should move down', () => {
    spaceship.movePos('y', 'dy')
    assert.equal(spaceship.x, 500);
    assert.equal(spaceship.y, 320);
  })

  it('should loop around the right corner', () => {
    assert.equal(spaceship.x, 500);
    assert.equal(canvas.width, 1000);

    for (let i = 0; i < 25; i ++) {
      spaceship.movePos('x', 'dx')
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, 1000);
    for (let i = 0; i < 2; i ++) {
      spaceship.movePos('x', 'dx')
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, -30);
  })

  it('should loop around the left corner', () => {
    assert.equal(spaceship.x, 500);
    assert.equal(canvas.width, 1000);
    for (let i = 0; i < 25; i ++) {
      spaceship.moveNeg('x', 'dx') // moveLeft
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, 0);

    for (let i = 0; i < 2; i ++) {
      spaceship.moveNeg('x', 'dx') // moveLeft
      spaceship.update(canvas)
    }
    assert.equal(spaceship.x, 1030);
  })

  it('should loop over the top', () => {
    assert.equal(spaceship.y, 300);
    assert.equal(canvas.height, 600);
    for (let i = 0; i < 15; i ++) {
      spaceship.moveNeg('y', 'dy') // moveUp
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, 0);

    for (let i = 0; i < 2; i ++) {
      spaceship.moveNeg('y', 'dy') // moveUp
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, 630);
  })

  it('should loop around the bottom', () => {
    assert.equal(spaceship.y, 300);
    assert.equal(canvas.height, 600);

    for (let i = 0; i < 15; i ++) {
      spaceship.movePos('y', 'dy') // moveDown
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, 600);

    for (let i = 0; i < 2; i ++) {
      spaceship.movePos('y', 'dy') // moveDown
      spaceship.update(canvas)
    }
    assert.equal(spaceship.y, -30);
  })

  it('should not be alive when it hits an asteroid', () => {
   
    const asteroids = [];
    
    for (let i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }
 
    asteroids[5].y = 300;
    asteroids[5].x = 490;
    asteroids[5].dx = 1;
    asteroids[5].dy = 0;
 
    assert.equal(spaceship.alive, true);

    for (let i = 0; i < 20; i++) {
     asteroids[5].update(canvas);
     spaceship.asteroidSpaceShipCollision(asteroids)
    }

   assert.equal(spaceship.alive, false);
  })

  it('should set spaceship.alive = false when lefside of spaceship collides with rightside of asteroid', () => {
    const asteroids = [];

    for (let i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }

    asteroids[5].y = 300;
    asteroids[5].x = 400;
    asteroids[5].dx = 1;
    asteroids[5].dy = 0;

    assert.equal(spaceship.alive, true);

    for (let i = 0; i < 100; i++) {
      asteroids[5].update(canvas);
      spaceship.asteroidSpaceShipCollision(asteroids)
    }

    assert.equal(spaceship.alive, false);
  })

  it('should set spaceship.alive = false when rightside of spaceship collides with leftside of asteroid', () => {
    const asteroids = [];

    for (let i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }

    asteroids[5].y = 300;
    asteroids[5].x = 600;
    asteroids[5].dx = -1;
    asteroids[5].dy = 0;

    assert.equal(spaceship.alive, true);

    for (let i = 0; i < 100; i++) {
      asteroids[5].update(canvas);
      spaceship.asteroidSpaceShipCollision(asteroids)
    }

    assert.equal(spaceship.alive, false);
  })

  it('should set spaceship.alive = false when top of spaceship collides with bottom of asteroid', () => {
    const asteroids = [];

    for (let i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }

    asteroids[5].y = 200;
    asteroids[5].x = 500;
    asteroids[5].dx = 0;
    asteroids[5].dy = 1;

    assert.equal(spaceship.alive, true);

    for (let i = 0; i < 100; i++) {
      asteroids[5].update(canvas);
      spaceship.asteroidSpaceShipCollision(asteroids)
    }

    assert.equal(spaceship.alive, false);
  })

  it('should set spaceship.alive = false when bottom of spaceship collides with top of asteroid', () => {
    const asteroids = [];

    for (let i = 0; i < 10; i++) {
      asteroids.push(new Asteroid());
    }

    asteroids[5].y = 400;
    asteroids[5].x = 500;
    asteroids[5].dx = 0;
    asteroids[5].dy = -1;

    assert.equal(spaceship.alive, true);

    for (let i = 0; i < 100; i++) {
      asteroids[5].update(canvas);
      spaceship.asteroidSpaceShipCollision(asteroids)
    }

    assert.equal(spaceship.alive, false);
  })
})