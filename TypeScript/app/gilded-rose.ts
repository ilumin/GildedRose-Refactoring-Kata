export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      this.updateItemQuality(item);
    }
    return this.items;
  }

  private updateItemQuality(item: Item) {
    if (item.name === 'Sulfuras, Hand of Ragnaros') return;

    this.updateSellIn(item);

    if (item.name === 'Aged Brie') {
      this.updateAgedBrie(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      this.updateBackstagePasses(item);
    } else {
      this.updateNormalItem(item);
    }

    if (item.sellIn < 0) {
      this.handleExpiredItem(item);
    }
  }

  private updateSellIn(item: Item) {
    item.sellIn -= 1;
  }

  private updateAgedBrie(item: Item) {
    this.increaseQuality(item);
  }

  private updateBackstagePasses(item: Item) {
    this.increaseQuality(item);
    if (item.sellIn < 10) this.increaseQuality(item);
    if (item.sellIn < 5) this.increaseQuality(item);
  }

  private updateNormalItem(item: Item) {
    this.decreaseQuality(item);
  }

  private handleExpiredItem(item: Item) {
    if (item.name === 'Aged Brie') {
      this.increaseQuality(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = 0;
    } else {
      this.decreaseQuality(item);
    }
  }

  private increaseQuality(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  private decreaseQuality(item: Item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }
}
