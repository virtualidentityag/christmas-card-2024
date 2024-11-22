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
    spritePaths: ["/images/ornaments/ball.png"],
    weight: 1,
  },
  {
    type: "canes",
    class: FallingItem,
    spritePaths: ["/images/ornaments/canes.png"],
    weight: 1,
  },
  {
    type: "flake",
    class: FallingItem,
    spritePaths: ["/images/ornaments/flake.png"],
    weight: 1,
  },
  {
    type: "gingerbread",
    class: FallingItem,
    spritePaths: ["/images/ornaments/gingerbread.png"],
    weight: 1,
  },
  {
    type: "ice",
    class: FallingItem,
    spritePaths: ["/images/ornaments/ice.png"],
    weight: 1,
  },
  {
    type: "ring",
    class: FallingItem,
    spritePaths: ["/images/ornaments/ring.png"],
    weight: 1,
  },
  {
    type: "sack",
    class: FallingItem,
    spritePaths: ["/images/ornaments/sack.png"],
    weight: 1,
  },
  {
    type: "stag",
    class: FallingItem,
    spritePaths: ["/images/ornaments/stag.png"],
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
    spritePaths: ["/images/powerups/candy_0.png", "/images/powerups/candy_1.png", "/images/powerups/candy_2.png", "/images/powerups/candy_3.png"],
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
    spritePaths: ["/images/powerups/bells_0.png", "/images/powerups/bells_1.png", "/images/powerups/bells_2.png", "/images/powerups/bells_3.png"],
    weight: 0,
  },
  {
    type: "star",
    class: class S extends PowerUp {
      effectDuration = 10;
      modifyCaughtItem(item: FallingItem): FallingItem[] {
        return [item, item];
      }
    },
    spritePaths: ["/images/powerups/star_0.png", "/images/powerups/star_1.png", "/images/powerups/star_2.png", "/images/powerups/star_3.png"],
    weight: 0,
  },
];