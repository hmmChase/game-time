/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var Spaceship = __webpack_require__(1);

	var canvas = document.querySelector('canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ctx = canvas.getContext('2d');

	var spaceship1 = new Spaceship(10, 10, 100, 100);

	// ctx.fillStyle = "rgba(0, 255, 0, 1)";
	// ctx.fillRect(100, 100, 100, 100)

	spaceship1.draw(ctx);

	function gameloop() {
	  spaceship1.draw(ctx);

	  requestAnimationFrame(gameloop);
	}

	requestAnimationFrame(gameloop);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	class Spaceship {
	  constructor(x, y, width, height) {
	    this.x = x;
	    this.y = y;
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

/***/ })
/******/ ]);