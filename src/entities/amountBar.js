export default class AmountBar {
  constructor(game, x, y, barDuration=100) {
  	this.game = game
  	this.bar = this.game.add.sprite(x, y, 'bar', 1)
  	this.sprite = this.game.add.sprite(x, y, 'bar', 0)
    this.bar.anchor.setTo(0, 0.5)
    this.sprite.anchor.setTo(0, 0.5)
    this.fullWidth = this.sprite.width
    this.sprite.x = x - this.fullWidth/2
    this.bar.x = x - this.fullWidth/2
    this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height)
    this.barDuration = barDuration
    this.rect.width = 10
    this.sprite.crop(this.rect)
  }
  update(amount, hue) {
    this.amount = amount / this.barDuration
    if (this.amount >= this.barDuration) {
      this.amount = this.barDuration
    }
    if (hue) {
      this.sprite.tint = hue
    }
    this.rect.width = this.amount * this.fullWidth
		this.sprite.crop(this.rect)
  }
}
