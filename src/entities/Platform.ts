import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../constants';

export class Platform extends Phaser.GameObjects.Rectangle {
    constructor(scene: Phaser.Scene, x: number, y: number, color: number) {
        super(scene, x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }
}
