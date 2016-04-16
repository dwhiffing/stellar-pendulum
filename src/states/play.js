var cow
var line
var mouseBody
var mouseSpring
var drawLine = false

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#304871'

    game.physics.startSystem(Phaser.Physics.P2JS)
    game.physics.p2.gravity.y = 100
    game.physics.p2.restitution = 0.8

    cow = game.add.sprite(200, 200, 'cow')
    game.physics.p2.enable(cow, true)
    cow.body.setCircle(20)

    mouseBody = game.add.sprite(100, 100, 'cursor')
    game.physics.p2.enable(mouseBody, true)
    mouseBody.body.static = true
    mouseBody.body.setCircle(10)
    mouseBody.body.data.shapes[0].sensor = true

    line = new Phaser.Line(cow.x, cow.y, mouseBody.x, mouseBody.y)

    game.input.onDown.add(this.click, this)
    game.input.onUp.add(this.release, this)
    game.input.addMoveCallback(this.move, this)
  },

  click(pointer) {
    var bodies = this.game.physics.p2.hitTest(pointer.position, [ cow.body ])
    if (bodies.length) {
      mouseSpring = this.game.physics.p2.createSpring(mouseBody, bodies[0], 0, 30, 1)
      line.setTo(cow.x, cow.y, mouseBody.x, mouseBody.y)
      drawLine = true
    }
  },

  release() {
    this.game.physics.p2.removeSpring(mouseSpring)
    drawLine = false
  },

  move(pointer, x, y, isDown) {
    mouseBody.body.x = x
    mouseBody.body.y = y
    line.setTo(cow.x, cow.y, mouseBody.x, mouseBody.y)
  },

  preRender(game) {
    if (line) {
      line.setTo(cow.x, cow.y, mouseBody.x, mouseBody.y)
    }
  },

  render(game) {
    if (drawLine) {
      game.debug.geom(line)
    }
  },
}
