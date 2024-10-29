const { FallingItem } = await import('./falling-item.js');
export class PowerUp extends FallingItem {
    constructor() {
        super(...arguments);
        this.glowSize = 0;
        this.glowColor = 'green';
        this.effectDuration = 5;
    }
    draw() {
        const drawingContext = this.p5.drawingContext;
        drawingContext.shadowBlur = this.glowSize;
        drawingContext.shadowColor = this.glowColor;
        super.draw();
        drawingContext.shadowBlur = 0;
        this.animate();
    }
    animate() {
        this.glowSize = this.p5.sin(this.p5.frameCount / 10) * 20;
    }
    ;
    onCaught() {
        this.powerUp();
    }
    powerUp() {
        this.createTemporaryEffect(this.effect, this.effectDuration);
    }
    createTemporaryEffect(effect, durationInSeconds) {
        this.game.activeEffects.push(effect);
        setTimeout(() => {
            this.game.activeEffects = this.game.activeEffects.filter((e) => e !== effect);
        }, durationInSeconds * 1000);
    }
    effect(game) { }
}
//# sourceMappingURL=power-up.js.map