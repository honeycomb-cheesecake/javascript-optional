import NoneFactory from "./none";
import Option from "../interfaces/option";
import SomeFactory from "./some";

/**
 * Optional interface that permits easy interaction with values that can potentially be null/undefined where empty strings are also treated as None.
 */
export default function OptionEmptyStringFactory<T>(value?: T | null | undefined): Option<T> {
  return value !== null && value !== undefined && value !== "" ?
    SomeFactory(value) :
    NoneFactory();
}
