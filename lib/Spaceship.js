var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Spaceship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.v = 5;
    this.angle;
    this.dx = 10;
    this.dy = 10;   
    this.alive = true;    


    // this.width = width;
    // this.height = height;
    // this.radius = 10;
    // this.angle = 1;
  
    // this.turn = 0;


    return this;
  }

  draw() {
    //ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.fillStyle = 'green'
    ctx.beginPath();
    ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI)
    ctx.fill();

    ctx.fillStyle = 'red'
    ctx.fillRect(this.x, this.y-10, 50, 20)
    ctx.restore()

    // ctx.save()
    // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(this.angle * Math.PI / this.turn) // # iterations to complete the circle 
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.restore()
    // this.angle += 1;
  }

  turnLeft() {
    console.log(this.turn)
    this.x -= this.dx;
    // console.log('Turn Left!')
    // ctx.save()
    // this.angle += 10;
    // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(this.angle * Math.PI / 5) // # iterations to complete the circle 
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.restore()
    //turnLeftUpdate()
  }

  turnRight() {
    console.log(this.turn)
    this.x += this.dx;
    // console.log(this.turn)
    // this.turn += 5;
  }

  turnUp() {
    console.log(this.turn)
    this.y -= this.dy;
    // console.log(this.turn)
    // this.turn += 5;
  }

  turnDown() {
    console.log(this.turn)
    this.y += this.dy;
    // console.log(this.turn)
    // this.turn += 5;
  }

  update() {
    this.draw()
  }
}


module.exports = Spaceship;