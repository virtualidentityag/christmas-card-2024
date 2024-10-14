import type { ItemDefinition } from './available-items.js';
import type { FallingItem } from './falling-item.js';

const { availableItems } = await import('./available-items.js');

export class ItemFactory {
  p5: p5 = null
  items = [];
  onItemCreated: (item: FallingItem) => void;

  constructor(p5, onItemCreated: (item: FallingItem) => void) {
    this.p5 = p5;
    this.onItemCreated = onItemCreated;
  }

  createItem(type) {
    const item = availableItems.find(item => item.type === type);
    if (!item) {
      throw new Error(`Item with type ${type} not found`);
    }

    const newItem = new item.class(this.p5, 0, 0, item.spritePath);
    newItem.onDestroy = () => {
      this.createItem(item.type);
    }
    this.items.push(newItem);
    this.onItemCreated(newItem);
    return newItem;
  }

  createRandomItem(): FallingItem {
    const weightedItems = this.getWeightedItems(availableItems);
    const randomIndex = Math.floor(Math.random() * weightedItems.length);
    const randomItem = weightedItems[randomIndex];
    return this.createItem(randomItem.type);
  }

  produceRandomItems(count: number): FallingItem[] {
    return Array(count).fill(null).map(() => this.createRandomItem());
  }

  getWeightedItems(items: ItemDefinition[]): ItemDefinition[] {
    return items.map(item => {
      return Array(item.weight).fill(item);
    }).flat();
  }
}