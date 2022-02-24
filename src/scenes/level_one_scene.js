/* eslint-disable no-unused-vars */
import ScrollingCamaraInX from '../cameras/scrolling_camara_in_x';
import AntEnemy from '../sprites/ant_enemy';
import EnemyFactory from '../sprites/enemy_factory';
import Player from '../sprites/player';
import Scene from './scene';

export default class LevelOneScene extends Scene
{
  constructor() {
    super('Primer Nivel')
  }

  preload() {
    this.load.image('bg', 'assets/fondo-infinito.jpg');
    this.load.image('goal', 'assets/meta.png');
    this.load.spritesheet(
      'player',
      'assets/player.png',
      {frameWidth: 180, frameHeight: 180}
    );
    this.load.spritesheet(
      'ant',
      'assets/hormiga.png',
      {frameWidth: 192, frameHeight: 96}
    );
    this.load.spritesheet(
      'caterpillar',
      'assets/oruga.png',
      {frameWidth: 96, frameHeight: 192}
    );
    this.load.spritesheet(
      'wasp',
      'assets/avispa.png',
      {frameWidth: 128, frameHeight: 128}
    );
    this.load.spritesheet(
      'crash',
      'assets/crash.png',
      {frameWidth: 199, frameHeight: 200}
    );
    this.load.image('tileset', './assets/tiles.png');
    this.load.tilemapTiledJSON('lvl-1', 'assets/map.json');
  }

  create() {
    this.add.sprite(480, 320, 'bg').setScrollFactor(0);
    
    const map = this.make.tilemap({key: 'lvl-1'});
    const tiles = map.addTilesetImage('tiles', 'tileset');

    
    const bg = map.createLayer('backgroundLayer',tiles);
    this.collisionLayer = map.createLayer('collisionLayer', tiles);
    this.collisionLayer.setCollisionByExclusion([-1]);

    let playerFormTiled = this.findObjectsByType(
        "player",
        map.getObjectLayer("objectsLayer"),
        map.tileHeight
    );
    this.player = new Player(this, playerFormTiled[0].x, playerFormTiled[0].y, "player");

    const ground = map.createLayer("hierbaLayer", tiles).setDepth(100);

    const enemies = EnemyFactory.create(
      this,
      map.getObjectLayer("objectsLayer"),
      this.physics.add.group({
        classType: AntEnemy,
        runChildUpdate: true
      }),
      map.tileHeight
    );
    this.physics.add.overlap(this.player, enemies, this.player.checkEnemyCollision, null, this.player);

    this.scrollingCamera = new ScrollingCamaraInX(this, 3520, 640, this.player.x, 412);
  }

  update() {
    this.player.update();
    this.scrollingCamera.update(this.player.x);
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
