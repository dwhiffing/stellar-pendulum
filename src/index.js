import BootState from './states/boot'
import LoadState from './states/load'
import PlayState from './states/play'
import shake from './lib/shake'


(function() {
  let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'app')

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('play', PlayState)
  game.state.start('boot')
})()
