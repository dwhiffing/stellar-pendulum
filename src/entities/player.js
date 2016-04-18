import AmountBar from './amountBar'
var spawning
var line
var lastX, lastY
var mouseSpring
var lineSize
var drawLine = false

export default class Player {
  constructor(game, ballCollisionGroup, playerCollisionGroup, onCollide) {
    this.game = game
    spawning = true
    drawLine = true
    this.alive = true
    lineSize = 220

    this.graphics = this.game.add.graphics(0, 0)

    this.sndNearDead = game.add.audio('neardead')
    this.sndDead = game.add.audio('dead')

    this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball')
    this.mouse = game.add.sprite(game.world.centerX, game.world.centerY, 'ring')

    game.physics.p2.enable(this.ball)
    this.ball.body.setCircle(20)
    this.ball.body.collides(ballCollisionGroup)
    this.ball.body.setCollisionGroup(playerCollisionGroup)
    this.ball.body.onBeginContact.add(onCollide)
    this.ball.body.mass = 1

    game.physics.p2.enable(this.mouse)
    this.mouse.body.static = true

    this.trailEmitter = game.add.emitter(game.world.centerX, 500, 400)
    this.trailEmitter.makeParticles('ball')
    this.trailEmitter.setXSpeed(0, 0)
    this.trailEmitter.setYSpeed(0, 0)
    this.trailEmitter.setAlpha(0.15, 0, 1500)
    this.trailEmitter.start(false, 1500, 5)
    this.trailEmitter.gravity =0

    this.distBar = new AmountBar(game, game.world.centerX, game.world.height - 30, lineSize)

    this.adjustSize(0.8, 1)
    this.adjustLine(0)
    this.release = this.release.bind(this)
  }

  move(x, y) {
    this.mouse.body.x = x
    this.mouse.body.y = y
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
    if (spawning) {
      this.dist = 20
      this.strain = 0
    }

    this.trailEmitter.x = this.ball.x
    this.trailEmitter.y = this.ball.y

    var theVariable = lineSize - this.dist
    var top = 12
    var bottom = 1
    var distance = top - bottom
    this.width = bottom + ((theVariable / 100) * distance)

    var theVariable = lineSize - this.dist
    var top = 220
    var bottom = 0
    var distance = top - bottom
    let hue = bottom + ((theVariable / 100) * distance)
    hue = Phaser.Color.HSLtoRGB(hue/1000, 1, 0.5)
    this.hue = Phaser.Color.RGBtoString(hue.r, hue.g, hue.b, 255, '#')
    this.hueColor = Phaser.Color.getColor(hue.r, hue.g, hue.b)

    if (drawLine) {
      // if (this.dist > this.distBar.barDuration*0.92 && !this.sndNearDead.isPlaying) {
      //   this.sndNearDead.play()
      // }
      this.distBar.update(this.dist, this.hueColor)
    }

  }

  adjustLine(size) {
    lineSize += size
    if (lineSize > 350) {
      lineSize = 350
    }
    this.distBar.setSize(lineSize)
    this.game.physics.p2.removeSpring(mouseSpring)
    mouseSpring = this.game.physics.p2.createSpring(this.mouse, this.ball, lineSize/10, 60, 25)
  }

  adjustSize(size) {
    let scale = this.ball.scale.x * size
    if (scale < 0.7) {
      scale = 0.7
    }
    if (scale > 2) {
      scale = 2
    }
    this.ball.scale.setTo(scale)
    this.ball.body.mass = this.ball.body.mass * (size * 1.1)
    this.trailEmitter.setScale(scale, scale*0.8, scale, scale*0.8, 1000, Phaser.Easing.Quintic.Out)
  }

  hitYellow() {

  }

  hitRed() {
    this.adjustSize(1.15)
  }

  hitBlue() {
    this.adjustLine(50)
  }

  release() {
    if (this.alive) {
      this.alive = false
      this.sndDead.play()
      this.game.physics.p2.removeSpring(mouseSpring)
      drawLine = false
      this.game.shake(30, 100)
      this.game.ui.resetCombo(true)
      setTimeout(() => {
        this.game.state.start('gameover', true, false, {score: this.game.ui.score})
      }, 2000)
    }
  }

  preRender() {
    if (drawLine) {
      this.graphics.lineStyle(this.width, this.hueColor)
      this.graphics.moveTo(this.ball.x, this.ball.y)
      this.graphics.lineTo(this.mouse.x, this.mouse.y)
    }
  }

  render(game) {
    if (!spawning && this.alive && this.distBar.isFull) {
      this.release()
    } else {
      this.graphics.clear()
    }
  }
}
