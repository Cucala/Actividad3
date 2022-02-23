import Phaser from 'phaser'

export default class Scene extends Phaser.Scene {
  
  /**
   * @param {string} name
   */
  constructor(name) {
    super(name);


    /**
     * @type {Phaser.Tilemaps.TilemapLayer}
     */
    this.collisionLayer = undefined;
  }

}