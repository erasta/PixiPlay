import { Game } from '@app/game.class';
import { ButtonsScene } from '@app/buttonsscene.class';
import { CardsScene } from '@app/cardsscene.class';
import { TextScene } from '@app/textscene.class';
import { FireScene } from '@app/firescene.class';

new Game([
    new ButtonsScene(),
    new CardsScene(),
    new TextScene(),
    new FireScene()
]);
