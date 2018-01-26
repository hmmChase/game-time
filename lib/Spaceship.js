var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

class Spaceship {
  constructor(x, y) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.width = 48;
    this.height = 48;
    this.halfX = this.width / 2;
    this.halfY = this.height / 2;
    this.dx = 0;
    this.dy = 0;
    this.radius = 48;
    this.angle = 0;
    this.alive = true;


    this.nose = {
      x: this.x + this.halfX,
      y: this.y
    }

    this.rightWing = {
      x: this.x - this.halfX,
      y: this.y - this.halfX
    }

    this.leftWing = {
      x: this.x - this.halfX,
      y: this.y + this.halfY
    }
    return this;
  }

  draw() {

    // ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.moveTo(this.nose.x, this.nose.y);
    ctx.lineTo(this.rightWing.x, this.rightWing.y) // Right Wing
    ctx.lineTo(this.leftWing.x, this.leftWing.y); // Left Wing
    ctx.closePath();
    ctx.fill();
    return this

  }

  turnLeft() {

    this.update()
  }

  turnRight() {

    this.update()
  }

  turnLeft() {
    // DONT USE YET - TRIG n STUFF coming
    // Point 1 subtracts 1 from X and 1 from Y
    console.log('before:', this.nose.x)
    this.nose.x = this.nose.x - 1;
    this.nose.y = this.nose.y + 1;
    // console.log('after:', this.point1.x)
    this.leftWing.x = this.leftWing.x - 1;
    this.leftWing.y = this.leftWing.y - 1;

    // Point 2 adds 1 to X and adds 1 to Y
    this.rightWing.x = this.rightWing.x + 1;
    this.rightWing.y = this.rightWing.y + 1;

    // Point 3 subtracts 1 from X and adds 1 to Y
    this.update()
  }

  turnRight() {
    // DONT USE YET - TRIG n STUFF coming
    // Point 1 subtracts 1 from X and 1 from Y
    console.log('before:', this.nose.x)
    this.nose.x = this.nose.x + 1;
    this.nose.y = this.nose.y - 1;
    // console.log('after:', this.point1.x)
    this.leftWing.x = this.leftWing.x + 1;
    this.leftWing.y = this.leftWing.y + 1;

    // Point 2 adds 1 to X and adds 1 to Y
    this.rightWing.x = this.rightWing.x - 1;
    this.rightWing.y = this.rightWing.y - 1;

    // Point 3 subtracts 1 from X and adds 1 to Y
    this.update()
  }


  update() {
    this.draw()
  }

  // erase(ctx) {
  //   ctx.clearRect(this.x, this.y, this.width, this.height);
  //   return this;
  // }

}


module.exports = Spaceship;