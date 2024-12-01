import { Counter } from './counter.js';
import type { FallingItem } from './falling-item.js';
import type { GameInstance } from './game-instance.js';
import { GameObject } from './game-object.js';
import { ItemStore } from './item-store.js';
import { defineVirtualJoystick } from './virtual-joystick.js';

export class Sock extends GameObject {
  storage: ItemStore;
  width: number = 150;
  height: number = 150;
  currentTouchDirection: "w" | "e" | null = null;
  counters: Counter[] = [];

  constructor(game: GameInstance, x: number, y: number) {
    super(game, x, y, 'sock');

    this.storage = new ItemStore();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (isTouch) {
      window.customElements.define('virtual-joystick', defineVirtualJoystick());
      document.querySelector('virtual-joystick')?.addEventListener('joystickmove', this.onJoystickMove.bind(this));
      document.querySelector('virtual-joystick')?.addEventListener('joystickup', () => { this.currentTouchDirection = null; });
    }
  }

  get speed() {
    // return top speed based on screen width
    return this.p5.windowWidth / 200;
  }

  onReady() {
    this.x = this.p5.windowWidth / 2;
    this.y = this.p5.windowHeight - this.height - 10;
  }

  spawnCounter(count: 1 | 2 = 1) {
    const counter = new Counter(this.game, this.x + this.width / 2, this.y, count, () => {
      this.counters = this.counters.filter((c) => c !== counter);
    });
    this.counters.push(counter);
  }

  onJoystickMove(e: CustomEvent) {
    const joystick = e.target as HTMLElement;
    const direction: "w" | "e" = joystick.dataset.direction as "w" | "e";
    this.currentTouchDirection = direction;
  }

  moveSock() {
    if (this.render) {
      if (this.currentTouchDirection === "w" || !this.p5.keyIsDown(this.p5.RIGHT_ARROW) && this.p5.keyIsDown(this.p5.LEFT_ARROW)) {
        // left
        this.x -= this.speed;
        this.game.sounds.play('move', true);
      }

      if (this.currentTouchDirection === "e" || !this.p5.keyIsDown(this.p5.LEFT_ARROW) && this.p5.keyIsDown(this.p5.RIGHT_ARROW)) {
        // right
        this.x += this.speed;
        this.game.sounds.play('move', true);
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
        const itemsModifiedByPowerup = this.game.activePowerUps.map((powerUp) => powerUp.modifyCaughtItem(item)).flat();
        if (itemsModifiedByPowerup.length) {
          this.storage?.addItems([...itemsModifiedByPowerup]);
          this.spawnCounter(2)
        } else {
          this.storage?.addItem(item);
          this.spawnCounter();
        }
        item.onCaught();
        item.destroy();
      }
    }
  }

  draw(): void {
    super.draw();
    this.counters.forEach((counter) => {
      counter.moveUp();
      counter.draw();
    });
  }
}
