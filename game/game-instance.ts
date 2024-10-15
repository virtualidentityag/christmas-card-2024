const { Sock } = await import('./sock.js');
const { ItemStore } = await import('./item-store.js');
const { ItemFactory } = await import('./item-factory.js');
const { UserInterface } = await import('./user-interface.js');

export interface GameConfig {
  itemCount: number;
  initialSpeed: number;
  maxNumberMisses: number;
  speedIncreaseIntervalInSeconds: number;
  speedIncrease: number;
  onGameOver: (game: GameInstance) => void;
  theme: {
    backgroundColor: string;
  };
}

export class GameInstance {
  config: GameConfig;
  currentSpeed: number = 0;
  running: boolean = false;
  p5: p5;
  ui;
  sock;
  lostItems;
  itemFactory;

  constructor(config: GameConfig, p5: p5, element: HTMLCanvasElement) {
    this.config = config;
    this.p5 = p5;
    this.ui = new UserInterface(this);
    this.sock = new Sock(this, 0, 0, 'assets/sprites/sock.svg');
    this.itemFactory = new ItemFactory(this, (item) => {
      item.onOutOfBounds = () => {
        this.lostItems.addItem(item);
      }
    });
    this.lostItems = new ItemStore();

    p5.preload = () => {
      this.itemFactory.produceRandomItems(config.itemCount);
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
    this.running = true;
  }

  pauseGame() {
    this.running = false;
  }

  resumeGame() {
    this.running = true;
  }

  setSpeed() {
    for (const item of this.itemFactory.items) {
      item.speed = this.config.initialSpeed + Math.floor(this.p5.millis() / 1000 / this.config.speedIncreaseIntervalInSeconds) * this.config.speedIncrease;
    }
  }

  gameOver(score: number = this.sock.storage.getItems().length) {
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

    this.setSpeed();
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