export default class TimerBar {
  constructor(game, x, y, amountTransform) {
  	this.game = game
  	this.game.add.sprite(x, y, 'bar', 1)
  	this.sprite = this.game.add.sprite(x, y, 'bar', 0)
    this.fullWidth = this.sprite.width
    this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height)
    this.timer = game.time.create(false)
    this.backwards = false
    this.rect.width = 10
    this.sprite.crop(this.rect)
  }
  update() {
    if (this.timer.paused) return
    this.rect.width = this.getTimeNormal() / this.dur * this.fullWidth
		this.sprite.crop(this.rect)
  }
  start(dur, cb) {
    let lastAmount = 0
    if (this.timer.running) {
      lastAmount = this.stop()
    }
    this.timer.add(lastAmount + dur, cb)
    this.dur = lastAmount + dur
    this.timer.start()
  }
  stop() {
    this.timer.stop()
    return this.getAmount()
  }
  getAmount() {
    return Math.ceil(100 - ((this.getTimeNormal() / this.dur) * 100))
  }
  getTimeNormal() {
    return this.backwards ? this.dur - this.timer.duration : this.timer.duration
  }
}
