import type p5 from 'p5';
import type { GameInstance } from './game-instance';
import type { Image } from 'p5';

export class GameObject {
  p5: p5;
  game: GameInstance;
  x: number = 0;
  y: number = 0;
  width: number = 40;
  height: number = 40;
  sprites: p5.Image[] = [];
  spritePaths: string[] = [];
  render: boolean = false;
  framesPerSecond: number = 2;

  constructor(game: GameInstance, x: number, y: number, spritePaths: string[]) {
    if (new.target === GameObject) {
      throw new TypeError("Cannot construct GameObject instances directly");
    }
    this.game = game;
    this.p5 = game.p5;
    this.x = x;
    this.y = y;
    this.spritePaths = spritePaths;
    this.loadSprites();
  }

  get sprite(): Image {
    return this.sprites[this.currentFrame];
  }

  get currentFrame(): number {
    // example for a FPS of 2
    // p5.millis() = 0 -> 0
    // p5.millis() = 500 -> 1
    // p5.millis() = 1000 -> 2
    // p5.millis() = 1500 -> 3
    return Math.floor(this.p5.millis() / (1000 / this.framesPerSecond)) % this.sprites.length;
  }

  async loadSprites() {
    this.sprites = await Promise.all(this.spritePaths.map((path) => new Promise(res => this.p5.loadImage(path, res))));
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