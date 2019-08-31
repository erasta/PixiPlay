import { Button } from '@app/button.class';
import { Scene } from './game.class';

export class ButtonsScene extends Scene {

    constructor() {
        super("buttons");
    }

    setup(): void {
        this.container.addChild(
            new Button("Cards", 100, 200, () => { this.game.changeScene("cards"); }).obj,
            new Button("Text", 150, 200, () => { this.game.changeScene("text"); }).obj,
            new Button("Fire", 200, 200, () => { this.game.changeScene("fire"); }).obj);
    }
}