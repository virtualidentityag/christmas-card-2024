const { Sock } = await import('./sock.js');
const { ItemStore } = await import('./item-store.js');
const { ItemFactory } = await import('./item-factory.js');
const { UserInterface } = await import('./user-interface.js');
export class GameInstance {
    constructor(config, p5, element) {
        this.running = false;
        this._speed = 0;
        this.activeEffects = [];
        this.config = config;
        this.p5 = p5;
        this.ui = new UserInterface(this);
        this.sock = new Sock(this, 0, 0, 'assets/sprites/sock.svg');
        this.itemFactory = new ItemFactory(this, (item) => {
            item.onOutOfBounds = () => {
                this.lostItems.addItem(item);
            };
        });
        this.lostItems = new ItemStore();
        p5.preload = () => {
            this.itemFactory.produceRandomItems(config.itemCount);
        };
        p5.setup = () => {
            p5.createCanvas(element?.width || p5.windowWidth, element?.height || p5.windowHeight, element);
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        };
        p5.draw = () => {
            p5.clear();
            this.run();
        };
    }
    get currentSpeed() {
        return this._speed;
    }
    set currentSpeed(speed) {
        console.log('Setting speed to', speed);
        if (this._speed !== speed) {
            this._speed = speed;
            this.setSpeedOnItems();
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
    setSpeedOnItems() {
        for (const item of this.itemFactory.items) {
            item.speed = this.currentSpeed;
        }
    }
    updateSpeed() {
        this.currentSpeed = this.config.initialSpeed + Math.floor(this.p5.millis() / 1000 / this.config.speedIncreaseIntervalInSeconds) * this.config.speedIncrease;
    }
    gameOver(score = this.sock.storage.getItems().length) {
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
//# sourceMappingURL=game-instance.js.map