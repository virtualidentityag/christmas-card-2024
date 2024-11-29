import { Sock } from './sock.js';
import { ItemStore } from './item-store.js';
import { ItemFactory } from './item-factory.js';
import { UserInterface } from './user-interface.js';
import type p5 from 'p5';
import type { PowerUp } from './power-up.js';
import { soundLibrary } from './sound-library.js';
import { ImageLibrary } from './image-library.js';

export interface GameConfig {
  maxNumberMisses: number;

  initialSpeed: number;
  speedIncreaseIntervalInSeconds: number;
  speedIncrease: number;
  maxSpeed: number;

  theme: {
    backgroundColor: string;
  };
  initialItemCount: number;
  itemCountIncreaseIntervalInSeconds: number;
  itemCountIncrease: number;
  maxItemCount: number;

  durationInSeconds: number;

  powerUpChance: number;

  onGameStart: (game: GameInstance) => void;
  onGameEnd: (game: GameInstance) => void;
  onScoreChange: (score: number) => void;
  onMissChange: (misses: number) => void;
  onTimeChange: (timeElapsed: number) => void;
  onPowerUpChange: (powerUps: PowerUp[]) => void;
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
  activePowerUps: Array<PowerUp> = [];
  durationInSeconds: number = 0;
  countdownRunning: boolean = false;
  sounds: any = {};
  images: ImageLibrary;

  constructor(config: GameConfig, p5: p5, element: HTMLCanvasElement) {
    this.config = config;
    this.p5 = p5;
    this.sounds = soundLibrary;
    this.images = new ImageLibrary(this, {
      sock: 'sock.png',
      ball: 'ornaments/ball.png',
      canes: 'ornaments/canes.png',
      flake: 'ornaments/flake.png',
      gingerbread: 'ornaments/gingerbread.png',
      ice: 'ornaments/ice.png',
      ring: 'ornaments/ring.png',
      sack: 'ornaments/sack.png',
      stag: 'ornaments/stag.png',
      candy_0: 'powerups/candy_0.png',
      candy_1: 'powerups/candy_1.png',
      candy_2: 'powerups/candy_2.png',
      candy_3: 'powerups/candy_3.png',
      bells_0: 'powerups/bells_0.png',
      bells_1: 'powerups/bells_1.png',
      bells_2: 'powerups/bells_2.png',
      bells_3: 'powerups/bells_3.png',
      star_0: 'powerups/star_0.png',
      star_1: 'powerups/star_1.png',
      star_2: 'powerups/star_2.png',
      star_3: 'powerups/star_3.png',
      countdown_start_0: 'countdown/start/3.png',
      countdown_start_1: 'countdown/start/2.png',
      countdown_start_2: 'countdown/start/1.png',
      countdown_start_3: 'countdown/start/go.png',
      countdown_end_0: 'countdown/end/5.png',
      countdown_end_1: 'countdown/end/4.png',
      countdown_end_2: 'countdown/end/3.png',
      countdown_end_3: 'countdown/end/2.png',
      countdown_end_4: 'countdown/end/1.png',
      countdown_end_5: 'countdown/end/done.png',
    });
    this.ui = new UserInterface(this);
    this.sock = new Sock(this, 0, 0);
    this.itemFactory = new ItemFactory(this, (item) => {
      item.onOutOfBounds = () => {
        this.lostItems.addItem(item);
        this.onMissChange();
      }
    });
    this.lostItems = new ItemStore();
    this.durationInSeconds = this.config.durationInSeconds;

    p5.preload = () => {
      this.sounds.preload(p5);
      this.images.preload(p5);
    }

    p5.setup = () => {
      p5.createCanvas(element?.width || p5.windowWidth, element?.height || p5.windowHeight, element as any);
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
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

    p5.draw = () => {
      p5.clear();
      this.run();
    }
  }

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

  set timeElapsed(time: number) {
    this.runningSince = this.p5.millis() - time * 1000;
  }

  get timeRemaining() {
    return this.durationInSeconds - this.timeElapsed;
  }

  pushPowerUp(powerUp: PowerUp) {
    this.activePowerUps.push(powerUp);
    powerUp.onActivate(this);
    this.config.onPowerUpChange?.(this.activePowerUps);
  }

  removePowerUp(powerUp: PowerUp) {
    this.activePowerUps = this.activePowerUps.filter(p => p !== powerUp);
    powerUp.onEnd(this);
    this.config.onPowerUpChange?.(this.activePowerUps);
  }


  startGame() {
    this.ui.triggerStartCountdown(() => {
      this.config.onGameStart?.(this);
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
    this.config.onGameEnd?.(this);
  }

  calculateGameState() {
    if (this.timeRemaining === 5 && this.countdownRunning === false) {
      this.ui.triggerEndCountdown(() => {
        this.running = false;
        this.ui.showDoneScreen(() => {
          this.gameOver();
        })
      });
      this.countdownRunning = true;
    }
    this.sock.moveSock();
    if (!this.running) {
      return;
    }
    for (const item of this.itemFactory.items) {
      item.updatePosition();
    }

    this.sock.checkForItems(this.itemFactory.items);

    this.updateSpeed();
    this.updateItemCount();
    this.activePowerUps.forEach(powerup => powerup.run(this));
  }

  render() {
    this.ui.drawBackground();
    for (const item of this.itemFactory.items) {
      item.draw();
    }
    this.sock.draw();
    this.ui.drawForeground();
  }

  run() {
    this.calculateGameState();
    this.render();
    this.config.onTimeChange?.(this.timeRemaining);
  }

  onScoreChange() {
    this.config.onScoreChange?.(this.sock.storage.getItems().length);
  }

  onMissChange() {
    this.config.onMissChange?.(this.lostItems.items.length);
  }
}