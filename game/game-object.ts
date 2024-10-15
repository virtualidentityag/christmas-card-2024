import type { GameInstance } from './game-instance';

export class GameObject {
  p5: p5 = null;
  x: number = 0;
  y: number = 0;
  width: number = 40;
  height: number = 40;
  sprite: p5.Image = null;
  spritePath: string = "";
  render: boolean = false;
  constructor(game: GameInstance, x: number, y: number, spritePath: string) {
    if (new.target === GameObject) {
      throw new TypeError("Cannot construct GameObject instances directly");
    }
    this.p5 = game.p5;
    this.x = x;
    this.y = y;
    this.spritePath = spritePath;
    this.p5.loadImage(this.spritePath, this.onImageLoaded.bind(this));
  }

  onImageLoaded(img) {
    this.sprite = img;
    this.onReady()
    this.render = true;
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  draw() {
    if (!this.render) {
      return;
    }
    this.p5.image(this.sprite, this.x, this.y, this.width, this.height);
  }
  checkIntersection(gameObject: GameObject) {
    if (
      this.x < gameObject.x + gameObject.width &&
      this.x + this.width > gameObject.x &&
      this.y < gameObject.y + gameObject.height &&
      this.y + this.height > gameObject.y
    ) {
      return true;
    }
    return false;
  }

  onReady() { };
}