import { Button } from '@app/button.class';
import { Scene } from './game.class';
/// <reference path="node_modules/pixi-particles/ambient.d.ts" />
import * as particles from 'pixi-particles-latest';
// import particles = require('pixi-particles');
// require('pixi-particles');

// import 'pixi-particles';

export class FireScene extends Scene {

    // currTime: number = 0;
    emitter: particles.Emitter;

    constructor() {
        super("fire");
    }

    setup(): void {
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);

        this.emitter = new particles.Emitter(

            // The PIXI.Container to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the root stage Container
            this.container,

            // The collection of particle images to use
            [
                PIXI.Texture.from('assets/fire.png'),
                PIXI.Texture.from('assets/particle.png'),
                PIXI.Texture.from('assets/smokeparticle.png')
            ],

            // Emitter configuration, edit this to change the look
            // of the emitter

            {
                "alpha": {
                    "start": 0.62,
                    "end": 0
                },
                "scale": {
                    "start": 0.25,
                    "end": 0.75
                },
                "color": {
                    "start": "fff191",
                    "end": "ff622c"
                },
                "speed": {
                    "start": 500,
                    "end": 200
                },
                "startRotation": {
                    "min": 265,
                    "max": 275
                },
                "rotationSpeed": {
                    "min": 50,
                    "max": 50
                },
                "lifetime": {
                    "min": 0.1,
                    "max": 0.75
                },
                "blendMode": "normal",
                "frequency": 0.001,
                "emitterLifetime": 0,
                "maxParticles": 1000,
                "pos": {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": 17
                }
            }
        );

        this.emitter.emit = true;

    }

    tick(): void {
        // this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        this.emitter.update(this.game.app.ticker.elapsedMS / 1000.0);
    }
}
