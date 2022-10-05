import GetOrElseFactory from "./get-or-else";

/**
 * Option helper which returns the value or gets the specifed otherwiseValue.
 *
 * @deprecated Deprecated since version 0.0.12. Due to naming clarity, this helper has been replaced by `GetOrElse` and shall be removed.
 * @param value potentially optional value.
 * @param otherwiseValue default value if not set.
 * @returns value if `Some`, otherwiseValue if `None`.
 */
export default function OptionOrElseFactory<T>(value: T | null | undefined, otherwiseValue: T): T {
  return GetOrElseFactory(value, otherwiseValue);
}
