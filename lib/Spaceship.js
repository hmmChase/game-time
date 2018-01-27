var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Spaceship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;
    this.v = 5;
    this.angle = 0;
    this.dx = 10;
    this.dy = 10;   
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

    // ctx.save()
    // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(this.angle * Math.PI / this.turn) // # iterations to complete the circle 
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.restore()
    // this.angle += 1;
  }

  moveLeft() {
    this.x -= this.dx;
    // console.log('move Left!')
    // ctx.save()
    // this.angle += 10;
    // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(this.angle * Math.PI / 5) // # iterations to complete the circle 
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.restore()
    //moveLeftUpdate()
  }

  moveRight() {
    this.x += this.dx;
    // this.move += 5;
  }

  moveUp() {
    this.y -= this.dy;
    // this.move += 5;
  }

  moveDown() {
    this.y += this.dy;
    // this.turn += 5;
  }

  updateCanon(mouseX, mouseY) {
    console.log('mouse X:', mouseX)
    console.log('mouse Y:', mouseY)
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
    this.draw()
  }
}


module.exports = Spaceship;