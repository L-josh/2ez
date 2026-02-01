import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add
            .text(width / 2, height / 3, '2EZ', {
                fontSize: '64px',
                color: '#ffffff',
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, height / 2, 'Press SPACE to start!', {
                fontSize: '32px',
                color: '#ffffff',
            })
            .setOrigin(0.5);

        this.input.keyboard!.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}
