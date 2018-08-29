const Gamepiece = require('./Gamepiece.js');

class Spaceship extends Gamepiece {
  constructor(x, y, radius, dx, dy) {
    super(...arguments);
    this.angle = 0;
    this.alive = true;
    return this;
  }

  draw(ctx) {
    const img = new Image();

    img.src = './images/ufo.png';
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.drawImage(img, -30, -30, 60, 60);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, -5, 45, 10);
    ctx.restore();

    return this;
  }

  asteroidSpaceShipCollision(asteroids) {
    asteroids.forEach((asteroid) => {
      const leftsideSpaceship = this.x - this.radius;
      const rightsideSpaceship = this.x + this.radius;
      const topSpaceship = this.y - this.radius;
      const bottomSpaceship = this.y + this.radius;
      const leftsideAsteroid = asteroid.x - asteroid.radius;
      const rightsideAsteroid = asteroid.x + asteroid.radius;
      const topAsteroid = asteroid.y - asteroid.radius;
      const bottomAsteroid = asteroid.y + asteroid.radius;

      if (
        leftsideSpaceship <= rightsideAsteroid &&
        rightsideSpaceship >= leftsideAsteroid &&
        (bottomAsteroid >= topSpaceship &&
          topAsteroid <= bottomSpaceship)
      ) {
        this.alive = false;
      }
    });
  }

  moveNeg(direction, increment) {
    this[direction] -= this[increment]
  }

  movePos(direction, increment) {
    this[direction] += this[increment]
  }

  updateCanon(mouseX, mouseY, canvas) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;

    this.angle = Math.atan2(dy, dx);
    this.update(canvas);
    return this;
  }

  update(canvas) {
    if (this.x - this.radius > canvas.width) {
      this.x = 0 - this.radius;
    } else if (this.x + this.radius < 0) {
      this.x = canvas.width + this.radius;
    }
    if (this.y - this.radius > canvas.height) {
      this.y = 0 - this.radius;
    } else if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
    }
    return this;
  }


}

module.exports = Spaceship;