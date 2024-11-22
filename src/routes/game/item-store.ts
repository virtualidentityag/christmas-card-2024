export class ItemStore {
  items = [];
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  addItems(items) {
    this.items = this.items.concat(items);
  }

  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
  }

  getItems() {
    return this.items;
  }
}