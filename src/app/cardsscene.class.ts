import { Sprite, Point } from 'pixi.js';
import { Button } from '@app/button.class';
import { Scene } from './game.class';

class Card {
    sprite: Sprite;
    start: Point;
    target: Point;
    startTime: number;
    constructor(name: string, num: number) {
        // const val = id < 10 ? `0${id}` : id;
        // this.sprite = new Sprite(PIXI.Texture.from(`rollSequence00${val}.png`));
        this.sprite = new Sprite(PIXI.Texture.from(name));
        this.sprite.tint = Math.random() * 0xFFFFFF;

        this.sprite.width = 50;
        this.sprite.height = 70;
        this.start = new Point(num * 1 + window.innerWidth * 0.75 - 72, num * 5 + 50);
        this.target = new Point((143 - num) * 1 + window.innerWidth * 0.25 - 72, (143 - num) * 5 + 50);
        this.startTime = num;
        this.sprite.position.copy(this.start);
    }

    move(currTime: number) {
        const t = (currTime - this.startTime) / 2;
        if (t < 0 || t > 1) return;
        this.sprite.x = this.start.x + t * (this.target.x - this.start.x);
        this.sprite.y = this.start.y + t * (this.target.y - this.start.y);
    }
}

export class CardsScene extends Scene {

    cards: Card[];
    currTime: number = 0;
    names: string[] = [
        "eggHead.png",
        "flowerTop.png",
        "helmlok.png",
        "skully.png"
    ];

    constructor() {
        super("cards");
    }

    setup(): void {
        this.currTime = 0;
        this.cards = [];
        for (let i = 0; i < 144; i++) {
            const card = new Card(this.names[Math.floor(Math.random() * this.names.length)], i);
            this.cards.push(card);
            this.container.addChild(card.sprite);
        }
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);
    }

    reset() {
        this.container.removeChildren();
        this.setup();
    }

    tick(): void {
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        const ctf = Math.floor(this.currTime);
        for (let i = Math.max(0, ctf - 3), il = Math.min(ctf + 4, this.cards.length); i < il; ++i) {
            this.cards[i].move(this.currTime);
        }
    }
}
