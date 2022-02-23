// eslint-disable-next-line no-unused-vars
import Scene from "../scenes/scene";
import Enemy from "./enemy";

export default class AntEnemy extends Enemy {
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
    super(scene, x, y, width, height, textureName, tileHeight);
    
    this.createAnimationWithRepeat("antWalk", 'ant', 0, 3, 10, -1);

    this.activateAnimation("antWalk");
  }
}