interface IObserver {
  update(subject: ISubject): void;
}

interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): void;
}

class SubjectImpl implements ISubject {
  public state?: number;

  private _observers: IObserver[] = [];

  public subscribe(observer: IObserver): void {
    if (this._observers.includes(observer)) {
      return;
    }
    this._observers.push(observer);
  }

  public unsubscribe(observer: IObserver): void {
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

class ObserverImpl implements IObserver {
  public update(subject: ISubject): void {
    if (subject instanceof SubjectImpl) {
      console.log('event');
    }
  }
}

const subject: SubjectImpl = new SubjectImpl();
const observer: ObserverImpl = new ObserverImpl();
subject.subscribe(observer);

setInterval(() => {
  subject.notify();
}, 1000);

setTimeout(() => {
  subject.unsubscribe(observer);
}, 5000);
