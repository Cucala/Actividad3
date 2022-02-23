import Phaser from 'phaser';
// eslint-disable-next-line no-unused-vars
import Scene from '../scenes/scene';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} textureName
   * @param {number} tileHeight
   */
  constructor(scene, x, y, width, height, textureName, tileHeight) {
    super(scene, x, y, textureName);
    
    /**
     * @type {number}
     */
    this.tileHeight = tileHeight;

    /**
     * @type {number}
     */
    this.velocity = 100;
    
    /**
     * @type {number}
     */
    this.direction = 1;

    /**
     * @type {Scene}
     */
    this.scene = scene;
    this.scene.physics.add.collider(this, this.scene.collisionLayer);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setBodySize(width, height, true);

    this.createAnimation('explosion', 'crash', 0, 3, 7);
    this.on('animationcomplete', this.isDead, this)
  }

  /**
   * @param {string} key
   * @param {string} texture
   * @param {number} start
   * @param {number} end
   * @param {number} frameRate
   * @param {number} repeat
   */
  createAnimationWithRepeat(key, texture, start, end, frameRate, repeat) {
    this.scene.anims.create(
      {
        key: key,
        frames: this.scene.anims.generateFrameNumbers(
          texture,
          { start: start, end: end }
        ),
        frameRate: frameRate,
        repeat: repeat,
      }
    );
  }

/**
   * @param {string} key
   * @param {string} texture
   * @param {number} start
   * @param {number} end
   * @param {number} frameRate
   */
  createAnimation(key, texture, start, end, frameRate) {
    this.scene.anims.create(
      {
        key: key,
        frames: this.scene.anims.generateFrameNumbers(
          texture,
          { start: start, end: end }
        ),
        frameRate: frameRate
      }
    );
  }

  update() {
    this.setVelocityX(this.direction * this.velocity);
    let x = Math.floor(this.x / this.tileHeight) + this.direction;
    let y = Math.round((this.y + this.height / 2) / this.tileHeight);

    if(!this.existFloor(x, y) && this.body.blocked.down) {
      this.direction *= -1;
    }

    this.changeDirection()
    ? this.flipX = true
    : this.flipX = false;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  existFloor(x, y) {
    return this.scene.collisionLayer.hasTileAt(x, y);
  }

  /**
   * @returns {boolean}
   */
  changeDirection() {
    return this.direction > 0
  }

  /**
   * @param {string} key
   */
  activateAnimation(key) {
    this.play(key, true);
  }

  /**
   * @returns {boolean}
   */
  onFloor() {
    return this.body.velocity.y == 0;
  }

  /**
   * @returns {boolean}
   */
  onMoviment() {
    return this.body.velocity.x != 0;
  }

  die() {
    this.disableBody();
    this.play('explosion', true);
  }

  /**
   * @param {Phaser.Animations.Animation} animation
   * @param {Phaser.Textures.Frame} frame
   * @param {Phaser.Physics.Arcade.Sprite} sprite
   */
  // eslint-disable-next-line no-unused-vars
  isDead(animation, frame, sprite) {
    if(animation.key === "explosion") {
      this.disableBody(true, true);
    }
  }

}