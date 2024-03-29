![npm (scoped)](https://img.shields.io/npm/v/@honeycomb-cheesecake/optional?style=for-the-badge)

# JavaScript Optional

## Summary

Optional module for JavaScript that provides interfaces to interact with potentially `null`/`undefined` values.

It aims to take away the effort and boilerplate coding around potentially `null` and `undefined` which if not properly handled can lead to numerous runtime errors and annoyed users. Null has famously been called a ["Billion Dollar Mistake"](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/) by Tony Hoare who introduced `null` references in ALGOL W back in 1965 because it was so easy to implement. `null` references are easy to drop into code, but can quickly add up to numerous errors during program runtime.

The JavaScript Optional package is heavily inspired by the [scala.Option](https://www.scala-lang.org/api/current/scala/Option.html) library, which really helps programmers deal with values which can be optionally set.

## Defensive Programming

Vanilla JavaScript/TypeScript allows for both `null` and `undefined` values to exist, meaning that if not properly handled `null` errors can occur, e.g. when a property is read and/or function is called on an undefined object. This leads to defensive programming to prevent such issues, e.g.

```typescript
var result = value ?? 1 * 4;
```

and

```typescript
if(value) {
  let property = value.property;
  let result = value.someFunction();
}
```

Where we are checking that `value` has been set prior to performing any operations with it. This can add considerable boilerplate and ultimately add a lot of protective scaffolding around the code that we actually want to write. The JavaScript Option package intends to remove this scaffolding, allowing us to write code which is safe during runtime.

## Installation

To install the package from the command line:

```
npm install @honeycomb-cheesecake/optional@[version]
```

To install via `package.json`:

```
"@honeycomb-cheesecake/optional": "[version]"
```

## Usage

### Objects

The JavaScript Option package exposes the `IOption` interface as well as the `ISome` and `INone` interfaces that implement.

| Interface | Implements | Description |
| --------- | ---------- | ----------- |
| `IOption` | | Interface to interact with potentially `null` and `undefined` values. |
| `ISome` | `IOption` | Interface for values which are set. |
| `INone` | `IOption` | Interface for values that have not been set. |

To create `ISome` and `INone`, respective factory methods `Some` and `None` are available:

```typescript
import { IOption, None, Some }
const some: IOption<string> = Some<string>("some value");
const none: IOption<number> = None<number>();
```

It is important to note that `ISome` doesn't accept `null` and/or `undefined` and will throw an error:

```typescript
import { IOption, Some }
const some: IOption<string[]> = Some<string[]>(["hello", "my", "dear"]); // Okay
Some<number[]>(null); // Throws error.
Some<string[]>(undefined); // Throws error.
```

In order to simplify the creation of optional values, an `Option` factory method is available and is recommended in most cases:

```typescript
import { IOption, Option }
const some:  IOption<string> = Option<string>("some value"); // Returns an ISome<string>.
const none1: IOption<string> = Option<string>(null);         // Returns an INone<string>.
const none2: IOption<string> = Option<string>(undefined);    // Returns an INone<string>.
```

Other helper factories have been included to facilitate development:

```typescript
import { IOption, Option, OptionEmptyString } from "@honeycomb-cheesecake/optional";
const some: IOption<string> = Option("");            // Empty string resolved to ISome<string>.
const none: IOption<string> = OptionEmptyString(""); // Empty string resolved to INone<string>.
some.forEach(value => console.log(value));  // Prints "".
none.forEach(value => console.log(value));  // No op.
```

```typescript
import { GetOrElse } from "@honeycomb-cheesecake/optional";
console.error(GetOrElse(10, 100))        // Prints 10.
console.error(GetOrElse(null, 100))      // Prints 100.
console.error(GetOrElse(undefined, 100)) // Prints 100.
```

```typescript
import { DoOtherwise } from "@honeycomb-cheesecake/optional";
console.log(DoOtherwise(100, (value: number) => `${value}`, () => "nothing"));       // Prints "100".
console.log(DoOtherwise(null, (value: number) => `${value}`, () => "nothing"));      // Prints "nothing".
console.log(DoOtherwise(undefined, (value: number) => `${value}`, () => "nothing")); // Prints "nothing".
```

### Functions

#### `id()`

Returns a unique identifier for the `IOption`.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>(null);
const resultSome: string = valueSome.id();
const resultNone: string = valueNone.id();
console.log(resultSome); // Prints id.
console.log(resultNone); // Prints id.
```

#### `isEmpty()`

Returns `true` if value is set (i.e. of type `ISome`), and returns `false` if value isn't set (i.e. of type `INone`).

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>(null);
const resultSome: boolean = valueSome.isEmpty();
const resultNone: boolean = valueNone.isEmpty();
console.log(resultSome); // Prints 'false'.
console.log(resultNone); // Prints 'true'.
```

#### `isDefined()`

Returns `false` if value is set (i.e. of type `ISome`), and returns `true` if value isn't set (i.e. of type `INone`).

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>(null);
const resultSome: boolean = valueSome.isDefined();
const resultNone: boolean = valueNone.isDefined();
console.log(resultSome); // Prints 'true'.
console.log(resultNone); // Prints 'false'.
```

#### `timestamp()`

Returns the epoch timestamp `number` of when the `IOption` value was set.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>();
const resultSome: number = valueSome.timestamp();
const resultNone: number = valueNone.timestamp();
console.log(resultSome); // Prints timestamp.
console.log(resultNone); // Prints timestamp.
```

#### `forEach()`

Performs an action on the value if set without returning a value. If not set, this is a no-op.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>();
valueSome.forEach(value => console.log(value)); // Prints "Some value.".
valueNone.forEach(value => console.log(value)); // No op.
```

#### `flatMap(func)`

Performs the specified action on the value of set and returns an `IOption` containing the result. The action specified needs to return an `IOption` which differs from `map()` which expects the value.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<number> = Option(1);
const valueNone: IOption<number> = Option<number>();
const flatMapSome: IOption<number> = valueSome.flatMap(value => Option(value * 10)); // `ISome` containing 10 (notice how the result of the transformation is wrapped in an `Option`).
const flatMapNone: IOption<number> = valueNone.flatMap(value => Option(value * 10)); // `INone` (notice how the result of the transformation is wrapped in an `Option`).
```

#### `map(func)`

Performs the specified action on the value of set and returns an `IOption` containing the result. The action specified needs to return the value which differs from `flatMap()` which expects an `Option` wrapping the value.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<number> = Option(1);
const valueNone: IOption<number> = Option<number>();
const mapSome: IOption<number> = valueSome.map(value => value * 10); // `ISome` containing 10.
const mapNone: IOption<number> = valueNone.map(value => value * 10); // `INone`.
```

#### `getOrElse(otherwiseValue)`

Returns the value if `ISome`, and returns the specified value if `INone`. Think of it as get with a default if not available.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>();
console.log(valueSome.getOrElse("Otherwise value."));  // Prints "Some value.".
console.log(valueNone.getOrElse("Otherwise value."));  // Prints "Otherwise value.".
```

#### `getOrError(otherwiseError)`

Returns the value if `ISome`, otherwise throws the specified error if `INone`. Think of this as almost like a validator of presence.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>();
console.log(valueSome.getOrError(new Error("Something went wrong.")));  // Prints "Some value.".
console.log(valueNone.getOrError(new Error("Something went wrong.")));  // Throws error as is `None`.
```

#### `getOrNull()`

Returns the value if `ISome`, and returns `null` if `INone`.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>();
console.log(valueSome.getOrNull());  // Prints "Some value.".
console.log(valueNone.getOrNull());  // Prints null.
```

#### `getOrUndefined()`

Returns the value if `ISome`, and returns `undefined` if `INone`.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>();
console.log(valueSome.getOrUndefined());  // Prints "Some value.".
console.log(valueNone.getOrUndefined());  // Prints undefined.
```

#### `doOtherwise(someFunc, noneFunc)`

Executes `someFunc` on the value if `ISome`, and `noneFunc` if a `INone`.

```typescript
import { IOption, Option } from "@honeycomb-cheesecake/optional";
const valueSome: IOption<string> = Option("Some value.");
const valueNone: IOption<string> = Option<string>();
console.log(valueSome.doOtherwise((value: number) => `${value}`, () => "nothing"));  // Prints "Some value.".
console.log(valueNone.doOtherwise((value: number) => `${value}`, () => "nothing"));  // Prints "nothing".
```
