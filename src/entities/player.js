import AmountBar from './amountBar'
var spawning
var line
var lastX, lastY
var mouseSpring
var drawLine = false

export default class Player {
  constructor(game, ballCollisionGroup, playerCollisionGroup, onCollide) {
    this.game = game
    spawning = true

    this.ball = game.add.sprite(200, 200, 'ball')
    game.physics.p2.enable(this.ball)
    this.ball.body.setCircle(20)
    this.ball.body.data.shapes[0].sensor = true
    this.ball.body.onBeginContact.add(onCollide)
    this.ball.body.mass = 2

    this.ball.body.setCollisionGroup(playerCollisionGroup)
    this.ball.body.collides(ballCollisionGroup, onCollide)

    this.mouse = game.add.sprite(100, 100, 'ring')
    game.physics.p2.enable(this.mouse)
    this.mouse.body.static = true
    this.mouse.body.setCircle(10)
    this.mouse.body.data.shapes[0].sensor = true

    this.distBar = new AmountBar(game, 10, 140, 350)

    line = new Phaser.Line(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)

    mouseSpring = this.game.physics.p2.createSpring(this.mouse, this.ball, 10, 40, 15)
    line.setTo(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)
    drawLine = true

    this.release = this.release.bind(this)
  }

  move(x, y) {
    this.mouse.body.x = x
    this.mouse.body.y = y
    line.setTo(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)
    if (spawning) {
      this.ball.body.x = x
      this.ball.body.y = y
    }
    lastX = x
    lastY = y
    spawning = false
  }

  update() {
    this.dist = this.game.physics.arcade.distanceToPointer(this.ball)
    this.strain = this.dist/1000
    let hue = 0.35 - this.strain
    let thing = Phaser.Color.HSLtoRGB(hue, 1, 0.5)
    this.hue = Phaser.Color.RGBtoString(thing.r, thing.g, thing.b, 255, '#')
    let otherthing = Phaser.Color.getColor(thing.r, thing.g, thing.b)
    console.log(otherthing)

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
    this.game.physics.p2.removeSpring(mouseSpring)
    drawLine = false
    setTimeout(() => {
      this.game.state.restart()
    }, 1000)
  }

  preRender(game) {
    if (line) {
      line.setTo(this.ball.x, this.ball.y, this.mouse.x, this.mouse.y)
    }
  }

  render(game) {
    if (!spawning && drawLine && this.strain > 0.3) {
      this.release()
    } else {
      if (drawLine) {
        this.game.debug.geom(line, this.hue, false)
      }
    }
  }
}
