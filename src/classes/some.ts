import Option from "../interfaces/option";

/**
 * Container that holds an optional value which is set.
 */
export default class Some<T> implements Option<T> {

  private millis: number;
  private value: T;

  constructor(value: T) {

    if(value !== null) {

      if(value !== undefined) {

        this.millis = Date.now();
        this.value = value;
      }
      else {

        throw new Error("Set value cannot be undefined.");
      }
    }
    else {

      throw new Error("Set value cannot be null.");
    }
  }

  isEmpty(): boolean {

    return false;
  }

  isDefined(): boolean {

    return true;
  }

  timestamp(): number {

    return this.millis;
  }

  flatMap<S>(func: (value: T) => Option<S>): Option<S> {

    return func(this.value);
  }

  map<S>(func: (value: T) => S): Option<S> {

    return new Some(func(this.value));
  }

  getOrElse(_: T): T {

    return this.value;
  }

  getOrUndefined(): T | undefined {

    return this.value;
  }

  doOtherwise<S>(some: (value: T) => S, _: () => S): S {

    return some(this.value);
  }
}
