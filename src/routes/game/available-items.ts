import type { GameInstance } from './game-instance.js';
import { FallingItem } from './falling-item.js';
import { PowerUp } from './power-up.js';

export type ItemDefinition = {
  type: string;
  class: any;
  spritePaths: string[];
  weight: number;
}

export const availableItems: ItemDefinition[] = [
  {
    type: "candy",
    class: class S extends PowerUp {
      effect(game: GameInstance): void {
        game.currentSpeed = game.currentSpeed / 2;
      }
    },
    spritePaths: ["/sprites/ornaments/candy_0.png", "/sprites/ornaments/candy_1.png", "/sprites/ornaments/candy_2.png", "/sprites/ornaments/candy_3.png"],
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
    spritePaths: ["/sprites/ornaments/flake.svg"],
    weight: 0,
  },
  {
    type: "canes",
    class: FallingItem,
    spritePaths: ["/sprites/ornaments/canes.svg"],
    weight: 0,
  }
];