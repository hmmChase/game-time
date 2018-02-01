class Asteroid {
  constructor() {
    this.x = -60;
    this.y = -60;
    this.radius = 30;
    this.dx = (Math.random() - 0.5) * 5;
    this.dy = (Math.random() - 0.5) * 5;
    this.score = 0;
  }

  draw(ctx) {
    const img = new Image();

    img.src = './images/asteroid.png';
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(img, this.x - 30, this.y - 30, 60, 60);
    ctx.restore();

    return this;
  }

  loopBullets(bullets, asteroids, score) {
    if (bullets.length > 0) {
      bullets.forEach((bullet, bulletIndex, bulletArray) => {
        this.checkBulletCollision(bullet, bulletIndex, bulletArray, asteroids, score);
      });
    }
  }

  checkBulletCollision(bullet, bulletIndex, bulletArray, asteroids, score) {
    asteroids.forEach((asteroid, asteroidIndex) => {
      const leftsideBullet = bullet.x - bullet.radius;
      const rightsideBullet = bullet.x + bullet.radius;
      const topBullet = bullet.y - bullet.radius;
      const bottomBullet = bullet.y + bullet.radius;
      const leftsideAsteroid = asteroid.x - asteroid.radius;
      const rightsideAsteroid = asteroid.x + asteroid.radius;
      const topAsteroid = asteroid.y - asteroid.radius;
      const bottomAsteroid = asteroid.y + asteroid.radius;

      if (
        leftsideBullet <= rightsideAsteroid &&
        rightsideBullet >= leftsideAsteroid &&
        bottomAsteroid >= topBullet &&
        topAsteroid <= bottomBullet
      ) {
        asteroids.splice(asteroidIndex, 1);
        bulletArray.splice(bulletIndex, 1);

        this.score++;
      }
    });
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
    this.x += this.dx;
    this.y += this.dy;

    return this;
  }
}

module.exports = Asteroid;