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

class StrategyAImpl implements IStrategy {
  public method(data: string[]): string[] {
    return data.sort();
  }
}

class StrategyBImpl implements IStrategy {
  public method(data: string[]): string[] {
    return data.reverse();
  }
}

//////

const context: Context = new Context(new StrategyAImpl());
console.log(context.logic());

context.setStrategy(new StrategyBImpl());
console.log(context.logic());
