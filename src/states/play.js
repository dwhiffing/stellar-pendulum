import Spawner from '../entities/spawner'
import Player from '../entities/player'
import TimerBar from '../entities/timerBar'

let combo = 1

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#304871'
    this.score = 0
    combo = 1

    game.physics.startSystem(Phaser.Physics.P2JS)
    game.physics.p2.gravity.y = 1100
    game.physics.p2.restitution = 0.6

    var playerCollisionGroup = game.physics.p2.createCollisionGroup()
    var ballCollisionGroup = game.physics.p2.createCollisionGroup()

    this.player = new Player(game, ballCollisionGroup, playerCollisionGroup, (...args) => this.collide(...args))
    this.spawner = new Spawner(game, ballCollisionGroup, playerCollisionGroup)

    this.scoreText = game.add.text(10, 10, "points: 0", { font: "bold 32px Arial", fill: "#fff" });
    this.comboText = game.add.text(10, 50, "combo: 1", { font: "bold 32px Arial", fill: "#fff" });
    this.comboBar = new TimerBar(game, 10, 100, 4000)
    this.gameTimerBar = new TimerBar(game, 10, 170, 60000)
    this.gameTimerBar.start(60000, this.player.release)

    game.input.addMoveCallback(this.move, this)
  },

  move(pointer, x, y) {
    this.player.move(x, y)
  },

  update(game) {
    this.player.update()
    this.comboBar.update()
    this.gameTimerBar.update()
  },

  collide(player, ball) {
    let sprite = ball.parent.sprite

    if (sprite.tint === 0xff0000) {
      this.player.hitRed()
    } else if (sprite.tint === 0x0000ff) {
      this.player.hitBlue()
    }

    let setCombo = () => {
      combo = 1
      this.comboText.text = `combo: ${combo}`
    }

    if (this.comboBar.timer.running) {
      this.comboBar.add(1500, setCombo)
    } else {
      this.comboBar.start(4000, setCombo)
    }

    this.gameTimerBar.add(500)

    this.score = this.score + combo
    this.scoreText.text = `points: ${this.score}`

    combo++
    this.comboText.text = `combo: ${combo}`

    sprite.kill()
    this.spawner.spawn()
  },

  preRender(game) {
    this.player.preRender()
  },

  render(game) {
    this.player.render()
  },
}
