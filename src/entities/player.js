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
    drawLine = true
    alive = true

    this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball')
    this.mouse = game.add.sprite(game.world.centerX, game.world.centerY, 'ring')
    line = new Phaser.Line(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)
    line.setTo(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)

    game.physics.p2.enable(this.ball)
    this.ball.body.setCircle(20)
    this.ball.body.collides(ballCollisionGroup)
    this.ball.body.setCollisionGroup(playerCollisionGroup)
    this.ball.body.onBeginContact.add(onCollide)
    this.ball.body.mass = 2

    game.physics.p2.enable(this.mouse)
    this.mouse.body.static = true

    mouseSpring = this.game.physics.p2.createSpring(this.mouse, this.ball, 10, 40, 15)

    this.trailEmitter = game.add.emitter(game.world.centerX, 500, 400)
    this.trailEmitter.makeParticles('ball')
    this.trailEmitter.setXSpeed(0, 0)
    this.trailEmitter.setYSpeed(0, 0)
    this.trailEmitter.setAlpha(0.05, 0, 1000)
    this.trailEmitter.setScale(1, 0.8, 1, 0.8, 1000, Phaser.Easing.Quintic.Out)
    this.trailEmitter.start(false, 1000, 5)

    this.distBar = new AmountBar(game, game.world.centerX, game.world.height - 30, 350)

    this.release = this.release.bind(this)
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

    this.trailEmitter.x = this.ball.x
    this.trailEmitter.y = this.ball.y

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
      this.game.shake(30, 100)

      setTimeout(() => {
        this.game.state.restart()
      }, 4000)
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
