import type { GameInstance } from './game-instance.js';
import { FallingItem } from './falling-item.js';

export class PowerUp extends FallingItem {
  glowSize = 0;
  glowColor = 'green';
  effectDuration = 5;
  draw(): void {
    const drawingContext: any = this.p5.drawingContext;
    drawingContext.shadowBlur = this.glowSize;
    drawingContext.shadowColor = this.glowColor;
    super.draw();
    drawingContext.shadowBlur = 0;
    this.animate();
  }
  animate(): void {
    this.glowSize = this.p5.sin(this.p5.frameCount / 10) * 20;
  };

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