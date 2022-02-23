import Phaser from 'phaser';
// eslint-disable-next-line no-unused-vars
import Scene from '../scenes/scene';
// eslint-disable-next-line no-unused-vars
import Enemy from './enemy';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  
  /**
   * @param {Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   */
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)

    /**
     * @type {boolean}
     */
    this.alive = true;

    /**
     * @type {Scene}
     */
    this.scene = scene;
    this.scene.physics.add.collider(this, this.scene.collisionLayer);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setBodySize(90, 180, true);
    

    this.scene.anims.create(
      {
        key: 'playerWalk',
        frames: this.scene.anims.generateFrameNumbers(
          texture,
          {start: 2, end: 5}
        ),
        frameRate: 10,
        repeat: -1,
      }
    );

    this.scene.anims.create(
      {
        key: 'playerRepose',
        frames: this.scene.anims.generateFrameNumbers(
          texture,
          {start: 0, end: 1}
        ),
        frameRate: 4,
        repeat: -1,
      }
    );

    this.scene.anims.create(
      {
        key: 'playerFall',
        frames: this.scene.anims.generateFrameNumbers(
          texture,
          {start: 6, end: 7}
        ),
        frameRate: 7,
        repeat: -1,
      }
    );

    this.on('animationcomplete', this.isDead, this)

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.stopMoviment();
    this.inputHandler();
    this.animation();
  }

  inputHandler() {
    this.moveDown();

    //if(this.onFloor()) {
      this.moveUp();
    //}

    if(this.onFloor() || !this.flipX) {
      this.moveRight();
    }

    if(this.onFloor() || this.flipX) {
      this.moveLeft();
    }
  }

  animation() {
    if(this.alive) {
      if(!this.onFloor()) {
        this.play('playerFall', true);
        return;
      }

      if(this.onMoviment()) {
        this.play('playerWalk', true);
        return;
      }

      if(this.onFloor()) {
        this.play('playerRepose', true);
        return;
      }
    }
  }

  moveUp() {
    if(this.cursors.up.isDown) {
      this.setVelocityY(-250);
    }
  }

  moveDown() {
    if(this.cursors.down.isDown) {
      this.setVelocityY(200);
    }
  }

  moveLeft() {
    if(this.cursors.left.isDown && !this.canMoveToLeft()) {
      this.setVelocityX(-200);
      this.flipX = true;
    }
  }

  moveRight() {
    if(this.cursors.right.isDown) {
      this.setVelocityX(200);
      this.flipX = false;
    }
  }

  stopMoviment() {
    if(this.canMoveToLeft()) {
      this.setVelocityX(0);
    }
  }

  /**
   * @param {Player} player
   * @param {Enemy} enemy
   */  
  checkEnemyCollision(player, enemy) {
    if(!this.onFloor()) {
      enemy.die();
    }
    else {
      this.die()
    }
  }

  die() {
    this.alive = false;
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

  /**
   * @returns {boolean}
   */
  canMoveToLeft() {
    return this.body.x <= 0;
  }
}