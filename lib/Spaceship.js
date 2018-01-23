var canvas = document.querySelector('canvas');


class Spaceship {
  constructor(x, y, width, height) {
    this.x = canvas.width / 2 - width / 2;
    this.y = canvas.height / 2 - height / 2;
    this.width = width;
    this.height = height;

  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    return this;
  }
}



module.exports = Spaceship;