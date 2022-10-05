import OptionFactory from "./option";

/**
 * Helper which returns the value or gets the specifed otherwiseValue.
 *
 * @param value potentially optional value.
 * @param otherwiseValue default value if not set.
 * @returns value if `Some`, otherwiseValue if `None`.
 */
export default function GetOrElseFactory<T>(value: T | null | undefined, otherwiseValue: T): T {
  return OptionFactory(value).getOrElse(otherwiseValue);
}
