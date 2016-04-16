export default class TimerBar {
  constructor(game, x, y, max) {
  	this.game = game
  	this.game.add.sprite(x, y, 'bar', 1)
  	this.sprite = this.game.add.sprite(x, y, 'bar', 0)
    this.fullWidth = this.sprite.width
    this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height)
    this.timer = game.time.create(false)
    this.max = max
    this.backwards = false
    this.rect.width = 10
    this.sprite.crop(this.rect)
  }
  update() {
    if (this.timer.paused) return
    this.rect.width = this.timer.duration / this.max * this.fullWidth
		this.sprite.crop(this.rect)
  }
  start(dur, cb) {
    this.timer.add(dur, () => {
      console.log('asd')
      cb && cb()
      this.stop()
    })
    this.dur = dur
    this.timer.start()
  }
  add(amount, cb) {
    let lastAmount = 0
    if (this.timer.running) {
      lastAmount = this.stop()
    }
    amount = lastAmount + amount
    if (amount > this.max) {
      amount = this.max
    }
    this.start(amount, cb)
  }
  stop() {
    let amount = this.timer.duration
    this.timer.stop()
    return amount
  }
}
