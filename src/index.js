import BootState from './states/boot'
import LoadState from './states/load'
import GameOverState from './states/gameover'
import MenuState from './states/menu'
import PlayState from './states/play'


(function() {
  let game = new Phaser.Game(800, 500, Phaser.CANVAS, 'app')

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('menu', MenuState)
  game.state.add('gameover', GameOverState)
  game.state.add('play', PlayState)
  game.state.start('boot')
})()
