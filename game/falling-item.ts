const { GameObject } = await import('./game-object.js');

export class FallingItem extends GameObject {
  startSplashTime = 0;
  splashSprite = null;
  speed = 1;
  width: number;

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
    this.y += this.speed;
    if (this.isOutOfBounds) {
      this.onOutOfBounds();
      this.destroy();
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  get isOutOfBounds() {
    return this.y >= this.p5.height - this.sprite.height / 2;
  }

  destroy() {
    this.render = false;
    this.x = -1000;
    this.y = -1000;
    this.width = 0;
    this.height = 0;
    this.onDestroy();
  }

  onOutOfBounds() { };

  onCaught() { };

  onDestroy() { };
}
