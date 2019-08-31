import { Button } from '@app/button.class';
import { Scene } from './game.class';
/// <reference path="node_modules/pixi-particles/ambient.d.ts" />
import * as particles from 'pixi-particles-latest';
// import particles = require('pixi-particles');
// require('pixi-particles');

// import 'pixi-particles';

export class FireScene extends Scene {

    // currTime: number = 0;
    emitter:particles. Emitter;

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
            [PIXI.Texture.fromImage('assets/blob.png')],

            // Emitter configuration, edit this to change the look
            // of the emitter
            {
                alpha: {
                    list: [
                        {
                            value: 0.8,
                            time: 0
                        },
                        {
                            value: 0.1,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                scale: {
                    list: [
                        {
                            value: 1,
                            time: 0
                        },
                        {
                            value: 0.3,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                color: {
                    list: [
                        {
                            value: "fb1010",
                            time: 0
                        },
                        {
                            value: "f5b830",
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                speed: {
                    list: [
                        {
                            value: 200,
                            time: 0
                        },
                        {
                            value: 100,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                startRotation: {
                    min: 0,
                    max: 360
                },
                rotationSpeed: {
                    min: 0,
                    max: 0
                },
                lifetime: {
                    min: 0.5,
                    max: 0.5
                },
                frequency: 0.008,
                spawnChance: 1,
                particlesPerWave: 1,
                emitterLifetime: 0.31,
                maxParticles: 1000,
                pos: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 0,
                    y: 0,
                    r: 10
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
