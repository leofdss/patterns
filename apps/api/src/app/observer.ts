interface IObserver {
  update(subject: ISubject): void;
}

interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

class ConcreteSubjectImpl implements ISubject {
  public state?: number;

  private _observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    if (this._observers.includes(observer)) {
      return;
    }
    this._observers.push(observer);
  }

  public detach(observer: IObserver): void {
    const id = this._observers.indexOf(observer);
    if (id === -1) {
      return;
    }
    this._observers.splice(id, 1);
  }

  notify(): void {
    this._observers.forEach((e) => e.update(this));
  }
}

class ConcretObserverImpl implements IObserver {
  public update(subject: ISubject): void {
    if (subject instanceof ConcreteSubjectImpl) {
      console.log('event');
    }
  }
}

const subject: ConcreteSubjectImpl = new ConcreteSubjectImpl();
const observer: ConcretObserverImpl = new ConcretObserverImpl();
subject.attach(observer);


setInterval(() => {
  subject.notify();
}, 1000);
