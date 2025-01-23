<div align="center">
  <h1>
    <code>helper-box</code> 
  </h1>

  <div>A versatile library of utility functions, ready to use in both JavaScript and TypeScript projects..</div>

  <br />

  <!-- Badges -->

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/avisek123/helper-box/issues)
[![Maintained](https://badgen.net/badge/Maintained%20%3F/Yes%21/blue?icon=github)](https://github.com/avisek123/helper-box/issues)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/helper-box)
![npm](https://img.shields.io/npm/v/helper-box)

  <!-- BADGE:END -->

  <br />
    <pre>npm i <a href="https://www.npmjs.com/package/helper-box">helper-box</a></pre>
  <br />

</div>

## API

All the available utility function inside `helper-box`

| Name                   | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| **`removeDuplicates`** | Remove duplicate values from an array, string, or object. |
| **`arrayToObject`**    | Convert an array into an object using a specified key.    |
| **`omitKeys`**         | Omit specified keys from an object.                       |
| **`difference`**       | Find the difference between arrays, strings, or objects.  |
| **`formatCurrency`**   | Convert any number to a formatted currency.               |
| **`getQueryParams`**   | Parse query parameters from a URL into an object.         |

## Examples

### removeDuplicates

```typescript
import { removeDuplicates } from "helper-box";

// Array Example
const numbersArray = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = removeDuplicates(numbersArray);
console.log(uniqueNumbers);
// Output: [1, 2, 3, 4, 5]

// String Example
const text = "aabbccddeeff";
const uniqueText = removeDuplicates(text);
console.log(uniqueText);
// Output: "abcdef"

// Object Example
const object = { a: 1, b: 2, c: 2, d: 3, e: 1 };
const uniqueObject = removeDuplicates(object);
console.log(uniqueObject);
// Output: { a: 1, b: 2, d: 3 }
```

### arrayToObject

```typescript
import { arrayToObject } from "helper-box";

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const usersObject = arrayToObject(users);

console.log(usersObject);
// Output:
// {
//   "1": { id: 1, name: "Alice", age: 25 },
//   "2": { id: 2, name: "Bob", age: 30 },
//   "3": { id: 3, name: "Charlie", age: 35 }
// }
```
