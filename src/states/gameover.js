let score = 0
export default {
  init(args={}) {
    score = args.score || 0
  },

  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'

    this.startText = game.add.text(this.game.world.centerX, this.game.world.centerY-50, "Final Score: ", { font: "bold 28px Arial", fill: "#fff" })
    this.startText.anchor.setTo(0.5)

    this.font = game.add.retroFont('text', 62, 50, Phaser.RetroFont.TEXT_SET6, 10, 2, 2)
    this.font.text = score.toString()
    this.comboImage = game.add.image(game.world.centerX, game.world.centerY+50, this.font)
    this.comboImage.anchor.set(0.5, 1)

    game.input.onDown.add(() => {
      game.state.start('play', true, false)
    })
  },
}
