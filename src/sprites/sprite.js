import Phaser from 'phaser';
// eslint-disable-next-line no-unused-vars
import Scene from '../scenes/scene';

export default class Sprite extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   */
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    /**
     * @type {Scene}
     */
    this.scene = scene;
    this.scene.physics.add.collider(this, this.scene.collisionLayer);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    
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

  /**
   * @param {string} key
   * @param {string} texture
   * @param {number[]} frames
   * @param {number} frameRate
   */
  createAnimationFromArray(key, texture, frames, frameRate) {
    this.scene.anims.create(
      {
        key: key,
        frames: this.scene.anims.generateFrameNumbers(
          texture,
          { frames: frames }
        ),
        frameRate: frameRate
      }
    );
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
    this.activateAnimation('explosion');
  }

  /**
   * @param {Phaser.Animations.Animation} animation
   */
  isDead(animation) {
    if(animation.key === "explosion") {
      this.disableBody(true, true);
    }
  }
}