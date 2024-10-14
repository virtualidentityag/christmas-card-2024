const { GameObject } = await import('./game-object.js');

export class Sock extends GameObject {
  connectedStorage = null;
  speed = 0;
  topSpeed = 7;
  inertia = 0.5;
  width: number = 150;
  height: number = 150;

  onReady() {
    this.x = this.p5.windowWidth / 2;
    this.y = this.p5.windowHeight - this.height - 10;
  }

  moveSock() {
    if (this.render) {
      if (!this.p5.keyIsDown(this.p5.RIGHT_ARROW) && this.p5.keyIsDown(this.p5.LEFT_ARROW)) {
        if (this.speed > -this.topSpeed) {
          this.speed -= this.inertia;
        }
        this.x += this.speed;
      }

      if (!this.p5.keyIsDown(this.p5.LEFT_ARROW) && this.p5.keyIsDown(this.p5.RIGHT_ARROW)) {
        if (this.speed < this.topSpeed) {
          this.speed += this.inertia;
        }
        this.x += this.speed;
      }

      if ((!this.p5.keyIsDown(this.p5.RIGHT_ARROW) && !this.p5.keyIsDown(this.p5.LEFT_ARROW)) || (this.p5.keyIsDown(this.p5.RIGHT_ARROW) && this.p5.keyIsDown(this.p5.LEFT_ARROW))) {
        if (this.speed > 0) {
          this.speed -= this.inertia;
        }

        if (this.speed < 0) {
          this.speed += this.inertia;
        }
        this.x += this.speed;
      }

      if (this.x < 5) {
        this.x = 5;
      }

      if (this.x > this.p5.width - (this.width + 10)) {
        this.x = this.p5.width - (this.width + 10);
      }
    }
  }

  checkForItems(fallingItems) {
    for (const item of fallingItems) {
      if (this.checkIntersection(item)) {
        item.destroy();
        this.connectedStorage?.addItem(item);
      }
    }
  }
}
