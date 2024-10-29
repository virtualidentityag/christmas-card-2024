import type { GameInstance } from './game-instance.js';

const { FallingItem } = await import('./falling-item.js');
const { PowerUp } = await import('./power-up.js');

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
    spritePath: "/sprites/dd_item-1.svg",
    weight: 1,
  },
  {
    type: "canes",
    class: FallingItem,
    spritePath: "/sprites/dd_item-2.svg",
    weight: 1
  }
];