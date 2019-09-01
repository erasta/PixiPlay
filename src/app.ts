import { Game } from '@app/game.class';
import { ButtonsScene } from '@app/buttonsscene.class';
import { CardsScene } from '@app/cardsscene.class';
import { TextScene } from '@app/textscene.class';
import { FireScene } from '@app/firescene.class';

// Initiating the game with the scenes.
// Scenes are defined here to avoid cyclic dependency.
new Game([
    new ButtonsScene(),
    new CardsScene(),
    new TextScene(),
    new FireScene()
]);
