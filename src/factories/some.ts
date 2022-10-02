import Some from "../classes/some";

/**
 * Container that holds an optional value which is set.
 */
 export default function SomeFactory<T>(value: T): Some<T> {

  return new Some<T>(value);
}
