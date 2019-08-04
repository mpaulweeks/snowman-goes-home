

export interface Sprite {
  image: HTMLImageElement;
  loaded: Promise<boolean>;
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

function loadImage(url: string) {
  const img = new Image();
  const state: Sprite = {
    image: img,
    loaded: new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
    }),
  };
  img.src = url;
  return state;
}

// load sprites
const spriteImages = {
  heroLeft: loadImage('sprite/snowman_left.png'),
  heroRight: loadImage('sprite/snowman_right.png'),
  groundIce1: loadImage('sprite/ground_ice_1.png'),
  groundIce2: loadImage('sprite/ground_ice_2.png'),
  groundIce3: loadImage('sprite/ground_ice_3.png'),
  groundIce4: loadImage('sprite/ground_ice_4.png'),
  groundIce5: loadImage('sprite/ground_ice_5.png'),
  groundIce6: loadImage('sprite/ground_ice_6.png'),
  groundIce7: loadImage('sprite/ground_ice_7.png'),
  groundIce8: loadImage('sprite/ground_ice_8.png'),
  groundIce9: loadImage('sprite/ground_ice_9.png'),
  treeLight: loadImage('sprite/tree_light.png'),
  treeHeavy: loadImage('sprite/tree_heavy.png'),
  igloo: loadImage('sprite/igloo.png'),
};
export const Sprites: SpriteManager = {
  ...spriteImages,
  loaded: Promise.all(Object.values(spriteImages).map(s => s.loaded)).then(() => true),
};
window.Sprites = Sprites;
