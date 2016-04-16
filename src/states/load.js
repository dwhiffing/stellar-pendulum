export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('ball', 'images/ball.png')
    this.load.image('marker', 'images/marker.png')
    this.load.spritesheet('bar', 'images/bar.png', 150, 20);
    this.load.image('ring', 'images/ring.png')
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
