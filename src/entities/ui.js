import TimerBar from '../entities/timerBar'

let timer = 5
let initialComboTime = 3000
let timePerHit = 1000
let particleLifetime = 5000

export default class UserInterface {
  constructor(game, time, onTimeUp) {
    this.game = game
    this.score = 0
    this.time = time
    this.combo = 0

    this.onTimeUp = onTimeUp

    this.sndComboEnd = game.add.audio('comboend')

    this.scoreText = game.add.text(10, 10, "0", { font: "bold 32px Arial", fill: "#fff" })
    this.timeText = game.add.text(game.world.width-120, 10, "T: 2000", { font: "bold 32px Arial", fill: "#fff" })
    this.comboBar = new TimerBar(game, game.world.centerX, game.world.centerY+20, 3000)

    this.font = game.add.retroFont('text', 62, 50, Phaser.RetroFont.TEXT_SET6, 10, 2, 2)
    this.font.text = "0"
    this.comboImage = game.add.image(game.world.centerX, game.world.centerY, this.font)
    this.comboImage.anchor.set(0.5, 1)
    this.comboImage.alpha = 0

    this.emitter = game.add.emitter(0, 0, 300)
    this.emitter.makeParticles('bit')
    this.emitter.setAlpha(0.9, 0, 2000)
    this.emitter.gravity = 400
  }

  emit(x, y, tint, speed) {
    this.emitter.x = x
    this.emitter.y = y
    this.emitter.forEach(particle => particle.tint = tint)
    this.emitter.start(true, particleLifetime, null, speed)
  }

  hitTarget(sprite, speed, velocity, mass) {
    this.combo++

    this.comboImage.alpha = 1
    let score = Math.ceil(this.combo * speed * mass)
    this.score = this.score + score
    this.scoreText.text = `${this.score}`
    this.font.text = this.combo.toString()


    this.emitter.setScale(sprite.scale.x * 0.8, sprite.scale.x * 0.5, sprite.scale.x * 0.8, sprite.scale.x * 0.5, 3000, Phaser.Easing.Quintic.Out)
    this.emitter.setXSpeed(-200 + velocity.x*0.2, 200+velocity.x*0.3)
    this.emitter.setYSpeed(-200 + velocity.y*0.2, 200+ velocity.y*0.3)
    this.emit(sprite.x, sprite.y, sprite.tint, speed)
    this.reseting = false

    this.createScoreText(sprite.x, sprite.y, score)

    if (this.comboBar.timer.running || this.combo > 1) {
      if (this.comboBar.timer.running) {
        this.comboBar.add(2000, this.resetCombo.bind(this))
      } else {
        this.comboBar.add(timePerHit, this.resetCombo.bind(this))
      }
    } else {
      this.comboBar.start(initialComboTime, this.resetCombo.bind(this))
    }
  }

  resetCombo(hard=false) {
    this.reseting = true
    if (hard) {
      this.combo = 1
    }
    this.comboBar.stop()
  }

  createScoreText(x, y, score) {
    let text = this.game.add.text(x, y, score, { font: `bold ${Math.min(Math.ceil(14 + score*0.02), 20)}px Arial`, fill: "#fff" })
    setTimeout(() => {
      this.game.world.remove(text)
    }, 1500)
  }

  update() {
    if (this.reseting) {
      timer--
      if (timer <= 0 ) {
        timer = 5
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
