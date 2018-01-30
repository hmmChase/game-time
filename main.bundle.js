/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(1);
	var Bullet = __webpack_require__(2);
	var Spaceship = __webpack_require__(3);
	
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	
	var startScreen = document.getElementById('start-screen');
	var gameStats = document.getElementById('game-stats');
	var levelValue = document.getElementById('level-value');
	var currentScoreValue = document.getElementById('current-score-value');
	var highScoreValue = document.getElementById('high-score-value');
	var endScreen = document.getElementById('end-screen');
	
	var spaceship1 = new Spaceship();
	
	var asteroids = [];
	var bullets = [];
	var level = 1;
	var currentScore = 0;
	var highScore = 0;
	
	// window.addEventListener('keydown', keyDown);
	// window.addEventListener('keyup', keyUp)
	
	window.addEventListener('keydown', input);
	window.addEventListener('keyup', fireBulletKey);
	window.addEventListener('mousemove', mouseMove);
	startScreen.addEventListener('click', initCanvas);
	endScreen.addEventListener('click', restartGame);
	
	highScoreValue.innerText = highScore;
	
	function initCanvas() {
	  startScreen.style.display = "none";
	  canvas.style.display = "block";
	  gameStats.style.display = "flex";
	  levelOneCreateAsteroids();
	  gameloop();
	  levelValue.innerText = level;
	  currentScoreValue.innerText = currentScore;
	}
	
	function gameOver() {
	  endScreen.style.display = "block";
	  // update scores
	}
	
	function restartGame() {
	  window.location.reload(true);
	}
	
	function levelUp() {
	  if (level === 1 && spaceship1.alive && asteroids.length === 0) {
	    level++;
	    levelValue.innerText = level;
	    levelTwoCreateAsteroids();
	  } else if (level === 2 && spaceship1.alive && asteroids.length === 0) {
	    level++;
	    levelValue.innerText = level;
	    levelThreeCreateAsteroids();
	  } else if (level === 3 && spaceship1.alive && asteroids.length === 0) {
	    level++;
	    levelValue.innerText = level;
	    levelFourCreateAsteroids();
	  } else if (level === 4 && spaceship1.alive && asteroids.length === 0) {
	    level++;
	    levelValue.innerText = level;
	    levelFiveCreateAsteroids();
	  }
	}
	
	function gameloop() {
	  requestAnimationFrame(gameloop);
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	  if (spaceship1.alive === true) {
	    spaceship1.draw(ctx).update(canvas);
	
	    bullets.forEach(bullet => {
	      bullet.draw(ctx).update(canvas);
	    });
	  } else {
	    gameOver();
	  }
	
	  asteroids.forEach(asteroid => {
	    asteroid.draw(ctx).update(canvas);
	  });
	
	  levelUp();
	  asteroidSpaceShipCollision();
	  // removeOffscreenBullet()
	  loopBullets();
	}
	
	function mouseMove(e) {
	  var mouseX = e.clientX;
	  var mouseY = e.clientY;
	
	  spaceship1.updateCanon(mouseX, mouseY, canvas);
	}
	
	function input(e) {
	  var input = e.keyCode;
	
	  switch (input) {
	    case 87:
	      spaceship1.moveUp();
	      break;
	    case 65:
	      spaceship1.moveLeft();
	      break;
	    case 68:
	      spaceship1.moveRight();
	      break;
	    case 83:
	      spaceship1.moveDown();
	      break;
	  }
	}
	
	function fireBulletKey(e) {
	  if (spaceship1.alive === true) {
	    if (e.keyCode === 32) {
	      e.preventDefault();
	      fireBullet(spaceship1);
	    }
	  }
	}
	
	function fireBullet(spaceship1) {
	  // var angle = spaceship.updateCanon();
	  // console.log('spaceship angle:', spaceship1.angle)
	  let dx = Math.cos(spaceship1.angle);
	  let dy = Math.sin(spaceship1.angle);
	  let bullet = new Bullet(spaceship1.x, spaceship1.y, dx, dy);
	
	  bullets.push(bullet);
	}
	
	function levelOneCreateAsteroids() {
	  for (let i = 0; i < 10; i++) {
	    asteroids.push(new Asteroid());
	  }
	}
	
	function levelTwoCreateAsteroids() {
	  for (let i = 0; i < 15; i++) {
	    asteroids.push(new Asteroid());
	    asteroids.forEach(function (asteroid) {
	      asteroid.dx = (Math.random() - .5) * 7;
	      asteroid.dy = (Math.random() - .5) * 7;
	    });
	  }
	}
	
	function levelThreeCreateAsteroids() {
	  for (let i = 0; i < 20; i++) {
	    asteroids.push(new Asteroid());
	    asteroids.forEach(function (asteroid) {
	      asteroid.dx = (Math.random() - .5) * 10;
	      asteroid.dy = (Math.random() - .5) * 10;
	    });
	  }
	}
	function levelFourCreateAsteroids() {
	  for (let i = 0; i < 25; i++) {
	    asteroids.push(new Asteroid());
	    asteroids.forEach(function (asteroid) {
	      asteroid.dx = (Math.random() - .5) * 12;
	      asteroid.dy = (Math.random() - .5) * 12;
	    });
	  }
	}
	
	function levelFiveCreateAsteroids() {
	  for (let i = 0; i < 30; i++) {
	    asteroids.push(new Asteroid());
	    asteroids.forEach(function (asteroid) {
	      asteroid.dx = (Math.random() - .5) * 15;
	      asteroid.dy = (Math.random() - .5) * 15;
	    });
	  }
	}
	
	// function removeOffscreenBullet() {
	//   for (let i = 0; i < bullets.length; i++) {
	//     if (
	//       // if bullet exits top or bottom
	//       (bullets[i].y <= 0 || bullets[i].y >= canvas.width) ||
	//       // if bullet exits left or right
	//       (bullets[i].x <= 0 || bullets[i].x >= canvas.width)
	//     ) {
	//       // remove bullet
	//       bullets.splice(i, 1)
	//     }
	//   }
	// }
	
	function asteroidSpaceShipCollision() {
	  for (let i = 0; i < asteroids.length; i++) {
	    // if asteroid is in the same space as spaceship
	    if (
	    // Horizontal detection
	    // leftside of spaceship <= rightside of asteroid
	    spaceship1.x - spaceship1.radius <= asteroids[i].x + asteroids[i].radius &&
	    // rightside of spaceship >= leftside of asteroid
	    spaceship1.x + spaceship1.radius >= asteroids[i].x - asteroids[i].radius &&
	    // and
	    // Vertical detection  
	    // bottom of asteroid <= top of asteroid
	    asteroids[i].y + asteroids[i].radius >= spaceship1.y - spaceship1.radius &&
	    // top of asteroid <= bottom of asteroid
	    asteroids[i].y - asteroids[i].radius <= spaceship1.y + spaceship1.radius) {
	      // do this
	      spaceship1.alive = false;
	    }
	  }
	}
	
	function loopBullets() {
	  if (bullets.length > 0) {
	    bullets.forEach(function (bullet, index) {
	      checkBulletCollision(bullet, index);
	    });
	  }
	}
	
	function checkBulletCollision(bullet, index) {
	  for (var i = 0; i < asteroids.length; i++) {
	    if (bullet.x - bullet.radius <= asteroids[i].x + asteroids[i].radius && bullet.x + bullet.radius >= asteroids[i].x - asteroids[i].radius && asteroids[i].y + asteroids[i].radius >= bullet.y - bullet.radius && asteroids[i].y - asteroids[i].radius <= bullet.y + bullet.radius) {
	      asteroids.splice(i, 1);
	      bullets.splice(index, 1);
	      currentScore++;
	      currentScoreValue.innerText = currentScore;
	    }
	  }
	}
	
	// function keyUp(e) {
	//   if (e.keyCoe in map) {
	//     map[e.keyCode] = false;
	//   }
	// }
	
	// const map = {
	//   87: false, // up
	//   65: false, // left
	//   68: false, // down
	//   83: false, // right
	// }
	
	// function keyDown(e) {
	//   if (e.keyCode in map) {
	//     map[e.keyCode] = true;
	//     if (map[87]) {
	//       spaceship1.moveUp()
	//     } else if (map[65]) {
	//       spaceship1.moveLeft()
	//     } else if (map[68]) {
	//       spaceship1.moveDown()
	//     } else if (map[83]) {
	//       spaceship1.moveRight() 
	//     } else if (map[87] && map[65]) {
	//       spaceship1.moveUpLeft()
	//     } else if (map[87] && map[83]) {
	//       spaceship1.moveUpRight()
	//     } else if (map[68] && map[65]) {
	//       spaceship1.moveDownLeft()
	//     } else if (map[68] && map[83]) {
	//       spaceship1.moveDownRight()
	//     }
	//   }
	// }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	class Asteroid {
	  constructor() {
	    this.x = -60;
	    this.y = -60;
	    this.dx = (Math.random() - .5) * 5;
	    this.dy = (Math.random() - .5) * 5;
	    this.radius = 30;
	  }
	
	  draw(ctx) {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	    ctx.strokeStyle = 'orange';
	    ctx.stroke();
	    return this;
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class Bullet {
	  constructor(x, y, dx, dy) {
	    this.x = x;
	    this.y = y;
	    this.radius = 3;
	    this.dx = dx;
	    this.dy = dy;
	  }
	
	  draw(ctx) {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	    ctx.fillStyle = 'red';
	    ctx.fill();
	    ctx.strokeStyle = 'red';
	    ctx.stroke();
	    return this;
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
	    this.x += this.dx * 5;
	    this.y += this.dy * 5;
	    // this.draw()
	    return this;
	  }
	}
	
	module.exports = Bullet;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class Spaceship {
	  constructor() {
	    this.x = 500;
	    this.y = 300;
	    this.radius = 30;
	    this.v = 5;
	    this.angle = 0;
	    this.dx = 20;
	    this.dy = 20;
	    this.alive = true;
	    return this;
	  }
	
	  draw(ctx) {
	    ctx.save();
	    ctx.translate(this.x, this.y);
	    ctx.rotate(this.angle);
	    ctx.fillStyle = '#ccc';
	    ctx.beginPath();
	    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.fillStyle = 'red';
	    ctx.fillRect(0, -5, 45, 10);
	    ctx.restore();
	
	    return this;
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
	
	  updateCanon(mouseX, mouseY, canvas) {
	    // console.log('mouse X:', mouseX)
	    // console.log('mouse Y:', mouseY)
	    var dx = mouseX - this.x;
	    var dy = mouseY - this.y;
	
	    this.angle = Math.atan2(dy, dx);
	    this.update(canvas);
	    return this;
	  }
	
	  // fireBullet() {
	  //   let dx = Math.cos(this.angle) 
	  //   let dy = Math.sin(this.angle)
	
	  //   fireBullet(this.x, this.y, dx, dy)
	  // }
	
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
	    return this;
	  }
	}
	
	module.exports = Spaceship;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjE0NDU5MGE3MzcxZmVjN2Q4MzMiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9Bc3Rlcm9pZC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvQnVsbGV0LmpzIiwid2VicGFjazovLy8uL2xpYi9TcGFjZXNoaXAuanMiXSwibmFtZXMiOlsiQXN0ZXJvaWQiLCJyZXF1aXJlIiwiQnVsbGV0IiwiU3BhY2VzaGlwIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3R4IiwiZ2V0Q29udGV4dCIsInN0YXJ0U2NyZWVuIiwiZ2V0RWxlbWVudEJ5SWQiLCJnYW1lU3RhdHMiLCJsZXZlbFZhbHVlIiwiY3VycmVudFNjb3JlVmFsdWUiLCJoaWdoU2NvcmVWYWx1ZSIsImVuZFNjcmVlbiIsInNwYWNlc2hpcDEiLCJhc3Rlcm9pZHMiLCJidWxsZXRzIiwibGV2ZWwiLCJjdXJyZW50U2NvcmUiLCJoaWdoU2NvcmUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiaW5wdXQiLCJmaXJlQnVsbGV0S2V5IiwibW91c2VNb3ZlIiwiaW5pdENhbnZhcyIsInJlc3RhcnRHYW1lIiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJkaXNwbGF5IiwibGV2ZWxPbmVDcmVhdGVBc3Rlcm9pZHMiLCJnYW1lbG9vcCIsImdhbWVPdmVyIiwibG9jYXRpb24iLCJyZWxvYWQiLCJsZXZlbFVwIiwiYWxpdmUiLCJsZW5ndGgiLCJsZXZlbFR3b0NyZWF0ZUFzdGVyb2lkcyIsImxldmVsVGhyZWVDcmVhdGVBc3Rlcm9pZHMiLCJsZXZlbEZvdXJDcmVhdGVBc3Rlcm9pZHMiLCJsZXZlbEZpdmVDcmVhdGVBc3Rlcm9pZHMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImRyYXciLCJ1cGRhdGUiLCJmb3JFYWNoIiwiYnVsbGV0IiwiYXN0ZXJvaWQiLCJhc3Rlcm9pZFNwYWNlU2hpcENvbGxpc2lvbiIsImxvb3BCdWxsZXRzIiwiZSIsIm1vdXNlWCIsImNsaWVudFgiLCJtb3VzZVkiLCJjbGllbnRZIiwidXBkYXRlQ2Fub24iLCJrZXlDb2RlIiwibW92ZVVwIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJtb3ZlRG93biIsInByZXZlbnREZWZhdWx0IiwiZmlyZUJ1bGxldCIsImR4IiwiTWF0aCIsImNvcyIsImFuZ2xlIiwiZHkiLCJzaW4iLCJ4IiwieSIsInB1c2giLCJpIiwicmFuZG9tIiwicmFkaXVzIiwiaW5kZXgiLCJjaGVja0J1bGxldENvbGxpc2lvbiIsInNwbGljZSIsImNvbnN0cnVjdG9yIiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJzdHJva2VTdHlsZSIsInN0cm9rZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJmaWxsU3R5bGUiLCJmaWxsIiwidiIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJmaWxsUmVjdCIsInJlc3RvcmUiLCJtb3ZlRG93bkxlZnQiLCJtb3ZlVXBMZWZ0IiwibW92ZVJpZ2h0VXAiLCJtb3ZlTGVmdFVwIiwiYXRhbjIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLEtBQUlBLFdBQVcsbUJBQUFDLENBQVEsQ0FBUixDQUFmO0FBQ0EsS0FBSUMsU0FBUyxtQkFBQUQsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFJRSxZQUFZLG1CQUFBRixDQUFRLENBQVIsQ0FBaEI7O0FBRUEsS0FBSUcsU0FBU0MsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsS0FBSUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFWOztBQUVB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LFlBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBNkMsVUFBTzdDLE1BQVAsRUFBZTtBQUNiLFNBQUksS0FBS3NFLENBQUwsR0FBUyxLQUFLSyxNQUFkLEdBQXVCM0UsT0FBTzBDLEtBQWxDLEVBQXlDO0FBQ3ZDLFlBQUs0QixDQUFMLEdBQVMsSUFBSSxLQUFLSyxNQUFsQjtBQUNELE1BRkQsTUFFTyxJQUFJLEtBQUtMLENBQUwsR0FBUyxLQUFLSyxNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQ25DLFlBQUtMLENBQUwsR0FBU3RFLE9BQU8wQyxLQUFQLEdBQWUsS0FBS2lDLE1BQTdCO0FBQ0Q7QUFDRCxTQUFJLEtBQUtKLENBQUwsR0FBUyxLQUFLSSxNQUFkLEdBQXVCM0UsT0FBTzJDLE1BQWxDLEVBQTBDO0FBQ3hDLFlBQUs0QixDQUFMLEdBQVMsSUFBSSxLQUFLSSxNQUFsQjtBQUNELE1BRkQsTUFFTyxJQUFJLEtBQUtKLENBQUwsR0FBUyxLQUFLSSxNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQ25DLFlBQUtKLENBQUwsR0FBU3ZFLE9BQU8yQyxNQUFQLEdBQWdCLEtBQUtnQyxNQUE5QjtBQUNEO0FBQ0QsWUFBTyxJQUFQO0FBQ0Q7QUE5RmE7O0FBa0doQlUsUUFBT0MsT0FBUCxHQUFpQnZGLFNBQWpCLEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTQ0NTkwYTczNzFmZWM3ZDgzMyIsInZhciBBc3Rlcm9pZCA9IHJlcXVpcmUoJy4vQXN0ZXJvaWQuanMnKTtcbnZhciBCdWxsZXQgPSByZXF1aXJlKCcuL0J1bGxldC5qcycpO1xudmFyIFNwYWNlc2hpcCA9IHJlcXVpcmUoJy4vU3BhY2VzaGlwLmpzJyk7XG5cbnZhciBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbnZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxudmFyIHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpO1xudmFyIGdhbWVTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLXN0YXRzJyk7XG52YXIgbGV2ZWxWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXZlbC12YWx1ZScpO1xudmFyIGN1cnJlbnRTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtc2NvcmUtdmFsdWUnKTtcbnZhciBoaWdoU2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdoLXNjb3JlLXZhbHVlJyk7XG52YXIgZW5kU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1zY3JlZW4nKTtcblxudmFyIHNwYWNlc2hpcDEgPSBuZXcgU3BhY2VzaGlwKCk7XG5cbnZhciBhc3Rlcm9pZHMgPSBbXTtcbnZhciBidWxsZXRzID0gW107XG52YXIgbGV2ZWwgPSAxO1xudmFyIGN1cnJlbnRTY29yZSA9IDA7XG52YXIgaGlnaFNjb3JlID0gMDtcblxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duKTtcbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleVVwKVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGlucHV0KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZpcmVCdWxsZXRLZXkpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5zdGFydFNjcmVlbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXRDYW52YXMpO1xuZW5kU2NyZWVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzdGFydEdhbWUpO1xuXG5oaWdoU2NvcmVWYWx1ZS5pbm5lclRleHQgPSBoaWdoU2NvcmU7XG5cbmZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG4gIHN0YXJ0U2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIGdhbWVTdGF0cy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGxldmVsT25lQ3JlYXRlQXN0ZXJvaWRzKClcbiAgZ2FtZWxvb3AoKVxuICBsZXZlbFZhbHVlLmlubmVyVGV4dCA9IGxldmVsO1xuICBjdXJyZW50U2NvcmVWYWx1ZS5pbm5lclRleHQgPSBjdXJyZW50U2NvcmU7XG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICBlbmRTY3JlZW4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgLy8gdXBkYXRlIHNjb3Jlc1xufVxuXG5mdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCh0cnVlKVxufVxuXG5mdW5jdGlvbiBsZXZlbFVwKCkge1xuICBpZiAobGV2ZWwgPT09IDEgJiYgc3BhY2VzaGlwMS5hbGl2ZSAmJiBhc3Rlcm9pZHMubGVuZ3RoID09PSAwICkge1xuICAgIGxldmVsICsrO1xuICAgIGxldmVsVmFsdWUuaW5uZXJUZXh0ID0gbGV2ZWw7XG4gICAgbGV2ZWxUd29DcmVhdGVBc3Rlcm9pZHMoKTtcbiAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMiAmJiBzcGFjZXNoaXAxLmFsaXZlICYmIGFzdGVyb2lkcy5sZW5ndGggPT09IDApIHtcbiAgICBsZXZlbCArKztcbiAgICBsZXZlbFZhbHVlLmlubmVyVGV4dCA9IGxldmVsO1xuICAgIGxldmVsVGhyZWVDcmVhdGVBc3Rlcm9pZHMoKVxuICB9IGVsc2UgaWYgKGxldmVsID09PSAzICYmIHNwYWNlc2hpcDEuYWxpdmUgJiYgYXN0ZXJvaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGxldmVsICsrO1xuICAgIGxldmVsVmFsdWUuaW5uZXJUZXh0ID0gbGV2ZWw7XG4gICAgbGV2ZWxGb3VyQ3JlYXRlQXN0ZXJvaWRzKCk7XG4gIH0gZWxzZSBpZiAobGV2ZWwgPT09IDQgJiYgc3BhY2VzaGlwMS5hbGl2ZSAmJiBhc3Rlcm9pZHMubGVuZ3RoID09PSAwKSB7XG4gICAgbGV2ZWwgKys7XG4gICAgbGV2ZWxWYWx1ZS5pbm5lclRleHQgPSBsZXZlbDtcbiAgICBsZXZlbEZpdmVDcmVhdGVBc3Rlcm9pZHMoKTsgXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2FtZWxvb3AoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lbG9vcCk7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuXG4gIGlmIChzcGFjZXNoaXAxLmFsaXZlID09PSB0cnVlKSB7XG4gICAgc3BhY2VzaGlwMS5kcmF3KGN0eCkudXBkYXRlKGNhbnZhcylcblxuICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgYnVsbGV0LmRyYXcoY3R4KS51cGRhdGUoY2FudmFzKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZ2FtZU92ZXIoKTtcbiAgfVxuXG4gIGFzdGVyb2lkcy5mb3JFYWNoKGFzdGVyb2lkID0+IHtcbiAgICBhc3Rlcm9pZC5kcmF3KGN0eCkudXBkYXRlKGNhbnZhcyk7XG4gIH0pXG5cbiAgbGV2ZWxVcCgpXG4gIGFzdGVyb2lkU3BhY2VTaGlwQ29sbGlzaW9uKClcbiAgLy8gcmVtb3ZlT2Zmc2NyZWVuQnVsbGV0KClcbiAgbG9vcEJ1bGxldHMoKVxufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmUoZSkge1xuICB2YXIgbW91c2VYID0gZS5jbGllbnRYXG4gIHZhciBtb3VzZVkgPSBlLmNsaWVudFlcblxuICBzcGFjZXNoaXAxLnVwZGF0ZUNhbm9uKG1vdXNlWCwgbW91c2VZLCBjYW52YXMpXG59XG5cbmZ1bmN0aW9uIGlucHV0KGUpIHtcbiAgdmFyIGlucHV0ID0gZS5rZXlDb2RlO1xuICBcbiAgc3dpdGNoIChpbnB1dCkge1xuICBjYXNlIDg3OiBzcGFjZXNoaXAxLm1vdmVVcCgpO1xuICAgIGJyZWFrO1xuICBjYXNlIDY1OiBzcGFjZXNoaXAxLm1vdmVMZWZ0KCk7XG4gICAgYnJlYWs7XG4gIGNhc2UgNjg6IHNwYWNlc2hpcDEubW92ZVJpZ2h0KCk7XG4gICAgYnJlYWs7XG4gIGNhc2UgODM6IHNwYWNlc2hpcDEubW92ZURvd24oKTtcbiAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBmaXJlQnVsbGV0S2V5KGUpIHtcbiAgaWYgKHNwYWNlc2hpcDEuYWxpdmUgPT09IHRydWUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBmaXJlQnVsbGV0KHNwYWNlc2hpcDEpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaXJlQnVsbGV0KHNwYWNlc2hpcDEpIHtcbiAgLy8gdmFyIGFuZ2xlID0gc3BhY2VzaGlwLnVwZGF0ZUNhbm9uKCk7XG4gIC8vIGNvbnNvbGUubG9nKCdzcGFjZXNoaXAgYW5nbGU6Jywgc3BhY2VzaGlwMS5hbmdsZSlcbiAgbGV0IGR4ID0gTWF0aC5jb3Moc3BhY2VzaGlwMS5hbmdsZSlcbiAgbGV0IGR5ID0gTWF0aC5zaW4oc3BhY2VzaGlwMS5hbmdsZSlcbiAgbGV0IGJ1bGxldCA9IG5ldyBCdWxsZXQoc3BhY2VzaGlwMS54LCBzcGFjZXNoaXAxLnksIGR4LCBkeSlcbiAgXG4gIGJ1bGxldHMucHVzaChidWxsZXQpXG59XG5cbmZ1bmN0aW9uIGxldmVsT25lQ3JlYXRlQXN0ZXJvaWRzKCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBhc3Rlcm9pZHMucHVzaChuZXcgQXN0ZXJvaWQoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGV2ZWxUd29DcmVhdGVBc3Rlcm9pZHMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgIGFzdGVyb2lkcy5wdXNoKG5ldyBBc3Rlcm9pZCgpKTtcbiAgICBhc3Rlcm9pZHMuZm9yRWFjaChmdW5jdGlvbihhc3Rlcm9pZCkge1xuICAgICAgYXN0ZXJvaWQuZHggPSAoTWF0aC5yYW5kb20oKSAtIC41KSAqIDc7XG4gICAgICBhc3Rlcm9pZC5keSA9IChNYXRoLnJhbmRvbSgpIC0gLjUpICogNztcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGxldmVsVGhyZWVDcmVhdGVBc3Rlcm9pZHMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgIGFzdGVyb2lkcy5wdXNoKG5ldyBBc3Rlcm9pZCgpKTtcbiAgICBhc3Rlcm9pZHMuZm9yRWFjaChmdW5jdGlvbihhc3Rlcm9pZCkge1xuICAgICAgYXN0ZXJvaWQuZHggPSAoTWF0aC5yYW5kb20oKSAtIC41KSAqIDEwO1xuICAgICAgYXN0ZXJvaWQuZHkgPSAoTWF0aC5yYW5kb20oKSAtIC41KSAqIDEwO1xuICAgIH0pXG4gIH1cbn1cbmZ1bmN0aW9uIGxldmVsRm91ckNyZWF0ZUFzdGVyb2lkcygpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTsgaSsrKSB7XG4gICAgYXN0ZXJvaWRzLnB1c2gobmV3IEFzdGVyb2lkKCkpO1xuICAgIGFzdGVyb2lkcy5mb3JFYWNoKGZ1bmN0aW9uKGFzdGVyb2lkKSB7XG4gICAgICBhc3Rlcm9pZC5keCA9IChNYXRoLnJhbmRvbSgpIC0gLjUpICogMTI7XG4gICAgICBhc3Rlcm9pZC5keSA9IChNYXRoLnJhbmRvbSgpIC0gLjUpICogMTI7XG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBsZXZlbEZpdmVDcmVhdGVBc3Rlcm9pZHMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgIGFzdGVyb2lkcy5wdXNoKG5ldyBBc3Rlcm9pZCgpKTtcbiAgICBhc3Rlcm9pZHMuZm9yRWFjaChmdW5jdGlvbihhc3Rlcm9pZCkge1xuICAgICAgYXN0ZXJvaWQuZHggPSAoTWF0aC5yYW5kb20oKSAtIC41KSAqIDE1O1xuICAgICAgYXN0ZXJvaWQuZHkgPSAoTWF0aC5yYW5kb20oKSAtIC41KSAqIDE1O1xuICAgIH0pXG4gIH1cbn1cblxuLy8gZnVuY3Rpb24gcmVtb3ZlT2Zmc2NyZWVuQnVsbGV0KCkge1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1bGxldHMubGVuZ3RoOyBpKyspIHtcbi8vICAgICBpZiAoXG4vLyAgICAgICAvLyBpZiBidWxsZXQgZXhpdHMgdG9wIG9yIGJvdHRvbVxuLy8gICAgICAgKGJ1bGxldHNbaV0ueSA8PSAwIHx8IGJ1bGxldHNbaV0ueSA+PSBjYW52YXMud2lkdGgpIHx8XG4vLyAgICAgICAvLyBpZiBidWxsZXQgZXhpdHMgbGVmdCBvciByaWdodFxuLy8gICAgICAgKGJ1bGxldHNbaV0ueCA8PSAwIHx8IGJ1bGxldHNbaV0ueCA+PSBjYW52YXMud2lkdGgpXG4vLyAgICAgKSB7XG4vLyAgICAgICAvLyByZW1vdmUgYnVsbGV0XG4vLyAgICAgICBidWxsZXRzLnNwbGljZShpLCAxKVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG5mdW5jdGlvbiBhc3Rlcm9pZFNwYWNlU2hpcENvbGxpc2lvbigpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc3Rlcm9pZHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBpZiBhc3Rlcm9pZCBpcyBpbiB0aGUgc2FtZSBzcGFjZSBhcyBzcGFjZXNoaXBcbiAgICBpZiAoXG4gICAgICAvLyBIb3Jpem9udGFsIGRldGVjdGlvblxuICAgICAgLy8gbGVmdHNpZGUgb2Ygc3BhY2VzaGlwIDw9IHJpZ2h0c2lkZSBvZiBhc3Rlcm9pZFxuICAgICAgKHNwYWNlc2hpcDEueCAtIChzcGFjZXNoaXAxLnJhZGl1cykgPD0gYXN0ZXJvaWRzW2ldLnggKyBhc3Rlcm9pZHNbaV0ucmFkaXVzICYmXG4gICAgICAgIC8vIHJpZ2h0c2lkZSBvZiBzcGFjZXNoaXAgPj0gbGVmdHNpZGUgb2YgYXN0ZXJvaWRcbiAgICAgICAgc3BhY2VzaGlwMS54ICsgKHNwYWNlc2hpcDEucmFkaXVzKSA+PSBhc3Rlcm9pZHNbaV0ueCAtIGFzdGVyb2lkc1tpXS5yYWRpdXMpICYmXG4gICAgICAvLyBhbmRcbiAgICAgIC8vIFZlcnRpY2FsIGRldGVjdGlvbiAgXG4gICAgICAvLyBib3R0b20gb2YgYXN0ZXJvaWQgPD0gdG9wIG9mIGFzdGVyb2lkXG4gICAgICAoYXN0ZXJvaWRzW2ldLnkgKyBhc3Rlcm9pZHNbaV0ucmFkaXVzID49IHNwYWNlc2hpcDEueSAtIChzcGFjZXNoaXAxLnJhZGl1cykgJiZcbiAgICAgICAgLy8gdG9wIG9mIGFzdGVyb2lkIDw9IGJvdHRvbSBvZiBhc3Rlcm9pZFxuICAgICAgICBhc3Rlcm9pZHNbaV0ueSAtIGFzdGVyb2lkc1tpXS5yYWRpdXMgPD0gc3BhY2VzaGlwMS55ICsgKHNwYWNlc2hpcDEucmFkaXVzKSlcbiAgICApIHtcbiAgICAgIC8vIGRvIHRoaXNcbiAgICAgIHNwYWNlc2hpcDEuYWxpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbG9vcEJ1bGxldHMoKSB7XG4gIGlmIChidWxsZXRzLmxlbmd0aCA+IDApIHtcbiAgICBidWxsZXRzLmZvckVhY2goZnVuY3Rpb24gKGJ1bGxldCwgaW5kZXgpIHtcbiAgICAgIGNoZWNrQnVsbGV0Q29sbGlzaW9uKGJ1bGxldCwgaW5kZXgpO1xuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tCdWxsZXRDb2xsaXNpb24oYnVsbGV0LCBpbmRleCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdGVyb2lkcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChcbiAgICAgIChidWxsZXQueCAtIChidWxsZXQucmFkaXVzKSA8PSBhc3Rlcm9pZHNbaV0ueCArIGFzdGVyb2lkc1tpXS5yYWRpdXMgJiZcbiAgICAgICAgYnVsbGV0LnggKyAoYnVsbGV0LnJhZGl1cykgPj0gYXN0ZXJvaWRzW2ldLnggLSBhc3Rlcm9pZHNbaV0ucmFkaXVzKSAmJlxuICAgICAgKGFzdGVyb2lkc1tpXS55ICsgYXN0ZXJvaWRzW2ldLnJhZGl1cyA+PSBidWxsZXQueSAtIChidWxsZXQucmFkaXVzKSAmJlxuICAgICAgICBhc3Rlcm9pZHNbaV0ueSAtIGFzdGVyb2lkc1tpXS5yYWRpdXMgPD0gYnVsbGV0LnkgKyAoYnVsbGV0LnJhZGl1cykpXG4gICAgKSB7XG4gICAgICBhc3Rlcm9pZHMuc3BsaWNlKGksIDEpXG4gICAgICBidWxsZXRzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGN1cnJlbnRTY29yZSArKztcbiAgICAgIGN1cnJlbnRTY29yZVZhbHVlLmlubmVyVGV4dCA9IGN1cnJlbnRTY29yZTtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBmdW5jdGlvbiBrZXlVcChlKSB7XG4vLyAgIGlmIChlLmtleUNvZSBpbiBtYXApIHtcbi8vICAgICBtYXBbZS5rZXlDb2RlXSA9IGZhbHNlO1xuLy8gICB9XG4vLyB9XG5cbi8vIGNvbnN0IG1hcCA9IHtcbi8vICAgODc6IGZhbHNlLCAvLyB1cFxuLy8gICA2NTogZmFsc2UsIC8vIGxlZnRcbi8vICAgNjg6IGZhbHNlLCAvLyBkb3duXG4vLyAgIDgzOiBmYWxzZSwgLy8gcmlnaHRcbi8vIH1cblxuLy8gZnVuY3Rpb24ga2V5RG93bihlKSB7XG4vLyAgIGlmIChlLmtleUNvZGUgaW4gbWFwKSB7XG4vLyAgICAgbWFwW2Uua2V5Q29kZV0gPSB0cnVlO1xuLy8gICAgIGlmIChtYXBbODddKSB7XG4vLyAgICAgICBzcGFjZXNoaXAxLm1vdmVVcCgpXG4vLyAgICAgfSBlbHNlIGlmIChtYXBbNjVdKSB7XG4vLyAgICAgICBzcGFjZXNoaXAxLm1vdmVMZWZ0KClcbi8vICAgICB9IGVsc2UgaWYgKG1hcFs2OF0pIHtcbi8vICAgICAgIHNwYWNlc2hpcDEubW92ZURvd24oKVxuLy8gICAgIH0gZWxzZSBpZiAobWFwWzgzXSkge1xuLy8gICAgICAgc3BhY2VzaGlwMS5tb3ZlUmlnaHQoKSBcbi8vICAgICB9IGVsc2UgaWYgKG1hcFs4N10gJiYgbWFwWzY1XSkge1xuLy8gICAgICAgc3BhY2VzaGlwMS5tb3ZlVXBMZWZ0KClcbi8vICAgICB9IGVsc2UgaWYgKG1hcFs4N10gJiYgbWFwWzgzXSkge1xuLy8gICAgICAgc3BhY2VzaGlwMS5tb3ZlVXBSaWdodCgpXG4vLyAgICAgfSBlbHNlIGlmIChtYXBbNjhdICYmIG1hcFs2NV0pIHtcbi8vICAgICAgIHNwYWNlc2hpcDEubW92ZURvd25MZWZ0KClcbi8vICAgICB9IGVsc2UgaWYgKG1hcFs2OF0gJiYgbWFwWzgzXSkge1xuLy8gICAgICAgc3BhY2VzaGlwMS5tb3ZlRG93blJpZ2h0KClcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjbGFzcyBBc3Rlcm9pZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMueCA9IC02MDtcbiAgICB0aGlzLnkgPSAtNjA7XG4gICAgdGhpcy5keCA9IChNYXRoLnJhbmRvbSgpIC0gLjUpICogNTtcbiAgICB0aGlzLmR5ID0gKE1hdGgucmFuZG9tKCkgLSAuNSkgKiA1O1xuICAgIHRoaXMucmFkaXVzID0gMzA7XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKVxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdvcmFuZ2UnO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVwZGF0ZShjYW52YXMpIHtcbiAgICBpZiAodGhpcy54IC0gdGhpcy5yYWRpdXMgPiBjYW52YXMud2lkdGgpIHtcbiAgICAgIHRoaXMueCA9IDAgLSB0aGlzLnJhZGl1cztcbiAgICB9IGVsc2UgaWYgKHRoaXMueCArIHRoaXMucmFkaXVzIDwgMCkge1xuICAgICAgdGhpcy54ID0gY2FudmFzLndpZHRoICsgdGhpcy5yYWRpdXM7XG4gICAgfVxuICAgIGlmICh0aGlzLnkgLSB0aGlzLnJhZGl1cyA+IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMueSA9IDAgLSB0aGlzLnJhZGl1cztcbiAgICB9IGVsc2UgaWYgKHRoaXMueSArIHRoaXMucmFkaXVzIDwgMCkge1xuICAgICAgdGhpcy55ID0gY2FudmFzLmhlaWdodCArIHRoaXMucmFkaXVzO1xuICAgIH1cbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBc3Rlcm9pZDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQXN0ZXJvaWQuanMiLCJjbGFzcyBCdWxsZXQge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBkeCwgZHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSAzO1xuICAgIHRoaXMuZHggPSBkeDtcbiAgICB0aGlzLmR5ID0gZHk7XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKVxuICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZWQnXG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlKGNhbnZhcykge1xuICAgIGlmICh0aGlzLnggLSB0aGlzLnJhZGl1cyA+IGNhbnZhcy53aWR0aCkge1xuICAgICAgdGhpcy54ID0gMCAtIHRoaXMucmFkaXVzO1xuICAgIH0gZWxzZSBpZiAodGhpcy54ICsgdGhpcy5yYWRpdXMgPCAwKSB7XG4gICAgICB0aGlzLnggPSBjYW52YXMud2lkdGggKyB0aGlzLnJhZGl1cztcbiAgICB9XG4gICAgaWYgKHRoaXMueSAtIHRoaXMucmFkaXVzID4gY2FudmFzLmhlaWdodCkge1xuICAgICAgdGhpcy55ID0gMCAtIHRoaXMucmFkaXVzO1xuICAgIH0gZWxzZSBpZiAodGhpcy55ICsgdGhpcy5yYWRpdXMgPCAwKSB7XG4gICAgICB0aGlzLnkgPSBjYW52YXMuaGVpZ2h0ICsgdGhpcy5yYWRpdXM7XG4gICAgfVxuICAgIHRoaXMueCArPSB0aGlzLmR4ICogNTtcbiAgICB0aGlzLnkgKz0gdGhpcy5keSAqIDU7XG4gICAgLy8gdGhpcy5kcmF3KClcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1bGxldDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQnVsbGV0LmpzIiwiY2xhc3MgU3BhY2VzaGlwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy54ID0gNTAwO1xuICAgIHRoaXMueSA9IDMwMDtcbiAgICB0aGlzLnJhZGl1cyA9IDMwO1xuICAgIHRoaXMudiA9IDU7XG4gICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgdGhpcy5keCA9IDIwO1xuICAgIHRoaXMuZHkgPSAyMDsgICBcbiAgICB0aGlzLmFsaXZlID0gdHJ1ZTsgICAgXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGN0eC5zYXZlKClcbiAgICBjdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KVxuICAgIGN0eC5yb3RhdGUodGhpcy5hbmdsZSlcbiAgICBjdHguZmlsbFN0eWxlID0gJyNjY2MnXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoMCwgMCwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKVxuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnXG4gICAgY3R4LmZpbGxSZWN0KDAsIC01LCA0NSwgMTApXG4gICAgY3R4LnJlc3RvcmUoKVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLnggLT0gdGhpcy5keDtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgfVxuXG4gIG1vdmVVcCgpIHtcbiAgICB0aGlzLnkgLT0gdGhpcy5keTtcbiAgfVxuXG4gIG1vdmVEb3duKCkge1xuICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICB9XG5cbiAgbW92ZURvd25MZWZ0KCkge1xuICAgIHRoaXMueCAtPSB0aGlzLmR4O1xuICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICB9XG5cbiAgbW92ZVVwTGVmdCgpIHtcbiAgICB0aGlzLnggLT0gdGhpcy5keDtcbiAgICB0aGlzLnkgLT0gdGhpcy5keTtcbiAgfVxuXG4gIG1vdmVSaWdodFVwKCkge1xuICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgIHRoaXMueSAtPSB0aGlzLmR5O1xuICB9XG5cbiAgbW92ZUxlZnRVcCgpIHtcbiAgICB0aGlzLnggLT0gdGhpcy5keDtcbiAgICB0aGlzLnkgLT0gdGhpcy5keTtcbiAgfVxuXG4gIHVwZGF0ZUNhbm9uKG1vdXNlWCwgbW91c2VZLCBjYW52YXMpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnbW91c2UgWDonLCBtb3VzZVgpXG4gICAgLy8gY29uc29sZS5sb2coJ21vdXNlIFk6JywgbW91c2VZKVxuICAgIHZhciBkeCA9IG1vdXNlWCAtIHRoaXMueDtcbiAgICB2YXIgZHkgPSBtb3VzZVkgLSB0aGlzLnk7XG5cbiAgICB0aGlzLmFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpXG4gICAgdGhpcy51cGRhdGUoY2FudmFzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBmaXJlQnVsbGV0KCkge1xuICAvLyAgIGxldCBkeCA9IE1hdGguY29zKHRoaXMuYW5nbGUpIFxuICAvLyAgIGxldCBkeSA9IE1hdGguc2luKHRoaXMuYW5nbGUpXG5cbiAgLy8gICBmaXJlQnVsbGV0KHRoaXMueCwgdGhpcy55LCBkeCwgZHkpXG4gIC8vIH1cblxuICB1cGRhdGUoY2FudmFzKSB7XG4gICAgaWYgKHRoaXMueCAtIHRoaXMucmFkaXVzID4gY2FudmFzLndpZHRoKSB7XG4gICAgICB0aGlzLnggPSAwIC0gdGhpcy5yYWRpdXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLnggKyB0aGlzLnJhZGl1cyA8IDApIHtcbiAgICAgIHRoaXMueCA9IGNhbnZhcy53aWR0aCArIHRoaXMucmFkaXVzO1xuICAgIH1cbiAgICBpZiAodGhpcy55IC0gdGhpcy5yYWRpdXMgPiBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLnkgPSAwIC0gdGhpcy5yYWRpdXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLnkgKyB0aGlzLnJhZGl1cyA8IDApIHtcbiAgICAgIHRoaXMueSA9IGNhbnZhcy5oZWlnaHQgKyB0aGlzLnJhZGl1cztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwYWNlc2hpcDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvU3BhY2VzaGlwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==