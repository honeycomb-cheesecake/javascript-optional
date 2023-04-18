import Option from "../interfaces/option";
import NoneFactory from "./none";
import SomeFactory from "./some";

/**
 * Optional interface that permits easy interaction with map values that can potentially be null/undefined where empty maps are also treated as None.
 */
export default function OptionEmptyMapFactory<K, V>(value?: Map<K, V> | null | undefined): Option<Map<K, V>> {
  return value !== null && value !== undefined && value.size > 0 ?
    SomeFactory(value) :
    NoneFactory();
}
