import { GameObject } from './game-object.js';

export class FallingItem extends GameObject {
  startSplashTime = 0;
  splashSprite = null;
  speed = 1;
  speedVariation = 0;
  width = 50;
  height = 50;

  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    this.speedVariation = this.getRandom(-2, 2);
  }

  onReady(): void {
    this.placeInRandomPosition();
  }

  placeInRandomPosition() {
    this.x = this.getRandom(5, this.p5.windowWidth - (this.width + 10));
    this.y = this.getRandom(-100, -10);
  }

  updatePosition() {
    if (!this.render) {
      return;
    }
    this.y += Math.max(this.speed + this.speedVariation, 1);
    if (this.isOutOfBounds) {
      this.onOutOfBounds();
      this.destroy();
    }
  }

  getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  get isOutOfBounds() {
    return this.y >= this.p5.height - this.height / 2;
  }

  destroy() {
    this.render = false;
    this.x = -1000;
    this.y = -1000;
    this.width = 0;
    this.height = 0;
    this.onDestroy();
  }

  onOutOfBounds() {

  };

  onCaught() {
    this.game.sounds.play('catch');
    this.game.onScoreChange();
  };

  onDestroy() { };
}
