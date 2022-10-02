import Option from "../interfaces/option";

/**
 * Container that holds an unset optional value.
 */
export default class None<T> implements Option<T> {

  private millis: number;

  constructor() {

    this.millis = Date.now();
  }

  forEach(_: (value: T) => void): void { }

  isEmpty(): boolean {

    return true;
  }

  isDefined(): boolean {

    return false;
  }

  timestamp(): number {

    return this.millis;
  }

  flatMap<S>(_: (value: T) => Option<S>): Option<S> {

    return new None();
  }

  map<S>(_: (value: T) => S): Option<S> {

    return new None();
  }

  getOrElse(otherwise: T): T {

    return otherwise;
  }

  getOrNull(): T | null {

    return null;
  }

  getOrUndefined(): T | undefined {

    return undefined;
  }

  doOtherwise<S>(_: (value: T) => S, none: () => S): S {

    return none();
  }
}
