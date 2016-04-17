import TimerBar from '../entities/timerBar'

let combo = 0
let timer = 5
let initialComboTime = 3000
let timePerHit = 1500
let particleLifetime = 5000

export default class UserInterface {
  constructor(game, time, onTimeUp) {
    this.game = game
    this.score = 0
    this.time = time
    combo = 0

    this.onTimeUp = onTimeUp

    this.scoreText = game.add.text(10, 10, "0", { font: "bold 32px Arial", fill: "#fff" })
    this.timeText = game.add.text(game.world.width-120, 10, "T: 2000", { font: "bold 32px Arial", fill: "#fff" })
    this.comboBar = new TimerBar(game, game.world.centerX, game.world.centerY+20, 4000)

    this.font = game.add.retroFont('text', 62, 50, Phaser.RetroFont.TEXT_SET6, 10, 2, 2)
    this.font.text = "0"
    this.comboImage = game.add.image(game.world.centerX, game.world.centerY, this.font)
    this.comboImage.anchor.set(0.5, 1)
    this.comboImage.alpha = 0

    this.emitter = game.add.emitter(0, 0, 100)
    this.emitter.makeParticles('bit')
    this.emitter.setAlpha(0.9, 0, 3000)
    this.emitter.setScale(0.8, 0.5, 0.8, 0.5, 3000, Phaser.Easing.Quintic.Out)
    this.emitter.setXSpeed(-300, 300)
    this.emitter.setYSpeed(-300, 300)
    this.emitter.gravity = 300
  }

  emit(x, y, tint, speed) {
    this.emitter.x = x
    this.emitter.y = y
    this.emitter.forEach(particle => particle.tint = tint)
    this.emitter.start(true, particleLifetime, null, speed)
  }

  hitTarget(sprite, speed) {
    combo++

    this.comboImage.alpha = 1
    this.score = this.score + combo
    this.scoreText.text = `${this.score}`
    this.font.text = combo.toString()

    this.emit(sprite.x, sprite.y, sprite.tint, speed)
    this.reseting = false

    if (this.comboBar.timer.running) {
      this.comboBar.add(timePerHit, this.resetCombo.bind(this))
    } else {
      this.comboBar.start(initialComboTime, this.resetCombo.bind(this))
    }
  }

  resetCombo() {
    this.reseting = true
  }

  update() {
    if (this.reseting) {
      timer--
      if (timer <= 0) {
        timer = 5
        combo--
        this.font.text = combo.toString()
        if (combo === 0) {
          this.comboImage.alpha = 0
          this.reseting = false
        }
      }
    }

    if (this.time <= 0) {
      this.time = 0
      this.onTimeUp()
    } else {
      this.time--
    }
    this.timeText.text = `T: ${this.time}`
    this.comboBar.update()
  }
}
