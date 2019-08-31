import { Application, loader, Container, Sprite, Point } from 'pixi.js';
import { Button } from '@app/button.class';

class Scene {
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

class Card {
    sprite: Sprite;
    start: Point;
    target: Point;
    startTime: number;
    constructor(id: number, num: number) {
        const val = id < 10 ? `0${id}` : id;
        this.sprite = new Sprite(PIXI.Texture.from(`rollSequence00${val}.png`));
        this.sprite.width = 50;
        this.sprite.height = 70;
        this.start = new Point(num * 2 + 100, num * 5 + 50);
        this.target = new Point((143 - num) * 2 + 500, (143 - num) * 5 + 50);
        this.startTime = num;
        this.sprite.position.copy(this.start);
    }

    move(currTime: number) {
        const t = (currTime - this.startTime) / 2;
        if (t < 0 || t > 1) return;
        this.sprite.position.set(this.start.x + t * (this.target.x - this.start.x), this.start.y + t * (this.target.y - this.start.y));
    }
}

class CardsScene extends Scene {

    cards: Card[];
    currTime: number = 0;

    constructor(game: Game) {
        super(game, "cards");
    }

    setup(): void {
        this.cards = [];
        for (let i = 0; i < 144; i++) {
            const card = new Card(Math.floor(Math.random() * 30), i);
            this.cards.push(card);
            this.container.addChild(card.sprite);
        }
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);
    }

    tick(): void {
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        this.cards.forEach(c => c.move(this.currTime));
    }
}

class Game {
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

        this.app.ticker.add(() => {
            fps.text = 'FPS: ' + (Math.round(this.app.ticker.FPS * 10000) / 10000).toString();

            this.currScene.tick();
        });
    }
}

new Game();
