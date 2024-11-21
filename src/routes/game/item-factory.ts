import type p5 from 'p5';
import type { ItemDefinition } from './available-items.js';
import type { FallingItem } from './falling-item.js';
import type { GameInstance } from './game-instance.js';
import { availableItems, availablePowerUps } from './available-items.js';

export class ItemFactory {
  p5: p5;
  game: GameInstance;
  items: FallingItem[] = [];
  powerUpChance: number = 0.1;
  currentPowerUp: FallingItem | null = null;
  #concurrentItems: number = 0;
  onItemCreated: (item: FallingItem) => void;

  get concurrentItems() {
    return this.#concurrentItems;
  }

  set concurrentItems(itemCount: number) {
    if (itemCount !== this.concurrentItems) {
      this.#concurrentItems = itemCount;
      this.ensureConcurrentItemCount();
    }
  }

  ensureConcurrentItemCount() {
    const missingItems = this.concurrentItems - this.items.length;
    if (missingItems > 0) {
      this.produceRandomItemsInInterval(missingItems, 1000, 2000);
    }
  }


  constructor(game: GameInstance, onItemCreated: (item: FallingItem) => void) {
    this.game = game;
    this.p5 = game.p5;
    this.onItemCreated = onItemCreated;
    this.powerUpChance = game.config.powerUpChance;
  }

  createItem(definition: ItemDefinition): FallingItem {
    const newItem = new definition.class(this.game, 0, 0, definition.spritePaths);
    newItem.onDestroy = () => {
      if (this.currentPowerUp === newItem) {
        this.currentPowerUp = null;
      }
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
    return this.createItem(randomItem);
  }

  createRandomPowerUp(): FallingItem {
    const weightedPowerUps = this.getWeightedItems(availablePowerUps);
    const randomIndex = Math.floor(Math.random() * weightedPowerUps.length);
    const randomPowerUp = weightedPowerUps[randomIndex];
    console.log('randomPowerUp', randomPowerUp.type);
    return this.createItem(randomPowerUp);
  }

  produceRandomItemsInInterval(count: number, durationMin: number, durationMax: number): void {
    let producedItems = 0;
    // random timing function that allowas items to be produced over time in a linear distribution
    const randomIntervaInDuration = () => {
      return Math.floor(Math.random() * (durationMax - durationMin) + durationMin);
    }
    const createNewItem = () => {
      if (this.powerUpChance > Math.random() && this.currentPowerUp === null) {
        this.currentPowerUp = this.createRandomPowerUp();
      }
      else {
        this.createRandomItem();
      }
      producedItems++;
      if (producedItems < count) {
        setTimeout(createNewItem, randomIntervaInDuration());
      }
    }
    setTimeout(createNewItem, randomIntervaInDuration());
  }

  getWeightedItems(items: ItemDefinition[]): ItemDefinition[] {
    return items.map(item => {
      return Array(item.weight).fill(item);
    }).flat();
  }
}