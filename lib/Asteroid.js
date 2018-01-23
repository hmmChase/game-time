class Asteroid {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
  }

  draw(ctx) {
    for (let i = 0; i < asteroidsCount; i++) {
      var x = Math.random() * 1600;
      var y = Math.random() * 800;

      asteroids.push(new Asteroid(x, y, 30));
      
      ctx.beginpath();
      ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
      ctx.stroke();
      return this;
    }

  }

}











module.exports = Asteroid;