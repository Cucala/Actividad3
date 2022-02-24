export default class ScrollingCamaraInX {
    /**
   * @param {Phaser.Scene} scene
   * @param {number} width
   * @param {number} height
   * @param {number} playerPositionInX
   * @param {number} backgroundSizeInX
   */
    constructor(scene, width, height, playerPositionInX, backgroundSizeInX) {
      this.scene = scene;
      this.scene.cameras.main.setBounds(0, 0, width, height);
      this.backgroundSizeInX = backgroundSizeInX;
      this.scene.cameras.main.scrollX =  playerPositionInX - backgroundSizeInX;
    }

    /**
   * @param {number} playerPositionInX
   */
    update(playerPositionInX) {
      if(playerPositionInX < this.backgroundSizeInX) {
        return;
      }
      this.scene.cameras.main.scrollX = playerPositionInX - this.backgroundSizeInX; 
    }
}