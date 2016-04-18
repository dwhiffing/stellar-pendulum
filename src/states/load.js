export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.audio('hit1', 'audio/hit.mp3')
    this.load.audio('hit2', 'audio/hit2.mp3')
    this.load.audio('hit3', 'audio/hit3.mp3')
    this.load.audio('comboend', 'audio/comboend.mp3')
    this.load.audio('hitball', 'audio/hitball.mp3')
    this.load.audio('neardead', 'audio/neardead2.mp3')
    this.load.audio('dead', 'audio/dead.mp3')

    this.load.image('ball', 'images/ball.png')
    this.load.image('marker', 'images/marker.png')
    this.load.image('bit', 'images/bit.png')
    this.load.spritesheet('bar', 'images/bar.png', 150, 20);
    this.load.image('ring', 'images/ring.png')
    this.load.image('text', 'images/font.png');
  },

  onLoadComplete() {
    this.game.state.start('menu')
  }
}
