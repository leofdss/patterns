interface IStrategy {
  method(data: string[]): string[];
}

/////

class Context {
  constructor(private _strategy: IStrategy) {}

  public setStrategy(strategy: IStrategy) {
    this._strategy = strategy;
  }

  public logic(): string[] {
    const result: string[] = this._strategy.method(['a', 'b', 'c']);
    return result;
  }
}

//////

class ConcretStrategyAImpl implements IStrategy {
  public method(data: string[]): string[] {
    return data.sort();
  }
}

class ConcretStrategyBImpl implements IStrategy {
  public method(data: string[]): string[] {
    return data.reverse();
  }
}

//////

const context: Context = new Context(new ConcretStrategyAImpl());
console.log(context.logic());

context.setStrategy(new ConcretStrategyBImpl());
console.log(context.logic());
