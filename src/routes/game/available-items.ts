import type { GameInstance } from './game-instance.js';
import { FallingItem } from './falling-item.js';
import { PowerUp } from './power-up.js';

export type ItemDefinition = {
  type: string;
  class: any;
  spritePath: string;
  weight: number;
}

export const availableItems: ItemDefinition[] = [
  {
    type: "ball",
    class: class S extends PowerUp {
      effect(game: GameInstance): void {
        game.currentSpeed = game.currentSpeed / 2;
      }
    },
    spritePath: "/sprites/ornaments/ball.svg",
    weight: 1,
  },
  {
    type: "flake",
    class: class S extends PowerUp {
      effectDuration: number = 0;
      effect(game: GameInstance): void {
        game.timeElapsed = game.timeElapsed - 5;
      }
    },
    spritePath: "/sprites/ornaments/flake.svg",
    weight: 10,
  },
  {
    type: "canes",
    class: FallingItem,
    spritePath: "/sprites/ornaments/canes.svg",
    weight: 1,
  }
];