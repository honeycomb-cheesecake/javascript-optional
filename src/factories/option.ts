import NoneFactory from "./none";
import Option from "../interfaces/option";
import SomeFactory from "./some";

/**
 * Optional interface that permits easy interaction with values that can potentially be null/undefined.
 */
export default function OptionFactory<T>(value?: T | null | undefined): Option<T> {
  return value !== null && value !== undefined ?
    SomeFactory(value) :
    NoneFactory();
}
