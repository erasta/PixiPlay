import { Application, loader } from 'pixi.js';
import { Button } from '@app/button.class';
class Game {
    private app: Application;
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

        // preload needed assets
        // loader.add('samir', '/assets/img/hero.png');

        // then launch app
        loader
            .add("/assets/fighter.json")
            .load(this.setup.bind(this));
    }

    setup(): void {
        const fps = new PIXI.Text('0.0', { fontSize: 15, fill: 'lightgreen' });
        this.app.stage.addChild(fps);
        const buttons = new PIXI.Container()
        buttons.addChild(
            new Button("Cards", 100, 200, () => { buttons.visible = false; cards.visible = true; }).obj,
            new Button("Text", 150, 200, () => { alert('Text') }).obj,
            new Button("Fire", 200, 200, () => { alert('Fire') }).obj);
        this.app.stage.addChild(buttons);

        const cards = new PIXI.Container();
        const sprites = [];
        for (let i = 0; i < 30; i++) {
            const val = i < 10 ? `0${i}` : i;
            const sprite = new PIXI.Sprite(PIXI.Texture.from(`rollSequence00${val}.png`));
            sprite.position.set(i * 5, i * 10);
            sprites.push(cards.addChild(sprite));
        }
        cards.addChild(new Button("Back", 50, 0, () => { buttons.visible = true; cards.visible = false; }).obj);
        cards.visible = false;
        this.app.stage.addChild(cards);


        // append hero
        // const hero = new Character(loader.resources['samir'].texture);
        // const heroSprite = hero.sprite;
        // this.app.stage.addChild(heroSprite);
        // heroSprite.y = 300;

        // //  animate hero
        // let moveLeft = true;
        this.app.ticker.add(() => {
            fps.text = 'FPS: ' + (Math.round(this.app.ticker.FPS * 10000) / 10000).toString();
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
