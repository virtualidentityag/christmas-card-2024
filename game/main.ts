const { Sock } = await import('./sock.js');
const { ItemStore } = await import('./item-store.js');
const { ItemFactory } = await import('./item-factory.js');
const { GameInstance } = await import('./game-instance.js');
const { UserInterface } = await import('./user-interface.js');

const createGame = (config, element) => (p5Instance: p5) => {
  const game = new GameInstance(config, p5Instance, element);
  game.startGame();

  p5Instance.windowResized = () => {
    p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight)
  }

  // function debounce(fn: Function, delay: number): Function {
  //   let timeout: number;
  //   return function () {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       fn();
  //     }, delay);
  //   }
  // }

  // const debouncedPause = debounce(() => {
  //   console.log(running);

  //   if (running) {
  //     pauseGame();
  //   }
  //   else {
  //     resumeGame();
  //   }
  // }, 200)
};

const gameConfig = {
  itemCount: 10,
  initialSpeed: 1,
  maxNumberMisses: Infinity,
  speedIncreaseIntervalInSeconds: 10,
  speedIncrease: 0,
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