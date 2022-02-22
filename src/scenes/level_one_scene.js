import Phaser from 'phaser'
import { ScrollingXCamara } from '../cameras/scrolling_x_camara';
import Player from '../sprites/player';

export default class LevelOneScene extends Phaser.Scene
{
  constructor() {
    super('Primer Nivel')
  }

  preload() {
    this.load.image('bg', 'assets/fondo-infinito.jpg');
    this.load.spritesheet('player', 'assets/player.png', {frameWidth: 180, frameHeight: 180});
    this.load.image('tileset', './assets/tiles.png');
    this.load.tilemapTiledJSON('lvl-1', 'assets/map.json');
  }

  create() {
    this.add.sprite(480, 320, 'bg');
    const map = this.make.tilemap({key: 'lvl-1'});
    const tiles = map.addTilesetImage('tiles', 'tileset'); 
    const bg = map.createLayer('backgroundLayer',tiles);
    this.collisionLayer = map.createLayer('collisionLayer', tiles);
    
    let playerFormTiled = this.findObjectsByType(
        "player",
        map.getObjectLayer("objectsLayer"),
        map.tileHeight
    );

    this.player = new Player(this, playerFormTiled[0].x, playerFormTiled[0].y, "player");

    this.collisionLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.collisionLayer);
    const ground = map.createLayer("hierbaLayer", tiles).setDepth(100);


    //this.cameras.add(new ScrollingXCamara(this.cameras.main.x, this.cameras.main.y, 960, 640, this.player.x, 410));
    this.cameras.main.setSize(960, 640);
    this.cameras.main.scrollX =  this.player.x - 410;
  }

  update() {
    this.player.update();
    this.cameras.main.scrollX =  this.player.x - 410;
  }

  /**
   * @param {string} type
   * @param {Phaser.Tilemaps.ObjectLayer} objectsLayer
   * @param {number} tileHeight
   * @returns {Phaser.Types.Tilemaps.TiledObject[]}
   */
  findObjectsByType(type, objectsLayer, tileHeight) {
    const result = [];

    objectsLayer.objects.forEach((element) => {
      if(element.type === type) {
        element.y -= tileHeight;
        result.push(element);
      }
    });

    return result;
  }
}
