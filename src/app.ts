import { Application, loader, Container } from 'pixi.js';
import { Button } from '@app/button.class';

class Scene {
    game: Game;
    name: string;
    container: Container = new PIXI.Container();
    setup(): void { }
    tick(delta: number): void {delta; };
    constructor(theGame: Game, theName: string) {
        this.game = theGame;
        this.name = theName;
    }
}

class ButtonsScene extends Scene {

    constructor(game: Game) {
        super(game, "buttons");
    }

    setup(): void {
        this.container.addChild(
            new Button("Cards", 100, 200, () => { this.game.changeScene("cards"); }).obj,
            new Button("Text", 150, 200, () => { alert('Text') }).obj,
            new Button("Fire", 200, 200, () => { alert('Fire') }).obj);
    }
}

class CardsScene extends Scene {

    constructor(game: Game) {
        super(game, "cards");
    }

    setup(): void {
        const sprites = [];
        for (let i = 0; i < 30; i++) {
            const val = i < 10 ? `0${i}` : i;
            const sprite = new PIXI.Sprite(PIXI.Texture.from(`rollSequence00${val}.png`));
            sprite.position.set(i * 5, i * 10);
            sprites.push(this.container.addChild(sprite));
        }
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);
    }
}

class Game {
    private app: Application;
    private scenes: Scene[];
    private currScene: Scene;

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

        this.scenes = [
            new ButtonsScene(this),
            new CardsScene(this)
        ];

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

        // append hero
        // const hero = new Character(loader.resources['samir'].texture);
        // const heroSprite = hero.sprite;
        // this.app.stage.addChild(heroSprite);
        // heroSprite.y = 300;

        // //  animate hero
        // let moveLeft = true;
        this.app.ticker.add(() => {
            fps.text = 'FPS: ' + (Math.round(this.app.ticker.FPS * 10000) / 10000).toString();

            this.currScene;
            //     const speed = 2;
            //     if (heroSprite.x < this.app.view.width && moveLeft) {
            //         heroSprite.x += speed;
            //     } else {
            //         heroSprite.x -= speed;
            //         moveLeft = heroSprite.x <= 0;
            //     }
        });
    }
}

new Game();
