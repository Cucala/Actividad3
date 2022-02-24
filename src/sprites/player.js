/* eslint-disable no-unused-vars */
import Scene from '../scenes/scene';
import Enemy from './enemy';
import Sprite from './sprite';

export default class Player extends Sprite {
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
     * @type {boolean}
     */
    this.stunned = false;
    
    this.setBodySize(90, 180, true);
    
    this.createAnimationWithRepeat("playerWalk", texture, 2, 5, 10, -1);
    this.createAnimationWithRepeat("playerRepose", texture, 0, 1, 4, -1);
    this.createAnimationWithRepeat("playerFall", texture, 6, 7, 7, -1);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.stopMoviment();
    if(!this.stunned) {
      this.inputHandler();
    }
    this.animation();
  }

  inputHandler() {
    this.moveDown();

    if(this.onFloor()) {
      this.moveUp();
    }

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
        this.activateAnimation('playerFall');
        return;
      }

      if(!this.stunned) {
        if(this.onMoviment()) {
          this.activateAnimation('playerWalk');
          return;
        }

        if(this.onFloor()) {
          this.activateAnimation('playerRepose');
          return;
        }
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
    super.die();  
  }

  beingStunned() {
    this.stunned = true;
    this.setVelocity(-150, -150);
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.wakingUp,
      callbackScope: this
    });
  }

  wakingUp() {
    this.stunned = false;
  }

  /**
   * @returns {boolean}
   */
  canMoveToLeft() {
    return this.body.x <= 0;
  }
}