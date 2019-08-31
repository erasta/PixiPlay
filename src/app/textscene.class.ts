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

    show(mix: TextMix[], size: number) {
        let textIndex = -1;
        let imageIndex = -1;
        let xpos = 0;
        mix.forEach(m => {
            if (m.isImage) {

                imageIndex++;
                const tex = PIXI.Texture.from(m.content);
                if (imageIndex >= this.images.length) {
                    const currImage = new PIXI.Sprite(tex);
                    this.images.push(currImage);
                    this.container.addChild(currImage);
                } else {
                    this.images[imageIndex].texture = tex;
                    this.images[imageIndex].visible = true;
                }
                this.images[imageIndex].width *= this.images[imageIndex].height ? size / this.images[imageIndex].height : 1;
                this.images[imageIndex].height = size;
                this.images[imageIndex].x = xpos;
                xpos += this.images[imageIndex].width + 10;

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
                this.texts[textIndex].style.fontSize = size;
                this.texts[textIndex].x = xpos;
                xpos += this.texts[textIndex].width + 10;

            }
        });

        for (textIndex++; textIndex < this.texts.length; textIndex++) {
            this.texts[textIndex].visible = false;
        }
        for (imageIndex++; imageIndex < this.images.length; imageIndex++) {
            this.images[imageIndex].visible = false;
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
        if (Math.random() < 0.5) {
            return new TextMix(false, this.randText());
        } else {
            return new TextMix(true, this.game.icons[Math.floor(Math.random() * this.game.icons.length)]);
        }
    }

    randMix(): TextMix[] {
        const num = Math.floor(Math.random() * 10);
        return new Array(num).fill(0).map(() => { return this.randMixItem(); });
    }

    tick(): void {
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        if (this.currTime - 2 < this.lastTime) return;
        this.lastTime = this.currTime;
        this.fusion.show(this.randMix(), Math.floor(Math.random() * 50) + 10);
        this.fusion.container.x = window.innerWidth / 2 - this.fusion.container.width / 2;
        this.fusion.container.y = window.innerHeight / 2 - this.fusion.container.height / 2;
    }
}
