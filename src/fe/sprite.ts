import { Difficulty } from '../utils';
export class SpriteFrame {
  image: HTMLImageElement;
  loaded: Promise<boolean>;

  constructor(spriteName: string) {
    const img = new Image();
    const loaded = new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
    });
    img.src = `sprite/${spriteName}.png`;

    this.image = img;
    this.loaded = loaded;
  }
}

export class Sprite {
  frames: Array<SpriteFrame>;
  loaded: Promise<boolean>;

  constructor(spriteNames: Array<string>) {
    this.frames = spriteNames.map(spriteName => new SpriteFrame(spriteName));
    this.loaded = Promise.all(this.frames.map(f => f.loaded));
  }

  getImage(frameCount) {
    const { frames } = this;
    const index = frameCount % frames.length;
    return frames[index].image;
  }
}

export interface SpriteManager {
  loaded: Promise<boolean>,
  hero: Sprite;
  groundIce1: Sprite,
  groundIce2: Sprite,
  groundIce3: Sprite,
  groundIce4: Sprite,
  groundIce5: Sprite,
  groundIce6: Sprite,
  groundIce7: Sprite,
  groundIce8: Sprite,
  groundIce9: Sprite,
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
