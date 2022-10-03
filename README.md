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
const valueNone: IOption<string> = Option<string>(null);
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
const valueNone: IOption<string> = Option<string>(null);
valueSome.forEach(value => console.log(value)); // Prints "Some value.".
valueNone.forEach(value => console.log(value)); // No op.
```
