import Phaser from 'phaser';

import { levels } from './levels';
import {
    MOVE_SPEED,
    JUMP_SPEED,
    PLAYER_HEIGHT,
    PLAYER_WIDTH,
} from './constants';
import { Player } from './entities/Player';

class GameScene extends Phaser.Scene {
    private player1!: Phaser.GameObjects.Rectangle;
    private player1Keys!: {
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        up: Phaser.Input.Keyboard.Key;
    };
    private player2!: Phaser.GameObjects.Rectangle;
    private player2Keys!: {
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        up: Phaser.Input.Keyboard.Key;
    };

    private platforms!: Phaser.GameObjects.Rectangle[];
    private exit!: Phaser.GameObjects.Rectangle;
    private currentLevel = 0;

    constructor() {
        super('GameScene');
    }

    create() {
        const levelData = levels[this.currentLevel];

        this.platforms = [];

        levelData.platforms.forEach((p) => {
            const platform = this.add.rectangle(
                p.x,
                p.y,
                p.width,
                p.height,
                0x444444
            );
            this.physics.add.existing(platform, true);
            this.platforms.push(platform);
        });

        this.exit = this.add.rectangle(
            levelData.exit.x,
            levelData.exit.y,
            PLAYER_WIDTH * 2,
            PLAYER_HEIGHT,
            0x00ff00
        );
        this.physics.add.existing(this.exit, true);

        this.player1 = new Player(
            this,
            levelData.player1Start.x,
            levelData.player1Start.y,
            0xffaaff,
            {
                left: this.input.keyboard!.addKey(
                    Phaser.Input.Keyboard.KeyCodes.A
                ),
                right: this.input.keyboard!.addKey(
                    Phaser.Input.Keyboard.KeyCodes.D
                ),
                up: this.input.keyboard!.addKey(
                    Phaser.Input.Keyboard.KeyCodes.W
                ),
            }
        );
        this.player2 = new Player(
            this,
            levelData.player2Start.x,
            levelData.player2Start.y,
            0xffffaa,
            {
                left: this.input.keyboard!.addKey(
                    Phaser.Input.Keyboard.KeyCodes.LEFT
                ),
                right: this.input.keyboard!.addKey(
                    Phaser.Input.Keyboard.KeyCodes.RIGHT
                ),
                up: this.input.keyboard!.addKey(
                    Phaser.Input.Keyboard.KeyCodes.UP
                ),
            }
        );

        this.physics.add.collider([this.player1, this.player2], this.platforms);
        this.physics.add.collider(this.player1, this.player2);

        this.physics.add.overlap(
            this.player1,
            this.exit,
            this.reachExit,
            undefined,
            this
        );
        this.physics.add.overlap(
            this.player2,
            this.exit,
            this.reachExit,
            undefined,
            this
        );
    }

    update() {
        this.player1.update();
        this.player2.update();
    }

    private reachExit() {
        console.log('Level complete!');
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
            gravity: { x: 0, y: 500 },
            debug: false,
        },
    },
    scene: GameScene,
};

const game = new Phaser.Game(config);
