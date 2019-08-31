import { Application, loader, Container } from 'pixi.js';

export class Scene {
    game: Game;
    name: string;
    container: Container = new PIXI.Container();
    setup(): void { }
    tick(): void { };
    constructor(theGame: Game, theName: string) {
        this.game = theGame;
        this.name = theName;
    }
}

export class Game {
    app: Application;
    scenes: Scene[];
    currScene: Scene;

    constructor() {
        // instantiate app
        this.app = new Application(window.innerWidth, window.innerHeight, {
            backgroundColor: 0x1099bb // light blue
        });

        // create view in DOM
        document.body.appendChild(this.app.view);

        this.app.renderer.view.style.top = "0px";
        this.app.renderer.view.style.left = "0px";
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
    }

    public init(): void {
        loader
            .add("/assets/fighter.json")
            .load(this.setup.bind(this));
    }

    public changeScene(sceneName: string): void {
        this.scenes.forEach(scene => {
            scene.container.visible = scene.name === sceneName;
            if (scene.container.visible) {
                this.currScene = scene;
            }
        });
    }

    setup(): void {
        const fps = new PIXI.Text('0.0', { fontSize: 15, fill: 'lightgreen' });
        this.app.stage.addChild(fps);

        this.scenes.forEach(scene => {
            scene.setup();
            this.app.stage.addChild(scene.container);
        });

        this.changeScene("buttons");

        this.app.ticker.add(() => {
            fps.text = 'FPS: ' + (Math.round(this.app.ticker.FPS * 10000) / 10000).toString();

            this.currScene.tick();
        });
    }
}
