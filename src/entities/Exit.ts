import { BodiesFactory } from 'matter';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../constants';

export class Exit extends Phaser.GameObjects.Rectangle {
    private _isOccupied = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, PLAYER_WIDTH * 1.5, PLAYER_HEIGHT * 1.2, 0xaa0000);
        scene.add.existing(this);

        // we want physics for overlap but don't want to interact w movement
        // scene.physics.add.existing(this, true);
        // const body = this.body as Phaser.Physics.Arcade.StaticBody;
        // body.setSize(PLAYER_WIDTH * 1.5, PLAYER_HEIGHT * 1.2);
    }

    get isOccupied(): boolean {
        return this._isOccupied;
    }

    set isOccupied(value: boolean) {
        this._isOccupied = value;

        if (value) {
            this.setFillStyle(0x00aa00);
        } else {
            this.setFillStyle(0xaa0000);
        }
    }
}
