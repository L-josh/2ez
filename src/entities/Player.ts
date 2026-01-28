import { Scene } from 'phaser';
import {
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    MOVE_SPEED,
    JUMP_SPEED,
} from '../constants';

type PlayerKeys = {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
};

export class Player extends Phaser.GameObjects.Rectangle {
    private keys: PlayerKeys;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        color: number,
        keys: PlayerKeys
    ) {
        super(scene, x, y, PLAYER_WIDTH, PLAYER_HEIGHT, color);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.physicsBody.setCollideWorldBounds(true);
        this.keys = keys;
    }

    update() {
        let velocityX = 0;
        if (this.keys.left.isDown) {
            velocityX = -MOVE_SPEED;
        }
        if (this.keys.right.isDown) {
            velocityX = MOVE_SPEED;
        }
        this.physicsBody.setVelocityX(-MOVE_SPEED);
        if (this.keys.up.isDown && this.physicsBody.touching.down) {
            this.physicsBody.setVelocityY(JUMP_SPEED);
        }
    }

    private get physicsBody(): Phaser.Physics.Arcade.Body {
        return this.body as Phaser.Physics.Arcade.Body;
    }
}
