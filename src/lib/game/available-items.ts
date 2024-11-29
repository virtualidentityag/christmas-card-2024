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
    type: "ball",
    class: FallingItem,
    spritePaths: ["ball"],
    weight: 1,
  },
  {
    type: "canes",
    class: FallingItem,
    spritePaths: ["canes"],
    weight: 1,
  },
  {
    type: "flake",
    class: FallingItem,
    spritePaths: ["flake"],
    weight: 1,
  },
  {
    type: "gingerbread",
    class: FallingItem,
    spritePaths: ["gingerbread"],
    weight: 1,
  },
  {
    type: "ice",
    class: FallingItem,
    spritePaths: ["ice"],
    weight: 1,
  },
  {
    type: "ring",
    class: FallingItem,
    spritePaths: ["ring"],
    weight: 1,
  },
  {
    type: "sack",
    class: FallingItem,
    spritePaths: ["sack"],
    weight: 1,
  },
  {
    type: "stag",
    class: FallingItem,
    spritePaths: ["stag"],
    weight: 1,
  },
];

export const availablePowerUps: ItemDefinition[] = [
  {
    type: "candy",
    class: class S extends PowerUp {
      onActivate(game: GameInstance): void {
        game.sock.width = game.sock.width / 2;
        game.sock.height = game.sock.height / 2;
        game.sock.x = game.sock.x + game.sock.width / 2;
        game.sock.y = game.sock.y + game.sock.height / 2;
      }
      onEnd(game: GameInstance): void {
        game.sock.x = game.sock.x - game.sock.width / 2;
        game.sock.y = game.sock.y - game.sock.height / 2;
        game.sock.width = game.sock.width * 2;
        game.sock.height = game.sock.height * 2;
      }
    },
    spritePaths: ["candy_0", "candy_1", "candy_2", "candy_3"],
    weight: 1,
  },
  {
    type: "bells",
    class: class S extends PowerUp {
      effectDuration = 0;
      run(game: GameInstance): void {
        game.durationInSeconds += 5;
      }
    },
    spritePaths: ["bells_0", "bells_1", "bells_2", "bells_3"],
    weight: 1,
  },
  {
    type: "star",
    class: class S extends PowerUp {
      effectDuration = 10;
      modifyCaughtItem(item: FallingItem): FallingItem[] {
        return [item, item];
      }
    },
    spritePaths: ["star_0", "star_1", "star_2", "star_3"],
    weight: 1,
  },
];