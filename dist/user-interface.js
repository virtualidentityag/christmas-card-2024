const header = (game) => {
    const p5 = game.p5;
    const height = 50;
    const padding = 10;
    const backgroundColor = 'white';
    const textColor = 'black';
    const textSize = 15;
    const addPadding = (index) => index + padding;
    p5.fill(backgroundColor)
        .rect(0, 0, p5.width, height);
    p5.fill(textColor)
        .textSize(textSize)
        .text(`SCORE: ${game.sock.storage.getItems().length}`, addPadding(10), addPadding(20))
        .text(`MISSES: ${game.lostItems.items.length} of ${game.config.maxNumberMisses}`, addPadding(120), addPadding(20))
        .text(`TIME: ${Math.floor(p5.millis() / 1000)}`, addPadding(300), addPadding(20));
};
const debug = (game) => {
    const p5 = game.p5;
    const padding = 10;
    const boxPosition = p5.height - 200;
    const addPadding = (index) => index + padding;
    const insideBackground = (x, y) => [addPadding(x), addPadding(y) + boxPosition + padding];
    p5.fill('grey')
        .rect(0, boxPosition, 250, 200);
    p5.fill(255, 0, 0)
        .text(`DEBUG MODE`, ...insideBackground(10, 10))
        .text(`Speed Increase Interval: ${game.config.speedIncreaseIntervalInSeconds}`, ...insideBackground(10, 40))
        .text(`Speed Increase: ${game.config.speedIncrease}`, ...insideBackground(10, 60))
        .text(`Current Speed: ${game.itemFactory.items[0]?.speed}`, ...insideBackground(10, 80))
        .text(`Current Time: ${Math.floor(p5.millis() / 1000) % game.config.speedIncreaseIntervalInSeconds}`, ...insideBackground(10, 100));
};
export class UserInterface {
    constructor(game) {
        this.uiElements = [];
        this.game = game;
        this.populateUIElements();
    }
    populateUIElements() {
        this.uiElements.push(header);
    }
    draw() {
        this.uiElements.forEach(uiElement => uiElement(this.game));
    }
}
//# sourceMappingURL=user-interface.js.map