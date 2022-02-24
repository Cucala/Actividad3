import Phaser from 'phaser'

import LevelOneScene from './scenes/level_one_scene'

const config = {
	type: Phaser.AUTO,
	width: 960,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [LevelOneScene]
}

export default new Phaser.Game(config)
