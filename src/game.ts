import Phaser from 'phaser';

import { levels } from './levels';
import { PLAYER_SPEED, JUMP_VELOCITY, PLAYER_HEIGHT, PLAYER_WIDTH } from './constants';

class GameScene extends Phaser.Scene {
    private player1!: Phaser.GameObjects.Rectangle;
    private player1Keys!: {
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        up: Phaser.Input.Keyboard.Key;
    }
    private player2!: Phaser.GameObjects.Rectangle;
    private player2Keys!: {
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        up: Phaser.Input.Keyboard.Key;
    }

    private platforms!: Phaser.GameObjects.Rectangle[];
    private exit!: Phaser.GameObjects.Rectangle;
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

        this.exit = this.add.rectangle(
            levelData.exit.x,
            levelData.exit.y,
            PLAYER_WIDTH*2, PLAYER_HEIGHT, 0x00ff00
        )
        this.physics.add.existing(this.exit, true);

        this.player1 = this.add.rectangle(
            levelData.player1Start.x,
            levelData.player1Start.y,
            PLAYER_WIDTH, PLAYER_HEIGHT, 0xffaaff
        )
        this.player2 = this.add.rectangle(
            levelData.player2Start.x,
            levelData.player2Start.y,
            PLAYER_WIDTH, PLAYER_HEIGHT, 0xffffaa
        )
        
        this.physics.add.existing(this.player1);
        (this.player1.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        this.physics.add.existing(this.player2);
        (this.player2.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
        
        this.player1Keys = {
            left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        };
        this.player2Keys = {
            left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        };

        this.physics.add.collider([this.player1, this.player2], this.platforms);
        this.physics.add.collider(this.player1, this.player2);

        this.physics.add.overlap(this.player1, this.exit, this.reachExit, undefined, this);
        this.physics.add.overlap(this.player2, this.exit, this.reachExit, undefined, this);
    }

    update() {
        let velocityXOne = 0;
        if (this.player1Keys.left.isDown) {
            velocityXOne = -300
        }
        if (this.player1Keys.right.isDown) {
            velocityXOne = 300
        }
        (this.player1.body as Phaser.Physics.Arcade.Body).setVelocityX(velocityXOne);

        if (this.player1Keys.up.isDown && (this.player1.body as Phaser.Physics.Arcade.Body).touching.down) {
            (this.player1.body as Phaser.Physics.Arcade.Body).setVelocityY(-430);
        }

        let velocityXTwo = 0;
        if (this.player2Keys.left.isDown) {
            velocityXTwo = -300
        }
        if (this.player2Keys.right.isDown) {
            velocityXTwo = 300
        }
        (this.player2.body as Phaser.Physics.Arcade.Body).setVelocityX(velocityXTwo);

        if (this.player2Keys.up.isDown && (this.player2.body as Phaser.Physics.Arcade.Body).touching.down) {
            (this.player2.body as Phaser.Physics.Arcade.Body).setVelocityY(-430);
        }
    }

    private reachExit() {
        console.log('Level complete!')
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
            gravity: { x: 0, y: 500},
            debug: false      
        }
    },
    scene: GameScene
};

const game = new Phaser.Game(config);
