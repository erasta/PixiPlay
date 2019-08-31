// import { Sprite, Texture, loader } from 'pixi.js';

export class Button {
    obj: PIXI.Container;
    message: PIXI.Text;

    constructor(public text: string, yOffset: number, callback: () => void) {

        this.message = new PIXI.Text(text);
        this.message.position.set(20, 3);

        this.obj = new PIXI.Graphics()
            .lineStyle(4, 0x99CCFF, 1)
            .beginFill(0xFF9933)
            .drawRoundedRect(0, 0, this.message.width + 40, this.message.height + 6, 10)
            .endFill();
        this.obj.position.set(window.innerWidth / 2 - this.obj.width / 2, yOffset);
        this.obj.addChild(this.message);

        this.obj.interactive = true;
        this.obj.buttonMode = true;
        this.obj.on('pointerdown', callback)
    }
}
