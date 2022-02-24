/* eslint-disable no-unused-vars */
import Phaser from 'phaser'
import Player from '../sprites/player';

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

    /**
     * @type {Player}
     */
    this.player = undefined;

    /**
     * @type {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody}
     */
    this.goal = undefined;
  }

}