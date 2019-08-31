import { Button } from '@app/button.class';
import { Game, Scene } from './game.class';

export class ButtonsScene extends Scene {

    constructor(game: Game) {
        super(game, "buttons");
    }

    setup(): void {
        this.container.addChild(
            new Button("Cards", 100, 200, () => { this.game.changeScene("cards"); }).obj,
            new Button("Text", 150, 200, () => { alert('Text') }).obj,
            new Button("Fire", 200, 200, () => { alert('Fire') }).obj);
    }
}