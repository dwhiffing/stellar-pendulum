import TimerBar from '../entities/timerBar'

const INITIAL_COMOBO_TIME = 3000
const TIME_PER_HIT = 1000
const PARTICLE_LIFETIME = 5000
let timer = 5

export default class UserInterface {
  constructor(game, time, onTimeUp) {
    this.game = game
    this.time = time
    this.onTimeUp = onTimeUp
    this.score = this.timer = this.combo = 0

    this.sndComboEnd = game.add.audio('comboend')
    this.scoreText = game.add.text(10, 10, '0', {
      font: 'bold 32px Arial',
      fill: '#fff',
    })
    this.timeText = game.add.text(game.world.width - 120, 10, 'T: 2000', {
      font: 'bold 32px Arial',
      fill: '#fff',
    })
    this.font = game.add.retroFont(
      'text',
      62,
      50,
      Phaser.RetroFont.TEXT_SET6,
      10,
      2,
      2,
    )
    this.hitTarget = this.hitTarget.bind(this)

    this.comboImage = game.add.image(
      game.world.centerX,
      game.world.centerY,
      this.font,
    )
    this.comboImage.anchor.set(0.5, 1)
    this.comboImage.alpha = 0

    this.comboBar = new TimerBar(
      game,
      game.world.centerX,
      game.world.centerY + 20,
      3000,
    )

    this.redEmitter = this.createEmitter(100, 0xff0000)
    this.blueEmitter = this.createEmitter(100, 0x0000ff)
    this.yellowEmitter = this.createEmitter(300, 0xffff00)
    this.emitter = this.yellowEmitter
  }

  createEmitter(amount, tint) {
    let emitter = this.game.add.emitter(0, 0, 300)
    emitter.makeParticles('bit')
    emitter.setAlpha(0.9, 0, 4000)
    emitter.gravity = 400
    emitter.forEach((particle) => (particle.tint = tint))
    return emitter
  }

  emit(x, y, tint, speed) {
    this.emitter.x = x
    this.emitter.y = y
    this.emitter.forEach((particle) => (particle.tint = tint))
    this.emitter.start(true, PARTICLE_LIFETIME, null, speed)
  }

  hitTarget(sprite, speed, velocity, mass) {
    this.combo++

    this.comboImage.alpha = 1
    let score = Math.ceil(this.combo * speed * mass)
    this.score = this.score + score
    this.scoreText.text = `${this.score}`
    this.font.text = this.combo.toString()

    if (sprite.tint === 0xffff00) {
      this.emitter = this.yellowEmitter
    } else if (sprite.tint === 0xff0000) {
      this.emitter = this.redEmitter
    } else {
      this.emitter = this.blueEmitter
    }
    this.emitter.setScale(
      sprite.scale.x * 0.8,
      sprite.scale.x * 0.5,
      sprite.scale.x * 0.8,
      sprite.scale.x * 0.5,
      3000,
      Phaser.Easing.Quintic.Out,
    )
    this.emitter.setXSpeed(-200 + velocity.x * 0.2, 200 + velocity.x * 0.3)
    this.emitter.setYSpeed(-200 + velocity.y * 0.2, 200 + velocity.y * 0.3)
    this.emit(sprite.x, sprite.y, sprite.tint, speed)
    this.reseting = false

    this.createScoreText(sprite.x, sprite.y, score)

    if (this.comboBar.timer.running || this.combo > 1) {
      if (this.comboBar.timer.running) {
        this.comboBar.add(2000, this.resetCombo.bind(this))
      } else {
        this.comboBar.add(TIME_PER_HIT, this.resetCombo.bind(this))
      }
    } else {
      this.comboBar.start(INITIAL_COMOBO_TIME, this.resetCombo.bind(this))
    }
  }

  resetCombo(hard = false) {
    this.reseting = true
    if (hard) {
      this.combo = 1
    }
    this.comboBar.stop()
  }

  createScoreText(x, y, score) {
    let text = this.game.add.text(x, y, score, {
      font: `bold ${Math.min(Math.ceil(14 + score * 0.02), 20)}px Arial`,
      fill: '#fff',
    })
    setTimeout(() => {
      this.game.world.remove(text)
    }, 1500)
  }

  update() {
    if (this.reseting) {
      this.timer--
      if (this.timer <= 0) {
        this.timer = 5
        this.combo--
        this.sndComboEnd.play()
        this.font.text = this.combo.toString()
        if (this.combo === 0) {
          this.comboImage.alpha = 0
          this.reseting = false
        }
      }
    }

    if (this.time <= 0) {
      this.time = 0
      if (this.combo === 0) {
        this.onTimeUp()
      }
    } else {
      this.time--
    }
    this.timeText.text = `T: ${this.time}`
    this.comboBar.update()
  }
}
