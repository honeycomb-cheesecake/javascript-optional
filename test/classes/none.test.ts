import INone from "../../src/classes/none";

test("none interface returns isDefined as false", () =>
  expect(new INone().isDefined()).toBe(false)
);

test("none interface returns isEmpty as true", () =>
  expect(new INone().isDefined()).toBe(false)
);

test("none interface throws error for `.getOrError(...)`", () =>
  expect(() => new INone().getOrError(new Error("None shall throw error."))).toThrowError()
);
