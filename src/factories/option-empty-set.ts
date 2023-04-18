import Option from "../interfaces/option";
import NoneFactory from "./none";
import SomeFactory from "./some";

/**
 * Optional interface that permits easy interaction with set values that can potentially be null/undefined where empty set are also treated as None.
 */
export default function OptionEmptySetFactory<V>(value?: Set<V> | null | undefined): Option<Set<V>> {
  return value !== null && value !== undefined && value.size > 0 ?
    SomeFactory(value) :
    NoneFactory();
}
