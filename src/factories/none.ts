import None from "../classes/none";

/**
 * Container that holds an unset optional value.
 */
 export default function NoneFactory<T>(): None<T> {

  return new None<T>();
}
