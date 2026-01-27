import Phaser from 'phaser';

import { levels } from './levels';

class GameScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Rectangle;
    private platforms!: Phaser.GameObjects.Rectangle[];
    private currentLevel = 0;

    constructor() {
        super('GameScene')
    }

    create() {
        const levelData = levels[this.currentLevel];

        this.platforms = [];

        levelData.platforms.forEach(p => {
            const platform = this.add.rectangle(p.x, p.y, p.width, p.height, 0x444444);
            this.physics.add.existing(platform, true);
            this.platforms.push(platform);
        });

        this.player = this.add.rectangle(
            levelData.playerStart.x,
            levelData.playerStart.y,
            32, 32, 0xffffff
        )
        this.physics.add.existing(this.player);
        (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);
    }

    update() {

    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1b1b1b',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300},
            debug: false      
        }
    },
    scene: GameScene
};

const game = new Phaser.Game(config);
