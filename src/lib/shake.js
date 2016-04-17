Phaser.Plugin.CameraShake = function (game, parent) {
  this.game = game
  this._shakeWorldMax = 20
  this._shakeWorldTime = 0
  this._boundsCache = Phaser.Utils.extend(false, {}, this.game.world.bounds);
  Phaser.Plugin.call(this, game, parent)
 }

 Phaser.Plugin.CameraShake.prototype = Object.create(Phaser.Plugin.prototype)
 Phaser.Plugin.CameraShake.prototype.constructor = Phaser.Plugin.CameraShake

 Phaser.Plugin.CameraShake.prototype.start = function (duration, strength) {
   this._shakeWorldTime = duration || 20
   this._shakeWorldMax = strength || 20
   this.game.world.setBounds(this._boundsCache.x - this._shakeWorldMax, this._boundsCache.y - this._shakeWorldMax, this._boundsCache.width + this._shakeWorldMax, this._boundsCache.height + this._shakeWorldMax)
 }

 Phaser.Plugin.CameraShake.prototype.update = function () {
  var scaleObj
  if(this._shakeWorldTime > 0) {
    var magnitude = (this._shakeWorldTime / this._shakeWorldMax) * this._shakeWorldMax
    var x = this.game.rnd.integerInRange(-magnitude, magnitude)
    var y = this.game.rnd.integerInRange(-magnitude, magnitude)

    this.game.camera.x = x
    this.game.camera.y = y
    this._shakeWorldTime--
    if(this._shakeWorldTime <= 0) {
      this.game.world.setBounds(this._boundsCache.x, this._boundsCache.x, this._boundsCache.width, this._boundsCache.height)
    }
  }
}
