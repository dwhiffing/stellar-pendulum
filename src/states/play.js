import Spawner from '../entities/spawner'
import Player from '../entities/player'
import TimerBar from '../entities/timerBar'
import UserInterface from '../entities/ui'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'
    this.game.camera.bounds = null
    this._shakeWorldTime = 0
    this._shakeWorldMax = 20
    this.game.shake = (duration, strength) => {
      this._shakeWorldTime = duration || 20;
      this._shakeWorldMax = strength || 20;
    }

    this.sndBallHit = game.add.audio('hit1')
    this.sndBallHit2 = game.add.audio('hit2')
    this.sndBallHit3 = game.add.audio('hit3')
    this.sndBallHitBall = game.add.audio('hitball')

    game.physics.startSystem(Phaser.Physics.P2JS)
    game.physics.p2.gravity.y = 1100
    game.physics.p2.restitution = 0.6
    game.physics.p2.setImpactEvents(true)
    var playerCollisionGroup = game.physics.p2.createCollisionGroup()
    var ballCollisionGroup = game.physics.p2.createCollisionGroup()
    game.physics.p2.updateBoundsCollisionGroup()

    this.player = new Player(game, ballCollisionGroup, playerCollisionGroup, (...args) => this.collide(...args))
    this.game.ui = new UserInterface(game, 3000, this.onTimeUp.bind(this))
    this.spawner = new Spawner(game, ballCollisionGroup, playerCollisionGroup)

    game.input.addMoveCallback(this.move, this)
  },

  move(pointer, x, y) {
    this.player.move(x, y)
  },

  update(game) {
    this.player.update()
    this.game.ui.update()

    if(this._shakeWorldTime > 0) {
      var magnitude = (this._shakeWorldTime / this._shakeWorldMax) * this._shakeWorldMax;
      var x = this.game.rnd.integerInRange(-magnitude, magnitude);
      var y = this.game.rnd.integerInRange(-magnitude, magnitude);

      this.game.camera.x = x;
      this.game.camera.y = y;
      this._shakeWorldTime--;
    }
  },

  onTimeUp() {
    this.player.release()
  },

  collide(player, ball) {
    if (!ball.parent) {
      if (!this.sndBallHitBall.isPlaying) {
        this.sndBallHitBall.play()
      }
      return
    }

    if (!this.player.alive) return

    let sprite = ball.parent.sprite

    if (sprite.tint === 0xff0000) {
      this.player.hitRed()
    } else if (sprite.tint === 0x0000ff) {
      this.player.hitBlue()
    } else {
      this.player.hitYellow()
    }

    const velocity = this.player.ball.body.velocity
    const speed = Math.abs(velocity.x) + Math.abs(velocity.y) * this.player.ball.body.mass
    const finalSpeed = Math.max(3,Math.floor(speed/50))

    if (finalSpeed > 40) {
      this.sndBallHit3.play()
    } else if (finalSpeed > 20) {
      this.sndBallHit2.play()
    } else {
      this.sndBallHit.play()
    }

    this.game.ui.hitTarget(sprite, finalSpeed, velocity, this.player.ball.body.mass)
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
