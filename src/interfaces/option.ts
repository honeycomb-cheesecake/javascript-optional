/**
 * Optional interface that permits easy interaction with values that can potentially be null/undefined.
 */
interface Option<T> {

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
   * Apply a function on the (optional) value if non-empty.
   *
   * @param func function to apply to the optional value which returns a `Some` result if value is non-empty and a `None` if empty.
   * @returns
   */
  flatMap<S>(func: (value: T) => Option<S>): Option<S>;

  /**
   * Apply a function on the (optional) value if non-empty.
   *
   * @param func function to apply to the optional value which returns a `Some` result if value is non-empty and a `None` if empty.
   */
  map<S>(func: (value: T) => S): Option<S>;

  /**
   * Retrieves the value if `Some` or the specified `otherwise` value if `None`.
   *
   * @param otherwise default value if optional value is `None`.
   * @reurns the value if option is `Some` or the `otherwise` default if option is `None`.
   */
  getOrElse(otherwise: T): T;

  /**
   * Retrieves the value if `Some` or `undefined` if `None`.
   *
   * @returns @reurns the value if option is `Some` or the `undefined` if option is `None`.
   */
  getOrUndefined(): T | undefined;

  /**
   * Applies `some` function if option is `Some` or applies the `none` function if option is `None`.
   *
   * @param some function applied if `Some`.
   * @param none function applied if `None`.
   * @returns value after function applied.
   */
  doOtherwise<S>(some: (value: T) => S, none: () => S): S;
}

export default Option;
