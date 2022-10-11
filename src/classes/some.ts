import { v4 as uuidv4 } from "uuid";
import OptionFactory from "../factories/option";
import Option from "../interfaces/option";

/**
 * Container that holds an optional value which is set.
 */
export default class Some<T> implements Option<T> {

  private identifier: string = uuidv4();
  private millis: number;
  private value: T;

  constructor(value: T) {

    if (value !== null && value !== undefined) {

      this.millis = Date.now();
      this.value = value;
    }
    else {

      throw new Error(`Set value cannot be ${value}.`);
    }
  }

  id(): string {

    return this.identifier;
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

  forEach(func: (value: T) => void): void {

    func(this.value);
  }

  flatMap<S>(func: (value: T) => Option<S>): Option<S> {

    return func(this.value);
  }

  map<S>(func: (value: T) => S): Option<S> {

    return OptionFactory(func(this.value));
  }

  getOrElse(_: T): T {

    return this.value;
  }

  getOrNull(): T | null {

    return this.value;
  }

  getOrUndefined(): T | undefined {

    return this.value;
  }

  doOtherwise<S>(someFunc: (value: T) => S, _: () => S): S {

    return someFunc(this.value);
  }
}
