const { FallingItem } = await import('./falling-item.js');
const { PowerUp } = await import('./power-up.js');
export const availableItems = [
    {
        type: "ball",
        class: class S extends PowerUp {
            effect(game) {
                game.currentSpeed = game.currentSpeed / 2;
            }
        },
        spritePath: "assets/sprites/dd_item-1.svg",
        weight: 1,
    },
    {
        type: "canes",
        class: FallingItem,
        spritePath: "assets/sprites/dd_item-2.svg",
        weight: 1
    }
];
//# sourceMappingURL=available-items.js.map