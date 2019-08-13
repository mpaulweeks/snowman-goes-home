import { Difficulty } from '../utils';
import { Gifs, Sprite, Sprites } from './sprite';

export const GlobalStyle = {
  backgroundColor: 'white', // matching css
  menuMusic: 'music/visager_shrine.mp3',
};

interface IStyle {
  music: string;
  ground: Sprite;
  gridColor: string;
  overlay: string;
}
interface IStyleByDifficulty {
  [diff: string]: IStyle;
}

export const StyleByDifficulty: IStyleByDifficulty = {
  [Difficulty.Easy]: {
    gridColor: 'black',
    ground: Sprites.groundIceWhite,
    music: 'music/visager_village_dreaming.mp3',
    overlay: Gifs.snowLoose,
  },
  [Difficulty.Medium]: {
    gridColor: 'black',
    ground: Sprites.groundIceBlue,
    music: 'music/visager_the_final_road.mp3',
    overlay: Gifs.snowLoose,
  },
  [Difficulty.Hard]: {
    gridColor: 'white',
    ground: Sprites.groundIceGray,
    music: 'music/visager_the_great_forest.mp3',
    overlay: Gifs.snowDiagonal,
  },
  [Difficulty.Infinite]: {
    gridColor: 'white',
    ground: Sprites.groundIceNavy,
    music: 'music/visager_dark_sanctum.mp3',
    overlay: Gifs.snowDiagonal,
  },
};
