var Asteroid = require('./Asteroid.js');
var Bullet = require('./Bullet.js');
var Spaceship = require('./Spaceship.js');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


var startScreen = document.getElementById('startScreen');
var spaceship1 = new Spaceship(300, 300);

var asteroids = [];
var bullets = [];

var arrowLeft = 37;
var arrowUp = 38;
var arrowRight = 39;
var arrowDown = 40;


window.addEventListener('keydown', turnSpaceshipKey);
window.addEventListener('keyup', fireBulletKey);
// startScreen.addEventListener('click', startScreenButton);

function startScreenButton() {
  console.log('test')
  this.style.display = "none";
}


gameloop()
createAsteroids()

function gameloop() {
  requestAnimationFrame(gameloop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (spaceship1.alive === true) {
    spaceship1.update()

    bullets.forEach(bullet => {
      bullet.update()
    })
  }

  asteroids.forEach(asteroid => {
    asteroid.draw().update();
  })

  asteroidSpaceShipCollision()
  asteroidBulletCollision()
  removeOffscreenBullet()


  //console.log(bullets.length)
}

function turnSpaceshipKey(e) {
  if (e.keyCode === arrowLeft) {
    e.preventDefault()
    console.log('Left!')
    spaceship1.turnLeft();
  } else if (e.keyCode === arrowRight) {
    e.preventDefault()
    console.log('Right!')
    spaceship1.turnRight();
  } else if (e.keyCode === arrowUp) {
    e.preventDefault()
    console.log('Up!')
    spaceship1.turnUp();
  } else if (e.keyCode === arrowDown) {
    e.preventDefault()
    console.log('Down!')
    spaceship1.turnDown();
  }
}

function fireBulletKey(e) {
  if (e.keyCode === 32) {
    fireBullet();
  }
}

function fireBullet() {
  let bullet = new Bullet(424, 400, 3, 3, 5, 0)

  // console.log(spaceship1.halfX)
  bullets.push(bullet)

}

function createAsteroids() {
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function asteroidSpaceShipCollision() {
  for (let i = 0; i < asteroids.length - 1; i++) {
    // if asteroid is in the same space as spaceship
    if (
      // Horizontal detection
      // (400 - (48/2) <= a[i].x + 30)
      // (ss.x - (half width) <= a.x + its radius)
      // leftside of spaceship <= rightside of asteroid
      (spaceship1.x - (spaceship1.width / 2) <= asteroids[i].x + asteroids[i].radius &&
        // (400 + (48/2) >= a[i].x - 30)
        // (ss.x + (half width) + its width >= a.x - its radius)
        // rightside of spaceship >= leftside of asteroid
        spaceship1.x + (spaceship1.width / 2) >= asteroids[i].x - asteroids[i].radius) &&
      // and
      // Vertical detection  
      // (a[i].y + 30 >= 400)
      // (a.y + its radius >= ss.y)
      // bottom of asteroid <= top of asteroid
      (asteroids[i].y + asteroids[i].radius >= spaceship1.y - (spaceship1.height / 2) &&
        // (a[i].y - 30 <= 400 + 48)
        // (a.y - its radius <= ss.y - its height)
        // top of asteroid <= bottom of asteroid
        asteroids[i].y - asteroids[i].radius <= spaceship1.y + (spaceship1.height / 2))
    ) {
      // do this
      // spaceship1.alive = false;
    }
  }
}


function asteroidBulletCollision() {
  if (bullets.length >= 1) {
    // console.log(bullets.length, 'shots fired')

    for (let i = 0; i < bullets.length - 1; i++) {
      //console.log(bullets[i].x)


      for (let j = 0; i < asteroids.length - 1; j++) {
        // console.log(bullets)
        // console.log(asteroids)


        if (
          // Horizontal detection
          //console.log(asteroids)
          // leftside of spaceship <= rightside of asteroid
          ((bullets[i].x - (bullets[i].width / 2)) <= (asteroids[j].x + asteroids[j].radius) &&

            // rightside of spaceship >= leftside of asteroid
            (bullets[i].x + (bullets[i].width / 2)) >= (asteroids[j].x - asteroids[j].radius)) &&

          // Vertical detection  

          // bottom of asteroid <= top of asteroid
          (asteroids[j].y + asteroids[j].radius >= bullets[i].y - (bullets[i].height / 2) &&

            // top of asteroid <= bottom of asteroid
            asteroids[j].y - asteroids[j].radius <= bullets[i].y + (bullets[i].height / 2))
        ) {
          // do this
          console.log('hit')
          // ctx.strokeStyle = 'red';
        }


      }


    }
  }
}

function removeOffscreenBullet() {
  for (let i = 0; i < bullets.length; i++) {
    if (
      // if bullet exits top or bottom
      (bullets[i].y <= 0 || bullets[i].y >= canvas.width) ||
      // if bullet exits left or right
      (bullets[i].x <= 0 || bullets[i].x >= canvas.width)
    ) {
      // remove bullet
      bullets.splice(i, 1)
    }
  }
}