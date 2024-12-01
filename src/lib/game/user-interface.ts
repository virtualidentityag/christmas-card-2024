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

const renderToCenter = (p5: p5, image: Image) => {
  p5.image(image, p5.width / 2 - image.width / 2, p5.height / 2 - image.height / 2);
}

const createCountDown: (frames: Image[], onDone: () => void) => UIElementDrawer = (frames: Image[], onDone: () => void) => {
  let currentMillis = new Date().getTime();
  let lastSecond = -1;

  return (game: GameInstance) => {
    const p5 = game.p5;
    const secondsSinceStart = Math.floor((new Date().getTime() - currentMillis) / 1000);
    if (secondsSinceStart >= frames.length) {
      onDone();
      return;
    }

    const currentFrame = frames[secondsSinceStart];
    renderToCenter(p5, currentFrame);
    if (secondsSinceStart == lastSecond) {
      return;
    }
    lastSecond = secondsSinceStart;
    game.sounds.play('countdown');

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
      this.game.images.get('countdown_start_0'),
      this.game.images.get('countdown_start_1'),
      this.game.images.get('countdown_start_2'),
      this.game.images.get('countdown_start_3'),
    ]);
    const countdown = createCountDown(sprites, () => {
      this.foreground = this.foreground.filter(uiElement => uiElement !== countdown);
      onDone();
    });
    this.foreground.push(countdown);
  }

  async triggerEndCountdown(onDone: () => void) {
    const sprites = await Promise.all([
      this.game.images.get('countdown_end_0'),
      this.game.images.get('countdown_end_1'),
      this.game.images.get('countdown_end_2'),
      this.game.images.get('countdown_end_3'),
      this.game.images.get('countdown_end_4'),
    ]);
    const countdown = createCountDown(sprites, () => {
      this.background = this.background.filter(uiElement => uiElement !== countdown);
      onDone();
    });
    this.background.push(countdown);
    return () => {
      this.background = this.background.filter(uiElement => uiElement !== countdown);
    }
  }

  async showDoneScreen(onDone: () => void) {
    const doneScreen = (game: GameInstance) => {
      renderToCenter(game.p5, game.images.get('countdown_end_5'));
    }
    this.foreground.push(doneScreen)
    setTimeout(() => {
      this.foreground = this.foreground.filter(uiElement => uiElement !== doneScreen);
      onDone();
    }, 3000);
  }
}