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
    class: PowerUp,
    spritePath: "assets/sprites/dd_item-1.svg",
    weight: 1,
  },
  {
    type: "canes",
    class: FallingItem,
    spritePath: "assets/sprites/dd_item-2.svg",
    weight: 10
  }
];