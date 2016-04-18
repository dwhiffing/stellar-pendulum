export default class AmountBar {
  constructor(game, x, y, size=100) {
    this.x = x
    this.y = y
  	this.game = game
  	this.bar = this.game.add.sprite(x, y, 'bar', 1)
  	this.sprite = this.game.add.sprite(x, y, 'bar', 0)
    this.bar.anchor.setTo(0, 0.5)
    this.sprite.anchor.setTo(0, 0.5)
    this.setSize(size)
  }
  setSize(size) {
    this.bar.width = size *0.5
    this.barDuration = size
    this.bar.x = this.x - this.bar.width/2
    this.sprite.x = this.x - this.bar.width/2
  }
  update(amount, hue) {
    this.amount = amount / this.barDuration
    this.isFull = false
    if (this.amount >= 1) {
      this.isFull = true
      this.amount = 1
    }
    if (hue) {
      this.sprite.tint = hue
    }
    this.sprite.width = this.amount * this.bar.width
  }
}
