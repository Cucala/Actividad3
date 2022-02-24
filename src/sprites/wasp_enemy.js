import Phaser from 'phaser';
// eslint-disable-next-line no-unused-vars
import Scene from "../scenes/scene";
import Enemy from "./enemy";

export default class WaspEnemy extends Enemy {
  /**
   * @param {Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} textureName
   * @param {number} tileHeight
   */
  constructor(scene, x, y, textureName, tileHeight) {
    super(scene, x, y, -1, -1, textureName, tileHeight);
    
    /**
     * @type {Phaser.Curves.Ellipse}
     */
    this.flyPath = new Phaser.Curves.Ellipse(x, y, 100, 100);

    /**
     * @type {number}
     */
    this.pathIndex = 0;

    /**
     * @type {number}
     */
    this.velocity = 0.005;

    /**
     * @type {Phaser.Math.Vector2}
     */
    this.pathVector = new Phaser.Math.Vector2();
    this.flyPath.getPoint(0, this.pathVector);
    this.setPosition(this.pathVector.x, this.pathVector.y);

    /**
     * @type {Phaser.Math.Vector2}
     */
    this.startPlace = new Phaser.Math.Vector2(this.pathVector.x, this.pathVector.y);

    /**
     * @type {Phaser.Curves.Ellipse | Phaser.Curves.Line}
     */
    this.path = this.flyPath;

    /**
     * @type {Phaser.Geom.Circle}
     */
    this.patrolCircle = new Phaser.Geom.Circle(0, 0, 256);

    /**
     * @type {Phaser.Curves.Line}
     */
    this.attackPath = new Phaser.Curves.Line([0, 0, 0, 0]);

    /**
     * @type {number}
     */
    this.attackTime = 0;

    this.state = WaspEnemy.FLYING;
    this.createAnimationWithRepeat("waspFly", textureName, 0, 2, 10, -1);
    this.activateAnimation('waspFly');
    
    this.createAnimationFromArray("waspAttack", textureName, [3, 4, 5, 4, 3], 10);

    this.on('animationcomplete', this.attackComplete, this)
  }

  /**
   * @param {Phaser.Animations.Animation} animation
   */
  attackComplete(animation) {
    if (
      this.state === WaspEnemy.ATTACKING
      && animation.key === 'waspAttack'
    ) {
      this.returnToHisPosition();
    }
  }
  
  returnToHisPosition() {
    this.attackPath.p0.set(this.x, this.y);
    this.attackPath.p1.set(this.startPlace.x, this.startPlace.y);
    this.pathIndex = 0;
    this.doingMoviment();
    this.state = WaspEnemy.RETURNING;
    this.activateAnimation('waspFly');
  }

  /**
   * @param {number} time
   * @param {number} delta
   */
  // eslint-disable-next-line no-unused-vars
  update(time, delta) {
    this.lookToPlayer();
    if(this.state === WaspEnemy.FLYING) {
      this.checkPlayer();
    }
    if(this.state === WaspEnemy.FOLLOWING) {
      this.followingPlayer(delta);
    }
    if(this.state === WaspEnemy.RETURNING) {
      this.pathIndex += this.velocity * 2;
      this.continuaVolando();
    }

    this.doingMoviment();
  }

  lookToPlayer() {
    this.flipX = this.x < this.scene.player.x
    ? true
    : false; 
  }

  checkPlayer() {
    this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.velocity, 0, 1);
    this.flyPath.getPoint(this.pathIndex, this.pathVector);
    this.setPosition(this.pathVector.x, this.pathVector.y);
    this.patrolCircle.x = this.x;
    this.patrolCircle.y = this.y;
    this.changeToFollowing();
  }

  changeToFollowing() {
    let player = this.scene.player;

    if(this.patrolCircle.contains(player.x, player.y)) {
      this.attackPath.p0.set(this.x, this.y);
      this.attackPath.p1.set(player.x, player.y);
      this.path = this.attackPath;
      this.pathIndex = 0;
      this.attackTime = 0;
      this.state = WaspEnemy.FOLLOWING;
    }
  }

  /**
   * @param {number} delta
   */
  followingPlayer(delta) {
    this.attackTime += delta;
    this.attackPath.p1.set(
      this.scene.player.x,
      this.scene.player.y
    );

    this.pathIndex += this.velocity * 2;

    if (
      this.scene.physics.overlap(this, this.scene.player)
      && this.state === WaspEnemy.FOLLOWING
    ) {
      this.state = WaspEnemy.ATTACKING;
      this.activateAnimation('waspAttack');
      this.scene.player.beingStunned();
    }
  }

  continuaVolando() {
    if(this.pathIndex >= 1) {
      this.state = WaspEnemy.FLYING;
      this.path = this.flyPath;
      this.pathIndex = 0;
    }
  }

  doingMoviment() {
    this.path.getPoint(this.pathIndex, this.pathVector);
    this.setPosition(this.pathVector.x, this.pathVector.y);
  }
}

WaspEnemy.FLYING    = 0;
WaspEnemy.FOLLOWING = 1;
WaspEnemy.ATTACKING = 2;
WaspEnemy.RETURNING = 3;