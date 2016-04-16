export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('ball', 'images/ball.png')
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
