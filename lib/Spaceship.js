var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var angle = 0;

class Spaceship {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = 10;
    this.angle = 5;
    this.alive = true;
    // this.img = new Image();
    // this.img.src = ''

    return this;
  }

  draw() {
    ctx.save()
    // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(this.angle * Math.PI / 0) // # iterations to complete the circle 
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.drawImg(img, x, y, h, w)
    // ctx.restore()
    // this.angle += 1;


    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  turnLeft() {
    console.log('Turn Left!')
    ctx.save()
    this.angle += 10;
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.angle * Math.PI / 5) // # iterations to complete the circle 
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore()
    turnLeftUpdate()
  }

  turnLeftUpdate() {
    this.turnLeft()
  }

  turnRight() {
    console.log('Turn Right!')
    this.update()
  }

  update() {
    this.draw()
  }
}


module.exports = Spaceship;