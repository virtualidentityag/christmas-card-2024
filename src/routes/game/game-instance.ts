import { Sock } from './sock.js';
import { ItemStore } from './item-store.js';
import { ItemFactory } from './item-factory.js';
import { UserInterface } from './user-interface.js';
import type p5 from 'p5';

export interface GameConfig {
  maxNumberMisses: number;

  initialSpeed: number;
  speedIncreaseIntervalInSeconds: number;
  speedIncrease: number;
  maxSpeed: number;

  onGameOver: (game: GameInstance) => void;
  theme: {
    backgroundColor: string;
  };
  initialItemCount: number;
  itemCountIncreaseIntervalInSeconds: number;
  itemCountIncrease: number;
  maxItemCount: number;
}

export class GameInstance {
  config: GameConfig;
  running: boolean = false;
  runningSince: number = 0;
  p5: p5;
  ui;
  sock;
  lostItems;
  itemFactory;
  #speed: number = 0;
  activeEffects: Array<(game: GameInstance) => void> = [];

  get currentSpeed() {
    return this.#speed;
  }

  set currentSpeed(speed: number) {
    if (this.#speed !== speed) {
      this.#speed = speed;
      this.setSpeedOnItems();
    }
  }

  get timeElapsed() {
    if (!this.running) {
      return 0;
    }
    return Math.floor((this.p5.millis() - this.runningSince) / 1000);
  }

  constructor(config: GameConfig, p5: p5, element: HTMLCanvasElement) {
    this.config = config;
    this.p5 = p5;
    this.ui = new UserInterface(this);
    this.sock = new Sock(this, 0, 0, '/sprites/sock.svg');
    this.itemFactory = new ItemFactory(this, (item) => {
      item.onOutOfBounds = () => {
        this.lostItems.addItem(item);
      }
    });
    this.lostItems = new ItemStore();

    p5.preload = () => {
      if (this.config.initialItemCount > this.config.maxItemCount) {
        console.warn('Initial item count is greater than max item count. Setting initial item count to max item count.');
        this.config.initialItemCount = this.config.maxItemCount;
      }
      this.itemFactory.concurrentItems = this.config.initialItemCount;
      if (this.config.initialSpeed > this.config.maxSpeed) {
        console.warn('Initial speed is greater than max speed. Setting initial speed to max speed.');
        this.config.initialSpeed = this.config.maxSpeed;
      }
    }

    p5.setup = () => {
      p5.createCanvas(element?.width || p5.windowWidth, element?.height || p5.windowHeight, element as any);
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    p5.draw = () => {
      p5.clear();
      this.run();
    }
  }

  startGame() {
    this.ui.triggerCountdown(3, () => {
      this.running = true;
      this.runningSince = this.p5.millis();
    });
  }

  pauseGame() {
    this.running = false;
  }

  resumeGame() {
    this.running = true;
  }


  setSpeedOnItems() {
    for (const item of this.itemFactory.items) {
      item.speed = this.currentSpeed;
    }
  }

  updateSpeed() {
    this.currentSpeed = Math.min(this.config.initialSpeed + Math.floor(this.timeElapsed / this.config.speedIncreaseIntervalInSeconds) * this.config.speedIncrease, this.config.maxSpeed);
  }

  updateItemCount() {
    this.itemFactory.concurrentItems = Math.min(this.config.initialItemCount + Math.floor(this.timeElapsed / this.config.itemCountIncreaseIntervalInSeconds) * this.config.itemCountIncrease, this.config.maxItemCount);
  }

  gameOver(score: number = this.sock.storage?.getItems().length) {
    this.p5.remove();
    this.config.onGameOver?.(this);
  }

  calculateGameState() {
    if (!this.running) {
      return;
    }
    if (this.lostItems.items.length > this.config.maxNumberMisses) {
      this.gameOver();
      return;
    }
    for (const item of this.itemFactory.items) {
      item.updatePosition();
    }

    this.sock.moveSock();
    this.sock.checkForItems(this.itemFactory.items);

    this.updateSpeed();
    this.updateItemCount()
    this.activeEffects.forEach(effect => effect(this));
  }

  render() {
    for (const item of this.itemFactory.items) {
      item.draw();
    }
    this.sock.draw();
    this.ui.draw();
  }

  run() {
    this.calculateGameState();
    this.render();
  }
}