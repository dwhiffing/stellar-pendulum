var marker, marker2
var lastX, lastY
var balls
var spawnNum
var nextPos, nextPos2

export default class Spawner {
  constructor(game, ballCollisionGroup, playerCollisionGroup) {
    this.game = game
    balls = game.add.group()
    spawnNum = 0
    balls.enableBody = true
    balls.physicsBodyType = Phaser.Physics.P2JS
    for (var i = 0; i < 6; i++) {
      var ball
      ball = balls.create(game.world.randomX, game.world.randomY, 'ball')

      ball.body.setRectangle(40, 40)
      ball.body.static = true
      ball.kill()

      ball.body.setCollisionGroup(ballCollisionGroup)
      ball.body.data.shapes[0].sensor = true
      ball.body.collides(playerCollisionGroup)
    }

    nextPos = { x: this.game.rnd.integerInRange(50, this.game.world.width-50), y: this.game.rnd.integerInRange(50, this.game.world.height-50) }
    nextPos2 = { x: this.game.rnd.integerInRange(50, this.game.world.width-50), y: this.game.rnd.integerInRange(50, this.game.world.height-50) }

    marker = game.add.sprite(200, 200, 'marker')
    marker2 = game.add.sprite(200, 200, 'marker')
    marker.anchor.setTo(0.5, 0.5)
    marker2.anchor.setTo(0.5, 0.5)
    marker2.alpha = 0.2

    this.markerTween = game.add.tween(marker)
    this.markerTween.to({ angle: 360 }, 1500, Phaser.Easing.Linear.None, true, 0, -1)
    this.markerTween.onStart.add(() => this.markerTween.delay(0))

    this.markerTween2 = game.add.tween(marker2)
    this.markerTween2.to({ angle: 360 }, 1500, Phaser.Easing.Linear.None, true, 0, -1)
    this.markerTween2.onStart.add(() => this.markerTween.delay(0))

    this.spawn()
  }

  getTint(i) {
    if (spawnNum > 10 && spawnNum % 10 === 0) {
      return 0x0000ff
    } else if (spawnNum > 5 && spawnNum % 5 === 0) {
      return 0xff0000
    } else {
      return 0xffff00
    }
  }

  spawn() {
    var ball
    ball = balls.getFirstDead()

    ball.reset(nextPos.x, nextPos.y)
    ball.tint = nextPos.tint || 0xffff00

    nextPos = { x: nextPos2.x, y: nextPos2.y, tint: nextPos2.tint || 0xffff00 }
    marker.reset(nextPos.x, nextPos.y)
    marker.tint = nextPos.tint

    var tint = this.getTint()
    nextPos2 = { x: this.game.rnd.integerInRange(50, this.game.world.width-50), y: this.game.rnd.integerInRange(50, this.game.world.height-50), tint: tint }
    marker2.reset(nextPos2.x, nextPos2.y)
    marker2.tint = nextPos2.tint
    spawnNum++
  }
}
