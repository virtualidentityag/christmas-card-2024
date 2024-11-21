import type { GameInstance } from './game-instance.js';
import { FallingItem } from './falling-item.js';

export class PowerUp extends FallingItem {
  effectDuration = 5;
  width = 100;
  height = 100;

  onCaught(): void {
    super.onCaught();
    this.powerUp();
  }

  powerUp(): void {
    this.createTemporaryEffect(this.effect, this.effectDuration);
  }

  createTemporaryEffect(effect: (game: GameInstance) => void, durationInSeconds: number): void {
    this.game.activeEffects.push(effect);
    setTimeout(() => {
      this.game.activeEffects = this.game.activeEffects.filter((e) => e !== effect);
    }, durationInSeconds * 1000);
  }

  effect(game: GameInstance) { }
}