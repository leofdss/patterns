interface IBuilder {
  parteA(): void;
  parteB(): void;
  parteC(): void;
}

class Product {
  public parts: string[] = [];
  public listParts(): void {
    console.log(this.parts.join(', '));
  }
}

class ConcretBuilderImpl implements IBuilder {
  private _product: Product;

  constructor() {
    this._product = new Product();
  }

  reset() {
    this._product = new Product();
  }

  parteA(): void {
    this._product.parts.push('partA');
  }

  parteB(): void {
    this._product.parts.push('partB');
  }

  parteC(): void {
    this._product.parts.push('partC');
  }

  getProduct(): Product {
    const result: Product = this._product;
    this.reset();
    return result;
  }
}

class Director {
  private _builder?: IBuilder;

  public setBuilder(builder: IBuilder): void {
    this._builder = builder;
  }

  public buildMinimal(): void {
    this._builder?.parteA();
  }

  public buildFull(): void {
    this._builder?.parteA();
    this._builder?.parteB();
    this._builder?.parteC();
  }
}

const director: Director = new Director();
const builder: ConcretBuilderImpl = new ConcretBuilderImpl();
director.setBuilder(builder);

director.buildMinimal();
const productMin: Product = builder.getProduct();

director.buildFull();
const productFull: Product = builder.getProduct();

console.log('productMin', productMin);
console.log('productFull', productFull);
