import type { GameInstance } from './game-instance.js';
import { FallingItem } from './falling-item.js';

export class PowerUp extends FallingItem {
  effectDuration = 5;
  width = 100;
  height = 100;

  onCaught(): void {
    super.onCaught();
    this.game.sounds.play('powerup');
    this.powerUp();
  }

  powerUp(): void {
    this.createTemporaryEffect(this.run, this.effectDuration);
  }

  createTemporaryEffect(effect: (game: GameInstance) => void, durationInSeconds: number): void {
    this.game.pushPowerUp(this);
    setTimeout(() => {
      this.game.removePowerUp(this);
    }, durationInSeconds * 1000);
  }


  modifyCaughtItem(item: FallingItem): FallingItem[] {
    return []
  }

  onActivate(game: GameInstance) { }

  run(game: GameInstance) { }

  onEnd(game: GameInstance) { }
}