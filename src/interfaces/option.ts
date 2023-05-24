/**
 * Optional interface that permits easy interaction with values that can potentially be null/undefined.
 */
interface Option<T> {

  /**
   * @returns unique identifier for value.
   */
  id(): string;

  /**
   * @returns `false` if optional value is `None` otherwise `true`.
   */
  isEmpty(): boolean;

  /**
   * @returns `true` if the optional value is `Some` otherwise `false`.
   */
  isDefined(): boolean;

  /**
   * @returns epoch timestamp the optional value was set.
   */
  timestamp(): number;

  /**
   * Perform a function on the value if `Some`, otherwise do nothing.
   *
   * @param func function to perform with the value if `Some`, or no-op if `None`..
   */
  forEach(func: (value: T) => void): void;

  /**
   * Apply a function on the (optional) value if non-empty.
   *
   * @param func function to apply to the optional value which returns a `Some` result if value is non-empty and a `None` if empty.
   * @returns optional value.
   */
  flatMap<S>(func: (value: T) => Option<S>): Option<S>;

  /**
   * Apply a function on the (optional) value if non-empty.
   *
   * @param func function to apply to the optional value which returns a `Some` result if value is non-empty and a `None` if empty.
   * @returns optional value.
   */
  map<S>(func: (value: T) => S): Option<S>;

  /**
   * Retrieves the value if `Some` or the specified `otherwise` value if `None`.
   *
   * @param otherwiseValue default value if optional value is `None`.
   * @returns the value if option is `Some` or the `otherwise` default if option is `None`.
   */
  getOrElse(otherwiseValue: T): T;

  /**
   * Retrieves the value if `Some` or throws the specified `Error` if `None`.
   *
   * @param otherwiseError default error to throw if optional value is `None`.
   * @returns the value if option is `Some`.
   */
  getOrError(otherwiseError: Error): T;

  /**
   * Retrieves the value if `Some` or `null` if `None`.
   *
   * @returns @reurns the value if option is `Some` or the `null` if option is `None`.
   */
  getOrNull(): T | null;

  /**
   * Retrieves the value if `Some` or `undefined` if `None`.
   *
   * @returns @reurns the value if option is `Some` or the `undefined` if option is `None`.
   */
  getOrUndefined(): T | undefined;

  /**
   * Applies `some` function if option is `Some` or applies the `none` function if option is `None`.
   *
   * @param someFunc function applied if `Some`.
   * @param noneFunc function applied if `None`.
   * @returns value after function applied.
   */
  doOtherwise<S>(someFunc: (value: T) => S, noneFunc: () => S): S;
}

export default Option;
