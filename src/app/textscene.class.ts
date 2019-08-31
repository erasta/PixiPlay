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
        let textIndex = -1;
        let xpos = 0;
        mix.forEach(m => {
            if (m.isImage) {

            } else {
                textIndex++;
                if (textIndex >= this.texts.length) {
                    const currText = new PIXI.Text(m.content);
                    this.texts.push(currText);
                    this.container.addChild(currText);
                } else {
                    this.texts[textIndex].text = m.content;
                    this.texts[textIndex].visible = true;
                }
                this.texts[textIndex].x = xpos;
                xpos += this.texts[textIndex].width + 10;
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

    randMixItem(): TextMix {
        return new TextMix(false, this.randText());
    }

    randMix(): TextMix[] {
        const num = Math.floor(Math.random() * 10);
        return new Array(num).fill(0).map(() => { return this.randMixItem(); });
    }

    tick(): void {
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        if (this.currTime - 2 < this.lastTime) return;
        this.lastTime = this.currTime;
        this.fusion.show(this.randMix());//, 10);
        this.fusion.container.x = window.innerWidth / 2 - this.fusion.container.width / 2;
        this.fusion.container.y = window.innerHeight / 2 - this.fusion.container.height / 2;
    }
}
