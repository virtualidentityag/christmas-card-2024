import type { GameInstance } from './game-instance';

type UIElementDrawer = (game: GameInstance) => void;

const header: UIElementDrawer = (game: GameInstance) => {
  const p5 = game.p5;
  const height = 50;
  const padding = 10;
  const backgroundColor = 'white';
  const textColor = 'black';
  const textSize = 15;

  const addPadding = (index: number) => index + padding;

  p5.textAlign(p5.LEFT, p5.CENTER);
  p5.fill(backgroundColor)
    .rect(0, 0, p5.width, height);

  p5.fill(textColor)
    .textSize(textSize)
    .text(`SCORE: ${game.sock.storage.getItems().length}`, addPadding(10), addPadding(20))
    .text(`MISSES: ${game.lostItems.items.length} of ${game.config.maxNumberMisses}`, addPadding(120), addPadding(20))
    .text(`TIME: ${game.timeElapsed}`, addPadding(300), addPadding(20));
}

const debug: UIElementDrawer = (game: GameInstance) => {
  const p5 = game.p5;
  const padding = 10;
  const boxPosition = p5.height - 200;
  const addPadding = (index: number) => index + padding;
  const insideBackground = (x: number, y: number): [number, number] => [addPadding(x), addPadding(y) + boxPosition + padding];

  p5.fill('grey')
    .rect(0, boxPosition, 250, 200);

  p5.fill(255, 0, 0)
    .text(`DEBUG MODE`, ...insideBackground(10, 10))
    .text(`Speed Increase Interval: ${game.config.speedIncreaseIntervalInSeconds}`, ...insideBackground(10, 40))
    .text(`Speed Increase: ${game.config.speedIncrease}`, ...insideBackground(10, 60))
    .text(`Current Speed: ${game.itemFactory.items[0]?.speed}`, ...insideBackground(10, 80))
    .text(`Current Time: ${Math.floor(p5.millis() / 1000) % game.config.speedIncreaseIntervalInSeconds}`, ...insideBackground(10, 100))
}

const createCountDown: (steps: number, finished: string, onDone: () => void) => UIElementDrawer = (steps: number, finished: string, onDone: () => void) => {
  let currentMillis = new Date().getTime();
  return (game: GameInstance) => {
    const p5 = game.p5;
    const secondsSinceStart = Math.floor((new Date().getTime() - currentMillis) / 1000);
    if (secondsSinceStart > steps) {
      onDone();
      return;
    }

    const currentText = steps - secondsSinceStart ? steps - secondsSinceStart : finished;

    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(100);

    p5.fill(255, 255, 255)
      .text(currentText, 0, 0, p5.width, p5.height);
  }
}

export class UserInterface {
  game: GameInstance;
  uiElements: UIElementDrawer[] = [];

  constructor(game: GameInstance) {
    this.game = game;
    this.populateUIElements();
  }

  populateUIElements() {
    this.uiElements.push(header);
    // this.uiElements.push(debug);
  }

  draw() {
    this.uiElements.forEach(uiElement => uiElement(this.game));
  }

  triggerCountdown(steps: number, onDone: () => void) {
    const countdown = createCountDown(steps, 'Dash it!', () => {
      this.uiElements = this.uiElements.filter(uiElement => uiElement !== countdown);
      onDone();
    });
    this.uiElements.push(countdown);
  }

  addUIElement(uiElement: UIElementDrawer) {
    this.uiElements.push(uiElement);
  }
}