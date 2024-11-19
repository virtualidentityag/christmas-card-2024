import type p5 from 'p5';
import type { ItemDefinition } from './available-items.js';
import type { FallingItem } from './falling-item.js';
import type { GameInstance } from './game-instance.js';
import { availableItems } from './available-items.js';

export class ItemFactory {
  p5: p5;
  game: GameInstance;
  items: FallingItem[] = [];
  #concurrentItems: number = 0;
  onItemCreated: (item: FallingItem) => void;

  get concurrentItems() {
    return this.#concurrentItems;
  }

  set concurrentItems(itemCount: number) {
    this.#concurrentItems = itemCount;
    this.ensureConcurrentItemCount();
  }

  ensureConcurrentItemCount() {
    const missingItems = this.concurrentItems - this.items.length;
    if (missingItems > 0) {
      this.produceRandomItems(missingItems);
    }
  }


  constructor(game: GameInstance, onItemCreated: (item: FallingItem) => void) {
    this.game = game;
    this.p5 = game.p5;
    this.onItemCreated = onItemCreated;
  }

  createItem(type: string): FallingItem {
    const item = availableItems.find(item => item.type === type);
    if (!item) {
      throw new Error(`Item with type ${type} not found`);
    }

    const newItem = new item.class(this.game, 0, 0, item.spritePaths);
    newItem.onDestroy = () => {
      this.items = this.items.filter(i => i !== newItem);
      this.ensureConcurrentItemCount();
    }
    newItem.speed = this.game.currentSpeed;
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