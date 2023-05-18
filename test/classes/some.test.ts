import INone from "../../src/classes/none";
import ISome from "../../src/classes/some";

test("some interface returns isDefined as false", () =>
  expect(new ISome("value").isDefined()).toBe(true)
);

test("some interface returns isEmpty as true", () =>
  expect(new ISome("value").isDefined()).toBe(true)
);

test("some mapping to null value returns none", () =>
  expect(new ISome("value").map(_ => null)).toBeInstanceOf(INone)
);

test("some interface returns value for `.getOrError(...)`", () =>
  expect(new ISome("value").getOrError(new Error("Some shall NOT throw error."))).toBe("value")
);
