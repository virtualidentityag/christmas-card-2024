const { FallingItem } = await import('./falling-item.js');

export class PowerUp extends FallingItem {
  glowSize = 0;
  glowColor = 'green';
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

  }
}