import type { GameInstance } from './game-instance';
import type { Image } from 'p5';

type UIElementDrawer = (game: GameInstance) => void;

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

const createCountDown: (frames: Image[], onDone: () => void) => UIElementDrawer = (frames: Image[], onDone: () => void) => {
  let currentMillis = new Date().getTime();

  return (game: GameInstance) => {
    const p5 = game.p5;
    const secondsSinceStart = Math.floor((new Date().getTime() - currentMillis) / 1000);

    if (secondsSinceStart >= frames.length) {
      onDone();
      return;
    }

    const currentFrame = frames[secondsSinceStart];

    p5.image(currentFrame, p5.width / 2 - currentFrame.width / 2, p5.height / 2 - currentFrame.height / 2);
  }
}

export class UserInterface {
  game: GameInstance;
  foreground: UIElementDrawer[] = [];
  background: UIElementDrawer[] = [];

  constructor(game: GameInstance) {
    this.game = game;
    this.populateUIElements();
  }

  populateUIElements() {
    // this.uiElements.push(debug);
  }

  drawForeground() {
    this.foreground.forEach(uiElement => uiElement(this.game));
  }

  drawBackground() {
    this.background.forEach(uiElement => uiElement(this.game));
  }

  async triggerStartCountdown(onDone: () => void) {
    const sprites = await Promise.all([
      this.game.p5.loadImage('/sprites/countdown/start/3.png'),
      this.game.p5.loadImage('/sprites/countdown/start/2.png'),
      this.game.p5.loadImage('/sprites/countdown/start/1.png'),
      this.game.p5.loadImage('/sprites/countdown/start/go.png'),
    ]);
    const countdown = createCountDown(sprites, () => {
      this.foreground = this.foreground.filter(uiElement => uiElement !== countdown);
      onDone();
    });
    this.foreground.push(countdown);
  }

  async triggerEndCountdown(onDone: () => void) {
    const sprites = await Promise.all([
      this.game.p5.loadImage('/sprites/countdown/end/5.png'),
      this.game.p5.loadImage('/sprites/countdown/end/4.png'),
      this.game.p5.loadImage('/sprites/countdown/end/3.png'),
      this.game.p5.loadImage('/sprites/countdown/end/2.png'),
      this.game.p5.loadImage('/sprites/countdown/end/1.png'),
    ]);
    const countdown = createCountDown(sprites, () => {
      this.foreground = this.foreground.filter(uiElement => uiElement !== countdown);
      onDone();
    });
    this.background.push(countdown);
  }

  async showDoneScreen(onDone: () => void) {
    const sprites = await Promise.all([
      this.game.p5.loadImage('/sprites/countdown/end/done.png'),
      this.game.p5.loadImage('/sprites/countdown/end/done.png'),
      this.game.p5.loadImage('/sprites/countdown/end/done.png'),
    ]);
    const countdown = createCountDown(sprites, () => {
      this.foreground = this.foreground.filter(uiElement => uiElement !== countdown);
      onDone();
    });
    this.foreground.push(countdown);
  }
}