import { Game } from '@app/game.class';
import { ButtonsScene } from '@app/buttonsscene.class';
import { CardsScene } from '@app/cardsscene.class';

const game = new Game();
game.scenes = [
    new ButtonsScene(game),
    new CardsScene(game)
];
game.init();
