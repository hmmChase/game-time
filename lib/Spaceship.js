console.log('hi')

class Spaceship {
  constructor(x, y, width, height) {

    this.x = 10;
    this.y = 10;
    this.width = 10;
    this.height = 10;
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height)
    return this;
  }
}



module.exports = Spaceship;