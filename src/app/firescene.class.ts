import { Button } from '@app/button.class';
import { Scene } from './game.class';

export class FireScene extends Scene {

    currTime: number = 0;

    constructor() {
        super("fire");
    }

    setup(): void {
        this.container.addChild(new Button("Back", 50, 0, () => { this.game.changeScene("buttons"); }).obj);
    }

    tick(): void {
        this.currTime += this.game.app.ticker.elapsedMS / 1000.0;
    }
}
