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

Here are some of the utility functions available in this library: `helper-box`

| Name                                   | Description                                                                            |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| **`removeDuplicates`**                 | Remove duplicate values from an array, string, or object.                              |
| **`arrayToObject`**                    | Convert an array into an object using a specified key.                                 |
| **`omitKeys`**                         | Omit specified keys from an object.                                                    |
| **`difference`**                       | Find the difference between arrays, strings, or objects.                               |
| **`formatCurrency`**                   | Convert any number to a formatted currency.                                            |
| **`getQueryParams`**                   | Parse query parameters from a URL into an object.                                      |
| **`cloneDeep`**                        | Deeply clones an object or array, creating a new instance with the same values.        |
| **`isImageUrl`**                       | Checks if a URL points to an image based on its file extension.                        |
| **`toCamelCase`**                      | Converts a string from kebab-case or snake_case to camelCase.                          |
| **`objectToArray`**                    | Converts an object to an array of its key-value pairs.                                 |
| **`getFileExtension`**                 | Extracts the file extension from a file path or URL.                                   |
| **`validEmail`**                       | Validates if a given string is in a proper email format.                               |
| **`formatBytes`**                      | Converts a number of bytes into a human-readable string with units (e.g., KB, MB, GB). |
| **`isUrl`**                            | Checks if a given string is a valid URL.                                               |
| **`convertValueToHoursMinutesFormat	`** | Converts a given value to hours and minutes format.                                    |
| **`convertHoursToDaysHoursMinutes	`**   | Converts a value representing hours into days, hours, and minutes format.              |
| **`generateUUID	`**                     | Generates a universally unique identifier (UUID).                                      |
| **`flattenDeep	`**                      | Recursively flattens a nested array into a single-level array.                         |
| **`convertHtmlContentToPlainText	`**    | Converts HTML content to plain text by removing HTML tags.                             |

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

### omitKeys

```typescript
import { omitKeys } from "helper-box";

const user: User = {
  id: 1,
  name: "Alice",
  age: 25,
  email: "alice@example.com",
};

// Omit 'email' and 'age' keys from the user object
const userWithoutEmailAndAge = omitKeys(user, ["email", "age"]);
console.log(userWithoutEmailAndAge);
// Output: { id: 1, name: "Alice" }
```

### difference

```typescript
import { difference } from "helper-box";

const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7];

// Get the difference between array1 and array2
const arrayDiff = difference(array1, array2);
console.log(arrayDiff);
// Output: [1, 2, 3] (Items from array1 not in array2)

const string1 = "hello";
const string2 = "world";

// Get the difference between string1 and string2
const stringDiff = difference(string1, string2);
console.log(stringDiff);
// Output: "he" (Characters in string1 not in string2)

const user1 = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const user2 = {
  id: 1,
  name: "Alice",
};

// Get the difference between user1 and user2
const objectDiff = difference(user1, user2);
console.log(objectDiff);
// Output: { email: "alice@example.com" } (Keys in user1 not in user2)
```

### formatCurrency

```typescript
import { formatCurrency } from "helper-box";

const amount1 = 1000;
const formattedAmount1 = formatCurrency(amount1, "en-US", "USD");
console.log(formattedAmount1);
// Output: "$1,000.00" (Formatted currency for USD in en-US locale)

const amount2 = 1500;
const formattedAmount2 = formatCurrency(amount2, "de-DE", "EUR");
console.log(formattedAmount2);
// Output: "1.500,00 €" (Formatted currency for EUR in de-DE locale)

const amount3 = 2500;
const formattedAmount3 = formatCurrency(amount3);
// Output: "$2,500.00" (Formatted currency for USD in the default en-US locale)
console.log(formattedAmount3);
```

### getQueryParams

```typescript
import { getQueryParams } from "helper-box";

import { getQueryParams } from "helper-box";

// Example URL
const url1 = "https://example.com/?name=Alice&age=25&country=USA";

// Get query parameters from the URL
const params1 = getQueryParams(url1);
console.log(params1);
// Output: { name: "Alice", age: "25", country: "USA" }

const url2 = "https://example.com/?search=book&page=2&sort=asc";

// Get query parameters from the URL
const params2 = getQueryParams(url2);
console.log(params2);
// Output: { search: "book", page: "2", sort: "asc" }
```

## 🤔 How to contribute

Have an idea? Found a bug? Please raise to [ISSUES](https://github.com/avisek123/helper-box/issues).
Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given.

## 💖 Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

- Starring and sharing the projects you like 🚀
- If you're feeling especially charitable, please follow [avisek123](https://github.com/avisek123) on GitHub.

## About me

![WhatsApp Image 2024-09-19 at 7 49 24 PM](https://github.com/user-attachments/assets/a6204283-d754-44c8-a1c7-2cb0dffcd316)
