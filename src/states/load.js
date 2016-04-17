export default {
  preload() {
    this.game.plugins.cameraShake = this.game.plugins.add(Phaser.Plugin.CameraShake)
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('ball', 'images/ball.png')
    this.load.image('marker', 'images/marker.png')
    this.load.image('bit', 'images/bit.png')
    this.load.spritesheet('bar', 'images/bar.png', 150, 20);
    this.load.image('ring', 'images/ring.png')
    this.load.image('text', 'images/KNIGHT3.png');
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
