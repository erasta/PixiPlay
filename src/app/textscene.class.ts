import { Button } from '@app/button.class';
import { Scene } from './game.class';
import { Container } from 'pixi.js';

// Object which can be either text or image, to be aggregated in a list and given to TextFusion.
class TextMix {
    isImage: boolean;
    content: string;
    constructor(_isImage: boolean, _content: string) {
        this.isImage = _isImage;
        this.content = _content;
    }
}

// Tool for showing concatenated images and text lists with font size normalizing
// The tool reuses the sprites and text objects for less allocations
class TextFusion {
    container: Container = new Container();
    texts: PIXI.Text[] = [];
    images: PIXI.Sprite[] = [];
    width: number;

    show(mix: TextMix[], fontSize: number) {

        // Going over the mix of texts and images
        let textIndex = -1;
        let imageIndex = -1;
        this.width = 0;
        mix.forEach(m => {
            if (m.isImage) {

                // When image: reusing sprite object with the texture if one exists or creating a new one
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

                // adjusting the image size to the fontSize
                this.images[imageIndex].width = fontSize * ratio;
                this.images[imageIndex].height = fontSize;

                // accumulating the objects width for putting on the next one in correct position
                this.images[imageIndex].x = this.width;
                this.width += this.images[imageIndex].width + 10;

            } else {

                // When text: reusing text object if one exists or creating a new one
                textIndex++;
                if (textIndex >= this.texts.length) {
                    const currText = new PIXI.Text(m.content);
                    this.texts.push(currText);
                    this.container.addChild(currText);
                } else {
                    this.texts[textIndex].text = m.content;
                    this.texts[textIndex].visible = true;
                }

                // accumulating the objects width for putting on the next one in correct position
                this.texts[textIndex].style.fontSize = fontSize;
                this.texts[textIndex].x = this.width;
                this.width += this.texts[textIndex].width + 10;

            }
        });

        // removing access width that was added to last object
        if (mix.length !== 0) {
            this.width -= 10;
        }

        // changing all the remaining unused text and sprite object to invisible
        for (textIndex++; textIndex < this.texts.length; textIndex++) {
            this.texts[textIndex].visible = false;
        }
        for (imageIndex++; imageIndex < this.images.length; imageIndex++) {
            this.images[imageIndex].visible = false;
        }
    }
}

// Generating random text and images
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
        // Back button
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);

        // text and image fusion object
        this.fusion = new TextFusion();
        this.container.addChild(this.fusion.container);
    }

    // random text as a number or lorem ipsum
    randText(): string {
        if (Math.random() < 0.3) {
            return (Math.floor(Math.random() * 10000) / 100).toString();
        } else {
            return this.words[Math.floor(Math.random() * this.words.length)];
        }
    }

    // creating a random text or image from the icon list
    randMixItem(): TextMix {
        if (Math.random() < 0.5) {
            return new TextMix(false, this.randText());
        } else {
            return new TextMix(true, this.game.icons[Math.floor(Math.random() * this.game.icons.length)]);
        }
    }

    // creating a random list of text/image with a random length between 2 to 8 objects
    randMix(): TextMix[] {
        const num = Math.floor(Math.random() * 7 + 2);
        return new Array(num).fill(0).map(() => { return this.randMixItem(); });
    }

    tick(): void {
        // every two seconds
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
        if (this.currTime - 2 < this.lastTime) return;
        this.lastTime = this.currTime;

        // showing the random text mix in the middle of the screen
        this.fusion.show(this.randMix(), Math.floor(Math.random() * 80) + 10);
        this.fusion.container.x = window.innerWidth / 2 - this.fusion.width / 2;
        this.fusion.container.y = window.innerHeight / 2 - this.fusion.container.height / 2;
    }
}
