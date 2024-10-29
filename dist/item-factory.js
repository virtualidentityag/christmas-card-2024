const { availableItems } = await import('./available-items.js');
export class ItemFactory {
    constructor(game, onItemCreated) {
        this.p5 = null;
        this.game = null;
        this.items = [];
        this.game = game;
        this.p5 = game.p5;
        this.onItemCreated = onItemCreated;
    }
    createItem(type) {
        const item = availableItems.find(item => item.type === type);
        if (!item) {
            throw new Error(`Item with type ${type} not found`);
        }
        const newItem = new item.class(this.game, 0, 0, item.spritePath);
        newItem.onDestroy = () => {
            this.createItem(item.type);
        };
        this.items.push(newItem);
        this.onItemCreated(newItem);
        return newItem;
    }
    createRandomItem() {
        const weightedItems = this.getWeightedItems(availableItems);
        const randomIndex = Math.floor(Math.random() * weightedItems.length);
        const randomItem = weightedItems[randomIndex];
        return this.createItem(randomItem.type);
    }
    produceRandomItems(count) {
        return Array(count).fill(null).map(() => this.createRandomItem());
    }
    getWeightedItems(items) {
        return items.map(item => {
            return Array(item.weight).fill(item);
        }).flat();
    }
}
//# sourceMappingURL=item-factory.js.map