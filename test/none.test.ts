import INone from "../src/classes/none";
import None from "../src/factories/none";

test("factory returns none interface", () => expect(None()).toBeInstanceOf(INone));
test("none interface returns isDefined as false", () => expect(None().isDefined()).toBe(false));
test("none interface returns isEmpty as true", () => expect(None().isDefined()).toBe(false));
