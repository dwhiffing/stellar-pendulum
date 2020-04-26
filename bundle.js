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

	'use strict';

	var _boot = __webpack_require__(1);

	var _boot2 = _interopRequireDefault(_boot);

	var _load = __webpack_require__(2);

	var _load2 = _interopRequireDefault(_load);

	var _gameover = __webpack_require__(3);

	var _gameover2 = _interopRequireDefault(_gameover);

	var _menu = __webpack_require__(4);

	var _menu2 = _interopRequireDefault(_menu);

	var _play = __webpack_require__(5);

	var _play2 = _interopRequireDefault(_play);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  var game = new Phaser.Game(800, 500, Phaser.CANVAS, 'app');

	  game.state.add('boot', _boot2.default);
	  game.state.add('load', _load2.default);
	  game.state.add('menu', _menu2.default);
	  game.state.add('gameover', _gameover2.default);
	  game.state.add('play', _play2.default);
	  game.state.start('boot');
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: function create(game) {
	    this.game.state.start('load', true, false);
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  preload: function preload() {
	    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

	    this.load.audio('hit1', 'audio/hit.mp3');
	    this.load.audio('hit2', 'audio/hit2.mp3');
	    this.load.audio('hit3', 'audio/hit3.mp3');
	    this.load.audio('comboend', 'audio/comboend.mp3');
	    this.load.audio('hitball', 'audio/hitball.mp3');
	    this.load.audio('neardead', 'audio/neardead2.mp3');
	    this.load.audio('dead', 'audio/dead.mp3');

	    this.load.image('ball', 'images/ball.png');
	    this.load.image('marker', 'images/marker.png');
	    this.load.image('bit', 'images/bit.png');
	    this.load.spritesheet('bar', 'images/bar.png', 150, 20);
	    this.load.image('ring', 'images/ring.png');
	    this.load.image('text', 'images/font.png');
	  },
	  onLoadComplete: function onLoadComplete() {
	    this.game.state.start('menu');
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var score = 0;
	exports.default = {
	  init: function init() {
	    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    score = args.score || 0;
	  },
	  create: function create(game) {
	    this.game = game;
	    game.stage.backgroundColor = '#000000';

	    this.startText = game.add.text(this.game.world.centerX, this.game.world.centerY - 50, "Final Score: ", { font: "bold 28px Arial", fill: "#fff" });
	    this.startText.anchor.setTo(0.5);

	    this.font = game.add.retroFont('text', 62, 50, Phaser.RetroFont.TEXT_SET6, 10, 2, 2);
	    this.font.text = score.toString();
	    this.comboImage = game.add.image(game.world.centerX, game.world.centerY + 50, this.font);
	    this.comboImage.anchor.set(0.5, 1);

	    game.input.onDown.add(function () {
	      game.state.start('play', true, false);
	    });
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: function create(game) {
	    this.game = game;
	    game.stage.backgroundColor = '#000000';
	    this.titleText = game.add.text(this.game.world.centerX, this.game.world.centerY - 50, "Stellar Pendulum", { font: "bold 42px Arial", fill: "#fff" });
	    this.titleText.anchor.setTo(0.5);
	    this.startText = game.add.text(this.game.world.centerX, this.game.world.centerY + 50, "Start", { font: "bold 28px Arial", fill: "#fff" });
	    this.startText.anchor.setTo(0.5);

	    game.input.onDown.add(function () {
	      game.state.start('play', true, false);
	    });
	  }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spawner = __webpack_require__(6);

	var _spawner2 = _interopRequireDefault(_spawner);

	var _player = __webpack_require__(7);

	var _player2 = _interopRequireDefault(_player);

	var _timerBar = __webpack_require__(9);

	var _timerBar2 = _interopRequireDefault(_timerBar);

	var _ui = __webpack_require__(10);

	var _ui2 = _interopRequireDefault(_ui);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  create: function create(game) {
	    var _this = this;

	    this.game = game;
	    game.stage.backgroundColor = '#000000';
	    this.game.camera.bounds = null;
	    this._shakeWorldTime = 0;
	    this._shakeWorldMax = 20;
	    this.game.shake = function (duration, strength) {
	      _this._shakeWorldTime = duration || 20;
	      _this._shakeWorldMax = strength || 20;
	    };

	    this.sndBallHit = game.add.audio('hit1');
	    this.sndBallHit2 = game.add.audio('hit2');
	    this.sndBallHit3 = game.add.audio('hit3');
	    this.sndBallHitBall = game.add.audio('hitball');

	    game.physics.startSystem(Phaser.Physics.P2JS);
	    game.physics.p2.gravity.y = 1100;
	    game.physics.p2.restitution = 0.6;
	    game.physics.p2.setImpactEvents(true);
	    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
	    var ballCollisionGroup = game.physics.p2.createCollisionGroup();
	    game.physics.p2.updateBoundsCollisionGroup();

	    this.player = new _player2.default(game, ballCollisionGroup, playerCollisionGroup, function () {
	      return _this.collide.apply(_this, arguments);
	    });
	    this.game.ui = new _ui2.default(game, 3000, this.onTimeUp.bind(this));
	    this.spawner = new _spawner2.default(game, ballCollisionGroup, playerCollisionGroup);

	    game.input.addMoveCallback(this.move, this);
	  },
	  move: function move(pointer, x, y) {
	    this.player.move(x, y);
	  },
	  update: function update(game) {
	    this.player.update();
	    this.game.ui.update();

	    if (this._shakeWorldTime > 0) {
	      var magnitude = this._shakeWorldTime / this._shakeWorldMax * this._shakeWorldMax;
	      var x = this.game.rnd.integerInRange(-magnitude, magnitude);
	      var y = this.game.rnd.integerInRange(-magnitude, magnitude);

	      this.game.camera.x = x;
	      this.game.camera.y = y;
	      this._shakeWorldTime--;
	    }
	  },
	  onTimeUp: function onTimeUp() {
	    this.player.release();
	  },
	  collide: function collide(player, ball) {
	    if (!ball.parent) {
	      if (!this.sndBallHitBall.isPlaying) {
	        this.sndBallHitBall.play();
	      }
	      return;
	    }

	    if (!this.player.alive) return;

	    var sprite = ball.parent.sprite;

	    if (sprite.tint === 0xff0000) {
	      this.player.hitRed();
	    } else if (sprite.tint === 0x0000ff) {
	      this.player.hitBlue();
	    } else {
	      this.player.hitYellow();
	    }

	    var velocity = this.player.ball.body.velocity;
	    var speed = Math.abs(velocity.x) + Math.abs(velocity.y) * this.player.ball.body.mass;
	    var finalSpeed = Math.max(3, Math.floor(speed / 50));

	    if (finalSpeed > 40) {
	      this.sndBallHit3.play();
	    } else if (finalSpeed > 20) {
	      this.sndBallHit2.play();
	    } else {
	      this.sndBallHit.play();
	    }

	    this.game.ui.hitTarget(sprite, finalSpeed, velocity, this.player.ball.body.mass);
	    sprite.kill();
	    this.spawner.spawn();
	  },
	  preRender: function preRender(game) {
	    this.player.preRender();
	  },
	  render: function render(game) {
	    this.player.render();
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var marker, marker2;
	var lastX, lastY;
	var balls;
	var spawnNum;
	var nextPos, nextPos2;

	var Spawner = function () {
	  function Spawner(game, ballCollisionGroup, playerCollisionGroup) {
	    var _this = this;

	    _classCallCheck(this, Spawner);

	    this.game = game;
	    balls = game.add.group();
	    spawnNum = 0;
	    balls.enableBody = true;
	    balls.physicsBodyType = Phaser.Physics.P2JS;
	    for (var i = 0; i < 6; i++) {
	      var ball;
	      ball = balls.create(game.world.randomX, game.world.randomY, 'ball');

	      ball.body.setCircle(10);
	      ball.body.static = true;
	      ball.kill();

	      ball.body.setCollisionGroup(ballCollisionGroup);
	      ball.body.data.shapes[0].sensor = true;
	      ball.body.collides(playerCollisionGroup);
	    }

	    nextPos = { x: this.game.rnd.integerInRange(100, this.game.world.width - 100), y: this.game.rnd.integerInRange(100, this.game.world.height - 100) };
	    nextPos2 = { x: this.game.rnd.integerInRange(100, this.game.world.width - 100), y: this.game.rnd.integerInRange(100, this.game.world.height - 100) };

	    marker = game.add.sprite(200, 200, 'marker');
	    marker2 = game.add.sprite(200, 200, 'marker');
	    marker.anchor.setTo(0.5, 0.5);
	    marker2.anchor.setTo(0.5, 0.5);
	    marker2.alpha = 0.2;

	    this.markerTween = game.add.tween(marker);
	    this.markerTween.to({ angle: 360 }, 1500, Phaser.Easing.Linear.None, true, 0, -1);
	    this.markerTween.onStart.add(function () {
	      return _this.markerTween.delay(0);
	    });

	    this.markerTween2 = game.add.tween(marker2);
	    this.markerTween2.to({ angle: 360 }, 1500, Phaser.Easing.Linear.None, true, 0, -1);
	    this.markerTween2.onStart.add(function () {
	      return _this.markerTween.delay(0);
	    });

	    this.spawn();
	  }

	  _createClass(Spawner, [{
	    key: 'getTint',
	    value: function getTint(i) {
	      if (i < 0) {
	        i = 0;
	      }
	      if (i >= 15 && i % 15 === 0) {
	        return 0x0000ff;
	      } else if (i >= 5 && i % 5 === 0) {
	        return 0xff0000;
	      } else {
	        return 0xffff00;
	      }
	    }
	  }, {
	    key: 'spawn',
	    value: function spawn() {
	      if (balls.countLiving() > 0) {
	        return;
	      }

	      var ball;
	      ball = balls.getFirstDead();

	      ball.reset(nextPos.x, nextPos.y);
	      ball.tint = nextPos.tint || 0xffff00;

	      nextPos = { x: nextPos2.x, y: nextPos2.y, tint: nextPos2.tint || 0xffff00 };
	      marker.reset(nextPos.x, nextPos.y);
	      marker.tint = nextPos.tint;

	      var tint = this.getTint(this.game.ui.combo + 3);
	      nextPos2 = { x: this.game.rnd.integerInRange(100, this.game.world.width - 100), y: this.game.rnd.integerInRange(100, this.game.world.height - 100), tint: tint };
	      marker2.reset(nextPos2.x, nextPos2.y);
	      marker2.tint = nextPos2.tint;
	      spawnNum++;
	    }
	  }]);

	  return Spawner;
	}();

	exports.default = Spawner;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _amountBar = __webpack_require__(8);

	var _amountBar2 = _interopRequireDefault(_amountBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var spawning;
	var line;
	var lastX, lastY;
	var mouseSpring;
	var lineSize;
	var drawLine = false;

	var Player = function () {
	  function Player(game, ballCollisionGroup, playerCollisionGroup, onCollide) {
	    _classCallCheck(this, Player);

	    this.game = game;
	    spawning = true;
	    drawLine = true;
	    this.alive = true;
	    lineSize = 220;

	    this.graphics = this.game.add.graphics(0, 0);

	    this.sndNearDead = game.add.audio('neardead');
	    this.sndDead = game.add.audio('dead');

	    this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
	    this.mouse = game.add.sprite(game.world.centerX, game.world.centerY, 'ring');

	    game.physics.p2.enable(this.ball);
	    this.ball.body.setCircle(20);
	    this.ball.body.collides(ballCollisionGroup);
	    this.ball.body.setCollisionGroup(playerCollisionGroup);
	    this.ball.body.onBeginContact.add(onCollide);
	    this.ball.body.mass = 1;

	    game.physics.p2.enable(this.mouse);
	    this.mouse.body.static = true;

	    this.trailEmitter = game.add.emitter(game.world.centerX, 500, 400);
	    this.trailEmitter.makeParticles('ball');
	    this.trailEmitter.setXSpeed(0, 0);
	    this.trailEmitter.setYSpeed(0, 0);
	    this.trailEmitter.setAlpha(0.15, 0, 1500);
	    this.trailEmitter.start(false, 1500, 5);
	    this.trailEmitter.gravity = 0;

	    this.distBar = new _amountBar2.default(game, game.world.centerX, game.world.height - 30, lineSize);

	    this.adjustSize(0.8, 1);
	    this.adjustLine(0);
	    this.release = this.release.bind(this);
	  }

	  _createClass(Player, [{
	    key: 'move',
	    value: function move(x, y) {
	      this.mouse.body.x = x;
	      this.mouse.body.y = y;
	      if (spawning) {
	        setTimeout(function () {
	          return spawning = false;
	        }, 50);
	        this.ball.body.x = x;
	        this.ball.body.y = y;
	      }
	      lastX = x;
	      lastY = y;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.dist = this.game.physics.arcade.distanceToPointer(this.ball);
	      this.strain = this.dist / 1000;
	      if (spawning) {
	        this.dist = 20;
	        this.strain = 0;
	      }

	      this.trailEmitter.x = this.ball.x;
	      this.trailEmitter.y = this.ball.y;

	      var distance = lineSize - this.dist;
	      var maxWidth = 12;
	      var minWidth = 1;
	      var difference = maxWidth - minWidth;
	      this.width = minWidth + distance / 100 * difference;

	      var max = 220;
	      var min = 0;
	      var difference = max - min;
	      var hue = min + distance / 100 * difference;
	      hue = Phaser.Color.HSLtoRGB(hue / 1000, 1, 0.5);
	      this.hue = Phaser.Color.RGBtoString(hue.r, hue.g, hue.b, 255, '#');
	      this.hueColor = Phaser.Color.getColor(hue.r, hue.g, hue.b);

	      if (drawLine) {
	        // if (this.dist > this.distBar.barDuration*0.92 && !this.sndNearDead.isPlaying) {
	        //   this.sndNearDead.play()
	        // }
	        this.distBar.update(this.dist, this.hueColor);
	      }
	    }
	  }, {
	    key: 'adjustLine',
	    value: function adjustLine(size) {
	      lineSize += size;
	      if (lineSize > 350) {
	        lineSize = 350;
	      }
	      this.distBar.setSize(lineSize);
	      this.game.physics.p2.removeSpring(mouseSpring);
	      mouseSpring = this.game.physics.p2.createSpring(this.mouse, this.ball, lineSize / 10, 60, 25);
	    }
	  }, {
	    key: 'adjustSize',
	    value: function adjustSize(size) {
	      var scale = this.ball.scale.x * size;
	      if (scale < 0.7) {
	        scale = 0.7;
	      }
	      if (scale > 2) {
	        scale = 2;
	      }
	      this.ball.scale.setTo(scale);
	      this.ball.body.mass = this.ball.body.mass * (size * 1.1);
	      this.trailEmitter.setScale(scale, scale * 0.8, scale, scale * 0.8, 1000, Phaser.Easing.Quintic.Out);
	    }
	  }, {
	    key: 'hitYellow',
	    value: function hitYellow() {}
	  }, {
	    key: 'hitRed',
	    value: function hitRed() {
	      this.adjustSize(1.15);
	    }
	  }, {
	    key: 'hitBlue',
	    value: function hitBlue() {
	      this.adjustLine(50);
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      var _this = this;

	      if (this.alive) {
	        this.alive = false;
	        this.sndDead.play();
	        this.game.physics.p2.removeSpring(mouseSpring);
	        drawLine = false;
	        this.game.shake(30, 100);
	        this.game.ui.resetCombo(true);
	        setTimeout(function () {
	          _this.game.state.start('gameover', true, false, { score: _this.game.ui.score });
	        }, 2000);
	      }
	    }
	  }, {
	    key: 'preRender',
	    value: function preRender() {
	      if (drawLine) {
	        this.graphics.lineStyle(this.width, this.hueColor);
	        this.graphics.moveTo(this.ball.x, this.ball.y);
	        this.graphics.lineTo(this.mouse.x, this.mouse.y);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(game) {
	      if (!spawning && this.alive && this.distBar.isFull) {
	        this.release();
	      } else {
	        this.graphics.clear();
	      }
	    }
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AmountBar = function () {
	  function AmountBar(game, x, y) {
	    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

	    _classCallCheck(this, AmountBar);

	    this.x = x;
	    this.y = y;
	    this.game = game;
	    this.bar = this.game.add.sprite(x, y, 'bar', 1);
	    this.sprite = this.game.add.sprite(x, y, 'bar', 0);
	    this.bar.anchor.setTo(0, 0.5);
	    this.sprite.anchor.setTo(0, 0.5);
	    this.setSize(size);
	  }

	  _createClass(AmountBar, [{
	    key: 'setSize',
	    value: function setSize(size) {
	      this.bar.width = size * 0.5;
	      this.barDuration = size;
	      this.bar.x = this.x - this.bar.width / 2;
	      this.sprite.x = this.x - this.bar.width / 2;
	    }
	  }, {
	    key: 'update',
	    value: function update(amount, hue) {
	      this.amount = amount / this.barDuration;
	      this.isFull = false;
	      if (this.amount >= 1) {
	        this.isFull = true;
	        this.amount = 1;
	      }
	      if (hue) {
	        this.sprite.tint = hue;
	      }
	      this.sprite.width = this.amount * this.bar.width;
	    }
	  }]);

	  return AmountBar;
	}();

	exports.default = AmountBar;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TimerBar = function () {
	  function TimerBar(game, x, y, max) {
	    _classCallCheck(this, TimerBar);

	    this.game = game;
	    this.sprite = this.game.add.sprite(x, y, 'bar', 0);
	    this.sprite.anchor.setTo(0.5, 0.5);
	    this.sprite.scale.y = 0.5;
	    this.fullWidth = this.sprite.width;
	    this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height);
	    this.timer = game.time.create(false);
	    this.max = max;
	    this.backwards = false;
	    this.rect.width = 10;
	    this.sprite.crop(this.rect);
	  }

	  _createClass(TimerBar, [{
	    key: 'update',
	    value: function update() {
	      if (this.timer.paused) return;
	      this.rect.width = this.timer.duration / this.max * this.fullWidth;
	      this.sprite.crop(this.rect);
	    }
	  }, {
	    key: 'start',
	    value: function start(dur, cb) {
	      var _this = this;

	      this.timer.add(dur, function () {
	        cb && cb();
	        _this.stop();
	      });
	      this.dur = dur;
	      this.timer.start();
	    }
	  }, {
	    key: 'add',
	    value: function add(amount, cb) {
	      var lastAmount = 0;
	      if (this.timer.running) {
	        lastAmount = this.stop();
	      }
	      amount = lastAmount + amount;
	      if (amount > this.max) {
	        amount = this.max;
	      }
	      this.start(amount, cb);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      var amount = this.timer.duration;
	      this.timer.stop();
	      return amount;
	    }
	  }]);

	  return TimerBar;
	}();

	exports.default = TimerBar;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _timerBar = __webpack_require__(9);

	var _timerBar2 = _interopRequireDefault(_timerBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var INITIAL_COMOBO_TIME = 3000;
	var TIME_PER_HIT = 1000;
	var PARTICLE_LIFETIME = 5000;
	var timer = 5;

	var UserInterface = function () {
	  function UserInterface(game, time, onTimeUp) {
	    _classCallCheck(this, UserInterface);

	    this.game = game;
	    this.time = time;
	    this.onTimeUp = onTimeUp;
	    this.score = this.timer = this.combo = 0;

	    this.sndComboEnd = game.add.audio('comboend');
	    this.scoreText = game.add.text(10, 10, '0', {
	      font: 'bold 32px Arial',
	      fill: '#fff'
	    });
	    this.timeText = game.add.text(game.world.width - 120, 10, 'T: 2000', {
	      font: 'bold 32px Arial',
	      fill: '#fff'
	    });
	    this.font = game.add.retroFont('text', 62, 50, Phaser.RetroFont.TEXT_SET6, 10, 2, 2);
	    this.hitTarget = this.hitTarget.bind(this);

	    this.comboImage = game.add.image(game.world.centerX, game.world.centerY, this.font);
	    this.comboImage.anchor.set(0.5, 1);
	    this.comboImage.alpha = 0;

	    this.comboBar = new _timerBar2.default(game, game.world.centerX, game.world.centerY + 20, 3000);

	    this.redEmitter = this.createEmitter(100, 0xff0000);
	    this.blueEmitter = this.createEmitter(100, 0x0000ff);
	    this.yellowEmitter = this.createEmitter(300, 0xffff00);
	    this.emitter = this.yellowEmitter;
	  }

	  _createClass(UserInterface, [{
	    key: 'createEmitter',
	    value: function createEmitter(amount, tint) {
	      var emitter = this.game.add.emitter(0, 0, 300);
	      emitter.makeParticles('bit');
	      emitter.setAlpha(0.9, 0, 4000);
	      emitter.gravity = 400;
	      emitter.forEach(function (particle) {
	        return particle.tint = tint;
	      });
	      return emitter;
	    }
	  }, {
	    key: 'emit',
	    value: function emit(x, y, tint, speed) {
	      this.emitter.x = x;
	      this.emitter.y = y;
	      this.emitter.forEach(function (particle) {
	        return particle.tint = tint;
	      });
	      this.emitter.start(true, PARTICLE_LIFETIME, null, speed);
	    }
	  }, {
	    key: 'hitTarget',
	    value: function hitTarget(sprite, speed, velocity, mass) {
	      this.combo++;

	      this.comboImage.alpha = 1;
	      var score = Math.ceil(this.combo * speed * mass);
	      this.score = this.score + score;
	      this.scoreText.text = '' + this.score;
	      this.font.text = this.combo.toString();

	      if (sprite.tint === 0xffff00) {
	        this.emitter = this.yellowEmitter;
	      } else if (sprite.tint === 0xff0000) {
	        this.emitter = this.redEmitter;
	      } else {
	        this.emitter = this.blueEmitter;
	      }
	      this.emitter.setScale(sprite.scale.x * 0.8, sprite.scale.x * 0.5, sprite.scale.x * 0.8, sprite.scale.x * 0.5, 3000, Phaser.Easing.Quintic.Out);
	      this.emitter.setXSpeed(-200 + velocity.x * 0.2, 200 + velocity.x * 0.3);
	      this.emitter.setYSpeed(-200 + velocity.y * 0.2, 200 + velocity.y * 0.3);
	      this.emit(sprite.x, sprite.y, sprite.tint, speed);
	      this.reseting = false;

	      this.createScoreText(sprite.x, sprite.y, score);

	      if (this.comboBar.timer.running || this.combo > 1) {
	        if (this.comboBar.timer.running) {
	          this.comboBar.add(2000, this.resetCombo.bind(this));
	        } else {
	          this.comboBar.add(TIME_PER_HIT, this.resetCombo.bind(this));
	        }
	      } else {
	        this.comboBar.start(INITIAL_COMOBO_TIME, this.resetCombo.bind(this));
	      }
	    }
	  }, {
	    key: 'resetCombo',
	    value: function resetCombo() {
	      var hard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      this.reseting = true;
	      if (hard) {
	        this.combo = 1;
	      }
	      this.comboBar.stop();
	    }
	  }, {
	    key: 'createScoreText',
	    value: function createScoreText(x, y, score) {
	      var _this = this;

	      var text = this.game.add.text(x, y, score, {
	        font: 'bold ' + Math.min(Math.ceil(14 + score * 0.02), 20) + 'px Arial',
	        fill: '#fff'
	      });
	      setTimeout(function () {
	        _this.game.world.remove(text);
	      }, 1500);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.reseting) {
	        this.timer--;
	        if (this.timer <= 0) {
	          this.timer = 5;
	          this.combo--;
	          this.sndComboEnd.play();
	          this.font.text = this.combo.toString();
	          if (this.combo === 0) {
	            this.comboImage.alpha = 0;
	            this.reseting = false;
	          }
	        }
	      }

	      if (this.time <= 0) {
	        this.time = 0;
	        if (this.combo === 0) {
	          this.onTimeUp();
	        }
	      } else {
	        this.time--;
	      }
	      this.timeText.text = 'T: ' + this.time;
	      this.comboBar.update();
	    }
	  }]);

	  return UserInterface;
	}();

	exports.default = UserInterface;

/***/ })
/******/ ]);