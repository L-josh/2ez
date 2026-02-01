import Phaser from 'phaser';

import { levels } from '../levels';
import { Player } from '../entities/Player';
import { Platform } from '../entities/Platform';
import { Exit } from '../entities/Exit';

export class GameScene extends Phaser.Scene {
    private currentLevel = 0;
    private player1!: Player;
    private player2!: Player;
    private platforms!: Platform[];
    private exit1!: Exit;
    private exit2!: Exit;

    constructor() {
        super('GameScene');
    }

    create() {
        // create level
        const levelData = levels[this.currentLevel];
        this.platforms = [];
        levelData.platforms.forEach((p) => {
            const platform = new Platform(
                this,
                p.x,
                p.y,
                p.width,
                p.height,
                p.color
            );
            this.platforms.push(platform);
        });

        this.exit1 = new Exit(this, levelData.exit1.x, levelData.exit1.y);
        this.exit2 = new Exit(this, levelData.exit2.x, levelData.exit2.y);

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

        // extra controls
        this.input.keyboard!.once('keydown-R', () => {
            this.scene.restart();
        });
    }

    update() {
        this.exit1.isOccupied =
            Phaser.Geom.Intersects.RectangleToRectangle(
                this.player1.getBounds(),
                this.exit1.getBounds()
            ) ||
            Phaser.Geom.Intersects.RectangleToRectangle(
                this.player2.getBounds(),
                this.exit1.getBounds()
            );
        this.exit2.isOccupied =
            Phaser.Geom.Intersects.RectangleToRectangle(
                this.player1.getBounds(),
                this.exit2.getBounds()
            ) ||
            Phaser.Geom.Intersects.RectangleToRectangle(
                this.player2.getBounds(),
                this.exit2.getBounds()
            );

        this.player1.update();
        this.player2.update();

        if (this.exit1.isOccupied && this.exit2.isOccupied) {
            this.completeLevel();
        }
    }

    private completeLevel() {
        console.log('Level complete');
        this.currentLevel++;
        if (this.currentLevel >= levels.length) {
            console.log('Game complete');
            this.currentLevel = 0; // not sure how to handle this yet
        }
        this.scene.restart();
    }
}
