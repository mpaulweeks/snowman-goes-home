import { Difficulty } from '../utils';
import { Sprites, Gifs } from './sprite';

export const StyleByDifficulty = {
  [Difficulty.Easy]: {
    music: 'music/visager_village_dreaming.mp3',
    ground: Sprites.groundIceWhite,
    overlay: Gifs.snowLoose,
  },
  [Difficulty.Medium]: {
    music: 'music/visager_the_final_road.mp3',
    ground: Sprites.groundIceBlue,
    overlay: Gifs.snowLoose,
  },
  [Difficulty.Hard]: {
    music: 'music/visager_the_great_forest.mp3',
    ground: Sprites.groundIceGray,
    overlay: Gifs.snowLoose,
  },
  [Difficulty.Infinite]: {
    music: 'music/visager_dark_sanctum.mp3',
    ground: Sprites.groundIceNavy,
    overlay: Gifs.snowLoose,
  },
};
