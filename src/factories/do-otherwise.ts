import OptionFactory from "./option";

/**
 * Helper which performs `someFunc` if value is set otherwise performs `noneFunc`.
 *
 * @param value potentially optional value.
 * @param someFunc function performed if value is set.
 * @param noneFunc function performed if value isn't set.
 * @returns value after performed function.
 */
export default function DoOtherwise<T, S>(value: T | null | undefined, someFunc: (value: T) => S, noneFunc: () => S): S {
  return OptionFactory<T>(value).doOtherwise<S>(someFunc, noneFunc);
}
