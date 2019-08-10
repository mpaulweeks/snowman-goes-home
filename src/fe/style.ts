import { Difficulty } from '../utils';
import { Sprites, Gifs } from './sprite';

export const GlobalStyle = {
  backgroundColor: 'white', // matching css
  menuMusic: 'music/visager_shrine.mp3',
};

export const StyleByDifficulty = {
  [Difficulty.Easy]: {
    music: 'music/visager_village_dreaming.mp3',
    ground: Sprites.groundIceWhite,
    gridColor: 'black',
    overlay: Gifs.snowLoose,
  },
  [Difficulty.Medium]: {
    music: 'music/visager_the_final_road.mp3',
    ground: Sprites.groundIceBlue,
    gridColor: 'black',
    overlay: Gifs.snowLoose,
  },
  [Difficulty.Hard]: {
    music: 'music/visager_the_great_forest.mp3',
    ground: Sprites.groundIceGray,
    gridColor: 'white',
    overlay: Gifs.snowDiagonal,
  },
  [Difficulty.Infinite]: {
    music: 'music/visager_dark_sanctum.mp3',
    ground: Sprites.groundIceNavy,
    gridColor: 'white',
    overlay: Gifs.snowDiagonal,
  },
};
