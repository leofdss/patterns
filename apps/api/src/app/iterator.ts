interface IIterator<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

interface IAgregator {
  getIterator(): IIterator<string>;
}

class AlphabeticalOrderIteratorImpl implements IIterator<string> {
  private _position = 0;
  constructor(
    private _wordsCollection: WordsCollectionImpl,
    private _reverse = false
  ) {
    if (_reverse) {
      this._position = _wordsCollection.getCount() - 1;
    }
  }

  public rewind(): void {
    if (this._reverse) {
      this._position = this._wordsCollection.getCount() - 1;
      return;
    }
    this._position = 0;
  }

  public current(): string {
    const items: string[] = this._wordsCollection.getItems();
    return items[this._position];
  }

  public key(): number {
    return this._position;
  }

  public next(): string {
    const items: string[] = this._wordsCollection.getItems();
    const item: string = items[this._position];

    if (this._reverse) {
      this._position -= 1;
    } else {
      this._position += 1;
    }

    return item;
  }

  public valid(): boolean {
    if (this._reverse) {
      return this._position >= 0;
    }
    return this._position < this._wordsCollection.getCount();
  }
}

class WordsCollectionImpl implements IAgregator {
  private _items: string[] = [];

  public getItems(): string[] {
    return this._items;
  }

  public getCount(): number {
    return this._items.length;
  }

  public addItem(item: string): void {
    this._items.push(item);
  }

  public getIterator(): IIterator<string> {
    return new AlphabeticalOrderIteratorImpl(this);
  }

  public getReverseIterator(): IIterator<string> {
    return new AlphabeticalOrderIteratorImpl(this, true);
  }
}

///////////////

const collection: WordsCollectionImpl = new WordsCollectionImpl();
collection.addItem('item 1');
collection.addItem('item 2');
collection.addItem('item 3');

const iterator: IIterator<string> = collection.getIterator();

while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('--------------');

const reverseIterator: IIterator<string> = collection.getReverseIterator();

while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}
