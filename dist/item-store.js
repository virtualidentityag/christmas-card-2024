export class ItemStore {
    constructor() {
        this.items = [];
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }
    getItems() {
        return this.items;
    }
}
//# sourceMappingURL=item-store.js.map