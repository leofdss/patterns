class Prototype {
  public primitive?: string | number | boolean;
  public component?: object;
  public circularReference?: ComponentRef;

  public clone(): Prototype {
    const clone: Prototype = Object.create(this);
    if (this.component) {
      clone.component = Object.create(this.component);
    }

    if (this.circularReference) {
      clone.circularReference = {
        ...this.circularReference,
        prototype: { ...this },
      };
    }

    return clone;
  }
}

class ComponentRef {
  constructor(public prototype: Prototype) {}
}

/////

const p1: Prototype = new Prototype();
p1.primitive = 123;
p1.component = new Date();
p1.circularReference = new ComponentRef(p1);

const p2: Prototype = p1.clone();

if (p1.primitive === p2.primitive) {
  console.log('primitivo ok');
} else {
  console.log('primitivo errado');
}

if (p1.component === p2.component) {
  console.log('componente simples não foi clonado');
} else {
  console.log('componente simples foi clonado');
}

if (p1.circularReference === p2.circularReference) {
  console.log('componente não foi clonado');
} else {
  console.log('componente foi clonado');
}

if(p1.circularReference.prototype === p2.circularReference?.prototype) {
    console.log('referencia não foi clonada');
} else {
    console.log('referencia foi clonada')
}