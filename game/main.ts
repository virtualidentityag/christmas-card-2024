const { Sock } = await import('./sock.js');
const { ItemStore } = await import('./item-store.js');
const { ItemFactory } = await import('./item-factory.js');

const createGame = (config, element) => (p5Instance: p5) => {
  const debug = true;

  const itemFactory = new ItemFactory(p5Instance, (item) => {
    item.onOutOfBounds = () => {
      lostItems.addItem(item);
    }
  });
  const sock = new Sock(p5Instance, 0, 0, 'assets/sprites/sock.svg');
  const store = new ItemStore();
  const lostItems = new ItemStore();
  sock.connectedStorage = store;

  const setSpeedOfItems = () => {
    for (const item of itemFactory.items) {
      item.speed = config.initialSpeed + Math.floor(p5Instance.millis() / 1000 / config.speedIncreaseIntervalInSeconds) * config.speedIncrease;
    }
  }

  p5Instance.windowResized = () => {
    p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight)
  }

  function gameOver() {
    p5Instance.remove();
    config.onGameOver?.();
  }

  async function drawBackground() {

  }

  function drawInterface() {
    p5Instance.fill(81, 43, 102)
      .textSize(15)
      .text(`SCORE: ${store.getItems().length}`, 10, 20)
      .text(`MISSES: ${lostItems.items.length} of ${config.maxNumberMisses}`, 10, 40)
      .text(`TIME: ${Math.floor(p5Instance.millis() / 1000)}`, 10, 60);

    if (debug) {
      p5Instance.fill(255, 0, 0)
        .text(`DEBUG MODE`, 10, 80)
        .text(`Speed Increase Interval: ${config.speedIncreaseIntervalInSeconds}`, 10, 100)
        .text(`Speed Increase: ${config.speedIncrease}`, 10, 120)
        .text(`Current Speed: ${itemFactory.items[0]?.speed}`, 10, 140)
        .text(`Current Time: ${Math.floor(p5Instance.millis() / 1000) % config.speedIncreaseIntervalInSeconds}`, 10, 160)
    }
  }

  function runGame() {
    if (lostItems.items.length > config.maxNumberMisses) {
      gameOver();
      return;
    }
    for (const item of itemFactory.items) {
      item.updatePosition();
    }

    sock.moveSock();
    sock.checkForItems(itemFactory.items);

    setSpeedOfItems();

  }

  function drawGameObjects() {
    for (const item of itemFactory.items) {
      item.draw();
    }

    sock.draw();
  }


  p5Instance.preload = function () {
    itemFactory.produceRandomItems(config.itemCount);
  }

  p5Instance.setup = () => {
    p5Instance.createCanvas(element?.width || p5Instance.windowWidth, element?.height || p5Instance.windowHeight, element);
    p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
  }

  p5Instance.draw = () => {
    p5Instance.clear();
    drawBackground();
    runGame();
    drawGameObjects();
    drawInterface();
  }
};

const gameConfig = {
  itemCount: 100,
  initialSpeed: 1,
  maxNumberMisses: Infinity,
  speedIncreaseIntervalInSeconds: 2,
  speedIncrease: 1,
  onGameOver: () => {
    console.log('Game Over');
  },
  theme: {
    backgroundColor: '#142547',
  }
}

const startGame = (config, element) => {
  new window.p5(createGame(config, element));
}

startGame(gameConfig, document.getElementById('game-container'));

export { }