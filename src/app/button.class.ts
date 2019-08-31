export class Button {
    obj: PIXI.Container;
    message: PIXI.Text;

    constructor(public text: string, yOffset: number, width: number, callback: () => void) {

        this.message = new PIXI.Text(text);

        width = width || this.message.width + 40;
        this.obj = new PIXI.Graphics()
            .lineStyle(4, 0x99CCFF, 1)
            .beginFill(0xFF9933)
            .drawRoundedRect(0, 0, width, this.message.height + 6, 10)
            .endFill();

        this.message.position.set(this.obj.width / 2 - this.message.width / 2, 3);
        this.obj.position.set(window.innerWidth / 2 - this.obj.width / 2, yOffset);
        this.obj.addChild(this.message);

        this.obj.interactive = true;
        this.obj.buttonMode = true;
        this.obj.on('pointerdown', callback)
    }
}
