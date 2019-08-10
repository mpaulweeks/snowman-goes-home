import { Difficulty } from '../utils';
export class SpriteFrame {
  url: string;
  image: HTMLImageElement;
  loaded: Promise<boolean>;

  constructor(spriteName: string) {
    const url = `sprite/${spriteName}.png`;
    const img = new Image();
    const loaded = new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
    });
    img.src = url;

    this.url = url;
    this.image = img;
    this.loaded = loaded;
  }
}

export class Sprite {
  frames: Array<SpriteFrame>;
  loaded: Promise<boolean>;
  default: SpriteFrame;

  constructor(spriteNames: Array<string>) {
    this.frames = spriteNames.map(spriteName => new SpriteFrame(spriteName));
    this.loaded = Promise.all(this.frames.map(f => f.loaded));
    this.default = this.atFrame(0);
  }

  atFrame(frameCount) {
    const { frames } = this;
    const index = frameCount % frames.length;
    return frames[index];
  }
}

export interface SpriteManager {
  loaded: Promise<boolean>,
  heroLeft: Sprite;
  heroRight: Sprite;
  groundIceBlue: Sprite,
  groundIceGray: Sprite,
  groundIceNavy: Sprite,
  groundIceWhite: Sprite,
  treeLight: Sprite,
  treeHeavy: Sprite,
  igloo: Sprite,
};

// load sprites
const spriteImages = {
  heroLeft: new Sprite(['snowman_left']),
  heroRight: new Sprite(['snowman_right']),
  groundIceBlue: new Sprite(['ground_ice_blue']),
  groundIceGray: new Sprite(['ground_ice_gray']),
  groundIceNavy: new Sprite(['ground_ice_navy']),
  groundIceWhite: new Sprite(['ground_ice_white']),
  treeLight: new Sprite(['tree_light', 'tree_light_left', 'tree_light', 'tree_light_right']),
  treeHeavy: new Sprite(['tree_heavy', 'tree_heavy_right', 'tree_heavy', 'tree_heavy_left']),
  igloo: new Sprite(['igloo']),
};
export const Sprites: SpriteManager = {
  ...spriteImages,
  loaded: Promise.all(Object.values(spriteImages).map(s => s.loaded)).then(() => true),
};
window.Sprites = Sprites;

export const Gifs = {
  snowDiagonal: 'gif/snow_diagonal.gif',
  snowLoose: 'gif/snow_loose.gif',
};
