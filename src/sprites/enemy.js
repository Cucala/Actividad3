/* eslint-disable no-unused-vars */
import Scene from '../scenes/scene';
import Sprite from './sprite';

export default class Enemy extends Sprite {
  /**
   * @param {Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} textureName
   * @param {number?} tileHeight
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

    width < 0 || height < 0 ? this.setBodySize(width, height, true) : null;
  }

  /**
   * @param {number} time
   * @param {number} delta
   */
  update(time, delta) {
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

}