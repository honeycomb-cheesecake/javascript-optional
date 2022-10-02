import NoneFactory from "./none";
import Option from "../interfaces/option";
import SomeFactory from "./some";
import optionCheck from "../util/option-check";

export default function OptionEmptyStringFactory<T>(value: T): Option<T> {
  return optionCheck(value) && value !== "" ?
    SomeFactory(value) :
    NoneFactory();
}
