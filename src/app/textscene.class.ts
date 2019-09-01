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
    width: number;

    show(mix: TextMix[], size: number) {
        let textIndex = -1;
        let imageIndex = -1;
        this.width = 0;
        mix.forEach(m => {
            if (m.isImage) {

                imageIndex++;
                const tex = PIXI.Texture.from(m.content);
                const ratio = tex.width / tex.height;
                if (imageIndex >= this.images.length) {
                    const currImage = new PIXI.Sprite(tex);
                    this.images.push(currImage);
                    this.container.addChild(currImage);
                } else {
                    this.images[imageIndex].texture = tex;
                    this.images[imageIndex].visible = true;
                }
                this.images[imageIndex].width = size * ratio;
                this.images[imageIndex].height = size;
                this.images[imageIndex].x = this.width;
                this.width += this.images[imageIndex].width + 10;

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
                this.texts[textIndex].x = this.width;
                this.width += this.texts[textIndex].width + 10;

            }
        });
        if (mix.length !== 0) {
            this.width -= 10;
        }

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
    loremIpsum: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate justo ac velit maximus tincidunt. Integer id varius orci, nec feugiat tellus. Nunc lacus ex, posuere in est nec, euismod rhoncus dui. Ut at hendrerit lectus. Fusce maximus ipsum vel aliquet fermentum. Sed eu eros ut urna iaculis pellentesque. Praesent euismod egestas dignissim. Etiam commodo, nisl interdum sodales ultricies, erat odio lacinia purus, in ullamcorper dolor neque eget nisl. Cras sit amet erat nisl. Praesent ultrices lacus sed leo facilisis, non vestibulum elit ullamcorper. Nullam et commodo elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent sed.";
    words: string[];

    constructor() {
        super("text");
        this.words = this.loremIpsum.split(/[ ,.?]/).filter(w => w.length > 0);
    }

    setup(): void {
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);

        this.fusion = new TextFusion();
        this.container.addChild(this.fusion.container);
    }

    randText(): string {
        if (Math.random() < 0.3) {
            return (Math.floor(Math.random() * 10000) / 100).toString();
        } else {
            return this.words[Math.floor(Math.random() * this.words.length)];
        }
    }

    randMixItem(): TextMix {
        if (Math.random() < 0.5) {
            return new TextMix(false, this.randText());
        } else {
            return new TextMix(true, this.game.icons[Math.floor(Math.random() * this.game.icons.length)]);
        }
    }

    randMix(): TextMix[] {
        const num = Math.floor(Math.random() * 7 + 2);
        return new Array(num).fill(0).map(() => { return this.randMixItem(); });
    }

    tick(): void {
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        if (this.currTime - 2 < this.lastTime) return;
        this.lastTime = this.currTime;
        this.fusion.show(this.randMix(), Math.floor(Math.random() * 80) + 10);
        this.fusion.container.x = window.innerWidth / 2 - this.fusion.width / 2;
        this.fusion.container.y = window.innerHeight / 2 - this.fusion.container.height / 2;
    }
}
