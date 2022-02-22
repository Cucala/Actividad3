import Phaser from 'phaser';

export class ScrollingXCamara extends Phaser.Cameras.Scene2D.Camera {
    /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} playerPositionInX
   * @param {number} backgroundSizeInX
   */
    constructor(x, y, width, height, playerPositionInX, backgroundSizeInX) {
      super(x, y, width, height)

      this.scrollX = playerPositionInX - backgroundSizeInX; 
    }

    /**
   * @param {number} playerPositionInX
   * @param {number} backgroundSizeInX
   */
    update(playerPositionInX, backgroundSizeInX) {
      this.scrollX = playerPositionInX - backgroundSizeInX; 
    }
}