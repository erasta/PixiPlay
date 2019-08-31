import { Game } from '@app/game.class';
import { ButtonsScene } from '@app/buttonsscene.class';
import { CardsScene } from '@app/cardsscene.class';

new Game([
    new ButtonsScene(),
    new CardsScene()
]);
