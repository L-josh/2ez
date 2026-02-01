import Phaser, { Game } from 'phaser';

import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1b1b1b',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 500 },
            debug: false,
        },
    },
    scene: [MenuScene, GameScene],
};

const game = new Phaser.Game(config);
