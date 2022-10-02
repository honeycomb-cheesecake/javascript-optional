import NoneFactory from "./none";
import Option from "../interfaces/option";
import SomeFactory from "./some";
import optionCheck from "../util/option-check";

/**
 * Optional interface that permits easy interaction with values that can potentially be null/undefined.
 */
export default function OptionFactory<T>(value: T): Option<T> {
  return optionCheck(value) ?
    SomeFactory(value) :
    NoneFactory();
}
