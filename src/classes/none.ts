import { v4 as uuidv4 } from "uuid";
import NoneFactory from "../factories/none";
import Option from "../interfaces/option";

/**
 * Container that holds an unset optional value.
 */
export default class None<T> implements Option<T> {

  private identifier: string = uuidv4();
  private millis: number;

  constructor() {

    this.millis = Date.now();
  }

  id(): string {

    return this.identifier;
  }

  isEmpty(): boolean {

    return true;
  }

  isDefined(): boolean {

    return false;
  }

  timestamp(): number {

    return this.millis;
  }

  forEach(_: (value: T) => void): void { }

  flatMap<S>(_: (value: T) => Option<S>): Option<S> {

    return NoneFactory();
  }

  map<S>(_: (value: T) => S): Option<S> {

    return NoneFactory();
  }

  getOrElse(otherwiseValue: T): T {

    return otherwiseValue;
  }

  getOrNull(): T | null {

    return null;
  }

  getOrUndefined(): T | undefined {

    return undefined;
  }

  doOtherwise<S>(_: (value: T) => S, noneFunc: () => S): S {

    return noneFunc();
  }
}
