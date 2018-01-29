var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Spaceship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;
    this.v = 5;
    this.angle = 0;
    this.dx = 20;
    this.dy = 20;   
    this.alive = true;    
    return this;
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.fillStyle = '#ccc'
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI)
    ctx.fill();

    ctx.fillStyle = 'red'
    ctx.fillRect(0, -5, 45, 10)
    ctx.restore()

    return this;

    // ctx.save()
    // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(this.angle * Math.PI / this.turn) // # iterations to complete the circle 
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.restore()
    // this.angle += 1;
  }

  moveLeft() {
    this.x -= this.dx;
  }

  moveRight() {
    this.x += this.dx;
  }

  moveUp() {
    this.y -= this.dy;
  }

  moveDown() {
    this.y += this.dy;
  }

  moveDownLeft() {
    this.x -= this.dx;
    this.y += this.dy;
  }

  moveUpLeft() {
    this.x -= this.dx;
    this.y -= this.dy;
  }

  moveRightUp() {
    this.x += this.dx;
    this.y -= this.dy;
  }

  moveLeftUp() {
    this.x -= this.dx;
    this.y -= this.dy;
  }

  updateCanon(mouseX, mouseY) {
    // console.log('mouse X:', mouseX)
    // console.log('mouse Y:', mouseY)
    var dx = mouseX - this.x;
    var dy = mouseY - this.y;
    this.angle = Math.atan2(dy, dx)
    this.update()
    return this
  }

  fireBullet(mouseX, mouseY) {
    let dx = Math.cos(this.angle) 
    let dy = Math.sin(this.angle)
    fireBullet(this.x, this.y, dx, dy)
  }

  update() {
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

    // this.draw()

    
  }
}


module.exports = Spaceship;