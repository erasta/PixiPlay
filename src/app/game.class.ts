import { Application, loader, Container } from 'pixi.js';

// Scene interface
export class Scene {
    game: Game;
    name: string;
    container: Container = new PIXI.Container();
    setup(): void { }
    reset(): void { }
    tick(): void { };
    constructor(theName: string) {
        this.name = theName;
    }
}

// Game class
export class Game {
    app: Application;
    scenes: Scene[];
    currScene: Scene;
    icons: string[] = [
        "assets/face.png",
        "assets/blob.png",
        "assets/cat.png",
        "assets/dollar.png"
    ];

    constructor(theScenes: Scene[]) {
        this.scenes = theScenes;

        // instantiate app
        this.app = new Application(window.innerWidth, window.innerHeight, {
            backgroundColor: 0x1099bb // light blue
        });

        // create view in DOM
        document.body.appendChild(this.app.view);

        // Fullscreen
        this.app.renderer.view.style.top = "0px";
        this.app.renderer.view.style.left = "0px";
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;

        // Loading textures and starting setup afterwards
        loader
            .add("assets/monsters.json")
            .add(this.icons)
            .load(this.setup.bind(this));
    }

    // When changing scenes make all other scenes invisible and resetting the current scene
    public changeScene(sceneName: string): void {
        this.scenes.forEach(scene => scene.container.visible = scene.name === sceneName);
        this.currScene = this.scenes.find(scene => scene.container.visible);
        this.currScene.reset();
    }

    setup(): void {
        // Showing FPS
        const fps = new PIXI.Text('0.0', { fontSize: 15, fill: 'lightgreen' });
        this.app.stage.addChild(fps);

        // Setup for each scene and adding its container to the stage
        this.scenes.forEach(scene => {
            scene.game = this;
            scene.setup();
            this.app.stage.addChild(scene.container);
        });

        // Starting with buttons menu scene, all others will be invisible
        this.changeScene("buttons");

        // Every tick, showing the FPS and updating the current scene
        this.app.ticker.add(() => {
            fps.text = 'FPS: ' + (Math.round(this.app.ticker.FPS * 10000) / 10000).toString();

            this.currScene.tick();
        });
    }
}
