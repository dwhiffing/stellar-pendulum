import AmountBar from './amountBar'
var spawning
var alive
var line
var lastX, lastY
var mouseSpring
var drawLine = false

export default class Player {
  constructor(game, ballCollisionGroup, playerCollisionGroup, onCollide) {
    this.game = game
    spawning = true
    alive = true

    let top = game.add.sprite(0,-10, 'ball')
    game.physics.p2.enable(top, true)
    top.body.static = true
    top.body.setCollisionGroup(ballCollisionGroup)
    top.body.setRectangle(this.game.width*2, 10)
    top.body.collides(playerCollisionGroup)

    let bottom = game.add.sprite(0,this.game.height+10, 'ball')
    game.physics.p2.enable(bottom, true)
    bottom.body.static = true
    bottom.body.setCollisionGroup(ballCollisionGroup)
    bottom.body.setRectangle(this.game.width*2, 10)
    bottom.body.collides(playerCollisionGroup)

    let left = game.add.sprite(-10,0, 'ball')
    game.physics.p2.enable(left, true)
    left.body.static = true
    left.body.setCollisionGroup(ballCollisionGroup)
    left.body.setRectangle(10, this.game.height*2)
    left.body.collides(playerCollisionGroup)

    let right = game.add.sprite(this.game.width+10,0, 'ball')
    game.physics.p2.enable(right, true)
    right.body.static = true
    right.body.setCollisionGroup(ballCollisionGroup)
    right.body.setRectangle(10, this.game.height*2)
    right.body.collides(playerCollisionGroup)

    this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball')
    game.physics.p2.enable(this.ball)
    this.ball.body.setCircle(20)
    this.ball.body.onBeginContact.add(onCollide)
    this.ball.body.mass = 2

    this.ball.body.setCollisionGroup(playerCollisionGroup)
    this.ball.body.collides(ballCollisionGroup)

    this.mouse = game.add.sprite(game.world.centerX, game.world.centerY, 'ring')
    game.physics.p2.enable(this.mouse)
    this.mouse.body.static = true
    this.mouse.body.setCircle(10)
    this.mouse.body.data.shapes[0].sensor = true

    this.distBar = new AmountBar(game, game.world.centerX, game.world.height - 30, 350)

    line = new Phaser.Line(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)

    mouseSpring = this.game.physics.p2.createSpring(this.mouse, this.ball, 10, 40, 15)
    line.setTo(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)
    drawLine = true

    this.release = this.release.bind(this)

    this.smokeEmitter = game.add.emitter(game.world.centerX, 500, 400)

    this.smokeEmitter.makeParticles('ball')

    this.smokeEmitter.setXSpeed(0, 0)
    this.smokeEmitter.setYSpeed(0, 0)
    this.smokeEmitter.setAlpha(0.05, 0, 1000)
    this.smokeEmitter.setScale(1, 0.8, 1, 0.8, 1000, Phaser.Easing.Quintic.Out)

    this.smokeEmitter.start(false, 1000, 5)
  }

  move(x, y) {
    this.mouse.body.x = x
    this.mouse.body.y = y
    line.setTo(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)
    if (spawning) {
      setTimeout(() => spawning = false, 50)
      this.ball.body.x = x
      this.ball.body.y = y
    }
    lastX = x
    lastY = y
  }

  update() {
    this.dist = this.game.physics.arcade.distanceToPointer(this.ball)
    this.strain = this.dist/1000
    let hue = 0.35 - this.strain
    let thing = Phaser.Color.HSLtoRGB(hue, 1, 0.5)
    this.hue = Phaser.Color.RGBtoString(thing.r, thing.g, thing.b, 255, '#')
    let otherthing = Phaser.Color.getColor(thing.r, thing.g, thing.b)

    this.smokeEmitter.x = this.ball.x
    this.smokeEmitter.y = this.ball.y

    this.distBar.update(this.dist - 50, otherthing)
  }

  hitRed() {
    this.ball.scale.setTo(this.ball.scale.x * 1.2)
    this.ball.body.mass = this.ball.body.mass * 1.2
  }

  hitBlue() {
    this.ball.scale.setTo(this.ball.scale.x * 0.9)
    this.ball.body.mass = this.ball.body.mass * 0.8
  }

  release() {
    if (alive) {
      alive = false
      this.game.physics.p2.removeSpring(mouseSpring)
      drawLine = false
      this.game.plugins.cameraShake.start(20, 50)
      setTimeout(() => {
        this.game.state.restart()
      }, 1000)
    }
  }

  preRender(game) {
    if (line) {
      line.setTo(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)
    }
  }

  render(game) {
    if (!spawning && alive && this.strain > 0.3) {
      this.release()
    } else {
      if (drawLine) {
        this.game.debug.geom(line, this.hue, false)
      }
    }
  }
}
