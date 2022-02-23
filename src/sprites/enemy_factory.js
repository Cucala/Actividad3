// eslint-disable-next-line no-unused-vars
import Scene from "../scenes/scene";
import AntEnemy from "./ant_enemy";
import CaterpillarEnemy from "./caterpillar_enemy";

export default class EnemyFactory {
  /**
   * @param {Scene} scene
   * @param {Phaser.Tilemaps.ObjectLayer} objectsLayer
   * @param {number} tileHeight
   * @param {Phaser.Physics.Arcade.Group} collisionGroup
   * @returns {Phaser.Physics.Arcade.Group}
   */
  static create(scene, objectsLayer, collisionGroup, tileHeight) {

    objectsLayer.objects.forEach((element) => {
      if(element.type === 'hormigaEnemy') {
        element.y -= tileHeight;
        collisionGroup.add(
          new AntEnemy(
            scene,
            element.x,
            element.y-tileHeight,
            192,
            96,
            'ant',
            tileHeight
          )
        );
      }
      if(element.type === 'orugaEnemy') {
        element.y -= tileHeight;
        collisionGroup.add(
          new CaterpillarEnemy(
            scene,
            element.x,
            element.y-tileHeight,
            96,
            192,
            'caterpillar',
            tileHeight
          )
        );
      }
    });

    return collisionGroup;
  }
}