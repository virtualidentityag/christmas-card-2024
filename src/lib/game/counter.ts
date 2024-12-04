import type { GameInstance } from './game-instance';
import { GameObject } from './game-object';

export class Counter extends GameObject {
  width: number = 40;
  height: number = 40;
  lifetime: number = 0.5;
  speed: number = 2;
  spawnTime: number = 0;
  destroy: () => void;

  constructor(game: GameInstance, x: number, y: number, sprite: string, onDie: () => void) {
    super(game, x, y, sprite);
    this.spawnTime = this.p5.millis();
    this.destroy = onDie;
  }

  moveUp() {
    if (this.p5.millis() - this.spawnTime > this.lifetime * 1000) {
      this.destroy();
      return;
    }
    this.y -= this.speed;
  }
}
