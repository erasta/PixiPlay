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
        // this.app.renderer.resize(window.innerWidth, window.innerHeight);

        // preload needed assets
        // loader.add('samir', '/assets/img/hero.png');

        // then launch app
        loader.load(this.setup.bind(this));
    }

    setup(): void {
        const button = new Button("Hello Pixi!", 100, () => {alert('hello')});
        // let roundBox = new PIXI.Graphics().lineStyle(4, 0x99CCFF, 1).beginFill(0xFF9933)
        //     .drawRoundedRect(0, 0, message.width + 40, message.height + 6, 10)
        //     .endFill();
        // roundBox.position.set(window.innerWidth / 2 - roundBox.width / 2, 100);
        // message.position.set(20,3);
        // roundBox.addChild(message);
        this.app.stage.addChild(button.obj);
        // append hero
        // const hero = new Character(loader.resources['samir'].texture);
        // const heroSprite = hero.sprite;
        // this.app.stage.addChild(heroSprite);
        // heroSprite.y = 300;

        // //  animate hero
        // let moveLeft = true;
        // this.app.ticker.add(() => {
        //     const speed = 2;
        //     if (heroSprite.x < this.app.view.width && moveLeft) {
        //         heroSprite.x += speed;
        //     } else {
        //         heroSprite.x -= speed;
        //         moveLeft = heroSprite.x <= 0;
        //     }
        // });
    }
}

new Game();
