import type { GameInstance } from './game-instance';

export class ImageLibrary {
  images: { [key: string]: string };
  root: string = '/images';
  loadedImages: { [key: string]: p5.Image } = {};
  game: GameInstance;

  constructor(game: GameInstance, images: { [key: string]: string }) {
    this.game = game;
    this.images = images;
  }
  preload() {
    Object.keys(this.images).forEach(key => {
      if (this.loadedImages[key]) {
        return;
      }
      this.loadedImages[key] = this.game.p5.loadImage(`${this.root}/${this.images[key]}`);
    });
  }

  get(key: keyof ImageLibrary['images']) {
    if (!this.loadedImages[key] && this.images[key]) {
      this.loadedImages[key] = this.game.p5.loadImage(`${this.root}/${this.images[key]}`);
    }
    return this.loadedImages[key];
  }

  getPath(key: keyof ImageLibrary['images']) {
    return `${this.root}/${this.images[key]}`;
  }
}