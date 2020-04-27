export default {
  create(game) {
    this.game.state.start('load', true, false)
    this.load.image('loader', 'images/loader.png')
  },
}
