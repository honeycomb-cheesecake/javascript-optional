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
