import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   */
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setBodySize(90, 180, true);

    this.scene.anims.create(
      {
        key: 'walk',
        frames: this.scene.anims.generateFrameNumbers(texture, {start: 2, end: 5}),
        frameRate: 10,
        repeat: -1,
      }
    );

    this.scene.anims.create(
      {
        key: 'repose',
        frames: this.scene.anims.generateFrameNumbers(texture, {start: 0, end: 1}),
        frameRate: 4,
        repeat: -1,
      }
    );

    this.scene.anims.create(
      {
        key: 'fall',
        frames: this.scene.anims.generateFrameNumbers(texture, {start: 6, end: 7}),
        frameRate: 7,
        repeat: -1,
      }
    );

    this.setCollideWorldBounds(true);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

  }

  update() {
    this.inputHandler();
    this.animation();
  }

  inputHandler() {
    this.moveDown();

    if(this.onFloor()) {
      this.moveUp();
      this.moveLeft();
      this.moveRight();
    }
  }

  animation() {
    if(this.onAir()) {
      this.play('fall', true);
      return;
    }

    if(this.onMoviment()) {
      this.play('walk', true);
      return;
    }

    if(this.onFloor()) {
      this.play('repose', true);
      return;
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
    if(this.cursors.left.isDown) {
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
  onAir() {
    return this.body.velocity.y != 0;
  }
}