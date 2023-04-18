import Option from "../interfaces/option";
import NoneFactory from "./none";
import SomeFactory from "./some";

/**
 * Optional interface that permits easy interaction with array values that can potentially be null/undefined where empty arrays are also treated as None.
 */
export default function OptionEmptyArrayFactory<T>(value?: Array<T> | null | undefined): Option<Array<T>> {
  return value !== null && value !== undefined && value.length > 0 ?
    SomeFactory(value) :
    NoneFactory();
}
