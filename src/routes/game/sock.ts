import type { FallingItem } from './falling-item.js';
import type { GameInstance } from './game-instance.js';
import { GameObject } from './game-object.js';
import { ItemStore } from './item-store.js';
import { defineVirtualJoystick } from './virtual-joystick.js';

export class Sock extends GameObject {
  storage: ItemStore;
  speed = 0;
  topSpeed = 700;
  inertia = 5;
  width: number = 150;
  height: number = 150;
  currentTouchDirection: "w" | "e" | null = null;

  constructor(game: GameInstance, x: number, y: number, spritePath: string) {
    super(game, x, y, spritePath);
    this.storage = new ItemStore();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (isTouch) {
      window.customElements.define('virtual-joystick', defineVirtualJoystick());
      document.querySelector('virtual-joystick')?.addEventListener('joystickmove', this.onJoystickMove.bind(this));
      document.querySelector('virtual-joystick')?.addEventListener('joystickup', () => { this.currentTouchDirection = null; });
    }
  }

  onReady() {
    this.x = this.p5.windowWidth / 2;
    this.y = this.p5.windowHeight - this.height - 10;
  }

  onJoystickMove(e: CustomEvent) {
    const joystick = e.target as HTMLElement;
    const direction: "w" | "e" = joystick.dataset.direction as "w" | "e";
    this.currentTouchDirection = direction;
  }

  moveSock() {
    if (this.render) {
      if (this.currentTouchDirection === "w" || !this.p5.keyIsDown(this.p5.RIGHT_ARROW) && this.p5.keyIsDown(this.p5.LEFT_ARROW)) {
        if (this.speed > -this.topSpeed) {
          this.speed -= this.inertia;
        }
        this.x += this.speed;
      }

      if (this.currentTouchDirection === "e" || !this.p5.keyIsDown(this.p5.LEFT_ARROW) && this.p5.keyIsDown(this.p5.RIGHT_ARROW)) {
        if (this.speed < this.topSpeed) {
          this.speed += this.inertia;
        }
        this.x += this.speed;
      }

      if (!this.currentTouchDirection || (!this.p5.keyIsDown(this.p5.RIGHT_ARROW) && !this.p5.keyIsDown(this.p5.LEFT_ARROW)) || (this.p5.keyIsDown(this.p5.RIGHT_ARROW) && this.p5.keyIsDown(this.p5.LEFT_ARROW))) {
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

  checkForItems(fallingItems: FallingItem[]) {
    for (const item of fallingItems) {
      if (this.checkIntersection(item)) {
        this.storage?.addItem(item);
        item.onCaught();
        item.destroy();
      }
    }
  }
}
