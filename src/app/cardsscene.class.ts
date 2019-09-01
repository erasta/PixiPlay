import { Sprite, Point, Container } from 'pixi.js';
import { Button } from '@app/button.class';
import { Scene } from './game.class';

const cardsNumber = 144;

class Card {
    container: Container;
    sprite: Sprite;
    start: Point;
    target: Point;
    startTime: number;
    switched: boolean = false;
    num: number;
    constructor(name: string, theNum: number, theContainer: Container) {
        this.container = theContainer;
        this.num = theNum;

        // Start and target positions of card by its number
        this.start = new Point(this.num * 1 + window.innerWidth * 0.75 - 72, this.num * 5 + 50);
        this.target = new Point(((cardsNumber - 1) - this.num) * 1 + window.innerWidth * 0.25 - 72, ((cardsNumber - 1) - this.num) * 5 + 50);
        this.startTime = this.num;

        // Creating the card's sprite from a random texture on a texture atlas and changing its tint for distinctability
        this.sprite = new Sprite(PIXI.Texture.from(name));
        this.sprite.tint = Math.random() * 0xFFFFFF;
        // const val = id < 10 ? `0${id}` : id;
        // this.sprite = new Sprite(PIXI.Texture.from(`rollSequence00${val}.png`));

        // Normalizing card's size and adding it to container
        this.sprite.width = 50;
        this.sprite.height = 70;
        this.sprite.position.copy(this.start);
        this.container.addChild(this.sprite);
    }

    move(currTime: number) {
        // Update card position by linear interpolation between start and target
        // Doing this at all times, otherwise when changing tabs, the cards are left in mid air
        const t = Math.max(0, Math.min(1, (currTime - this.startTime) / 2));
        // if (t < 0 || t > 1) return;
        this.sprite.x = this.start.x + t * (this.target.x - this.start.x);
        this.sprite.y = this.start.y + t * (this.target.y - this.start.y);

        // Flipping card's z-index when moving to the other pack, so they are correctly ordered.
        // This is done by changing their position on the container children.
        // For higher performance this is done by substitute the dummy sprites we allocated at the beginning
        if (!this.switched && this.sprite.x < innerWidth / 2) {
            this.switched = true;
            this.container.setChildIndex(this.sprite, cardsNumber + this.num);
        }
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

        // Create all the cards in their starting positions
        this.cards = [];
        for (let i = cardsNumber - 1; i >= 0; i--) {
            const card = new Card(this.names[Math.floor(Math.random() * this.names.length)], i, this.container);
            this.cards.push(card);
        }

        // Make the container's children array bigger
        for (let i = 0; i < cardsNumber; i++) {
            const dummySprite = new Sprite();
            dummySprite.visible = false;
            this.container.addChild(dummySprite);
        }

        // Back to menu button
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);
    }

    // When reverting to this scene, restart all the cards positions
    reset() {
        this.container.removeChildren();
        this.setup();
    }

    tick(): void {
        // Aggregate the current time by the delta ms
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;

        // Tried to optimize using this, but there was no need, it was working fast enough
        // const ctf = Math.floor(this.currTime);
        // for (let i = Math.max(0, ctf - 3), il = Math.min(ctf + 4, this.cards.length); i < il; ++i) {

        // update the cards position by the current time
        for (let i = 0, il = this.cards.length; i < il; ++i) {
            this.cards[i].move(this.currTime);
        }
    }
}
