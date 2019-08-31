import { Button } from '@app/button.class';
import { Scene } from './game.class';
import { Container } from 'pixi.js';

class TextMix {
    isImage: boolean;
    content: string;
    constructor(_isImage: boolean, _content: string) {
        this.isImage = _isImage;
        this.content = _content;
    }
}

class TextFusion {
    container: Container = new Container();
    texts: PIXI.Text[] = [];
    images: PIXI.Sprite[] = [];

    show(mix: TextMix[]) {//}, size: number) {
        // this.container.removeChildren();
        let textIndex = -1;
        console.log(textIndex, '-', this.texts.length);
        mix.forEach(m => {
            if (m.isImage) {

            } else {
                textIndex++;
                if (textIndex >= this.texts.length) {
                    console.log('new');
                    const currText = new PIXI.Text(m.content);
                    this.texts.push(currText);
                    this.container.addChild(currText);
                } else {
                    console.log('reuse');
                    this.texts[textIndex].text = m.content;
                    this.texts[textIndex].visible = true;
                }
            }
        });
        for (textIndex++; textIndex < this.texts.length; textIndex++) {
            this.texts[textIndex].visible = false;
        }
    }
}

export class TextScene extends Scene {

    currTime: number = 0;
    lastTime: number = -1000;
    fusion: TextFusion;

    constructor() {
        super("text");
    }

    setup(): void {
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);

        this.fusion = new TextFusion();
        this.container.addChild(this.fusion.container);
    }

    randText(): string {
        return (Math.floor(Math.random() * 10000) / 100).toString();
    }

    tick(): void {
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        if (this.currTime - 2 < this.lastTime) return;
        this.lastTime = this.currTime;
        this.fusion.show([new TextMix(false, this.randText())]);//, 10);
        this.fusion.container.x = this.game.app.stage.width / 2 - this.fusion.container.width / 2;
        this.fusion.container.y = this.game.app.stage.height / 2 - this.fusion.container.height / 2;
    }
}
