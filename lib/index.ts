/**
 * Checks if the given value is an array.
 * @param v - The value to check.
 * @returns {boolean} - Returns `true` if the value is an array, otherwise `false`.
 */
export const isArray = <T>(v: unknown): v is T[] =>
  Object.prototype.toString.call(v) === "[object Array]";

/**
 * Checks if the value is empty for various data types including null, undefined, arrays, objects, booleans, and numbers.
 * @param v - The value to check.
 * @returns {boolean} - Returns true if the value is considered empty, otherwise false.
 */
export const isEmpty = (
  v: null | undefined | boolean | number | object | unknown[]
): boolean => {
  if (v == null) {
    return true; // null and undefined are empty
  }

  // Check for array-like objects (including arrays and strings)
  if (Array.isArray(v) || typeof v === "string") {
    return v.length === 0; // Check for empty arrays or strings
  }

  // Check for booleans (false is considered empty)
  if (typeof v === "boolean") {
    return false; // A boolean is not considered empty
  }

  // Check for numbers (NaN is considered empty)
  if (typeof v === "number") {
    return isNaN(v); // NaN is empty, other numbers are not
  }

  // Check for objects (empty object is considered empty)
  if (typeof v === "object") {
    return Object.keys(v).length === 0; // Empty object has no keys
  }

  return false; // Default return for other data types like functions, etc.
};

/**
 * Removes duplicate elements from the given value.
 * Works for arrays, objects, and strings.
 * @param value - The value from which duplicates need to be removed.
 * @return {any} - Returns the value with duplicates removed (if applicable).
 */
export const removeDuplicates = (value: any): any => {
  if (Array.isArray(value)) {
    // Remove duplicates from an array
    return value.filter((item, index, self) => self.indexOf(item) === index);
  }

  if (typeof value === "string") {
    // Remove duplicate characters from a string
    return value
      .split("")
      .filter((item, index, self) => self.indexOf(item) === index)
      .join("");
  }

  if (typeof value === "object" && value !== null) {
    // Remove duplicate values from an object (shallow comparison)
    const uniqueObject: { [key: string]: any } = {};
    Object.keys(value).forEach((key) => {
      if (!uniqueObject.hasOwnProperty(key)) {
        uniqueObject[key] = value[key];
      }
    });
    return uniqueObject;
  }

  // If the value is a primitive type (like number, boolean), return as is (no duplicates possible)
  return value;
};

/**
 * reverse a string
 * @param str
 * @returns
 */
export const reverseString = (str: string) => {
  return str.split("").reverse().join("");
};

/**
 * [{id: 1}, {id: 2}] to {'1':{id: 1}, '2': {id: 2}}
 * @param arr
 * @param idKey
 * @returns
 */
export const arrayToObject = <T>(
  arr: T[],
  idKey: string | ((item: T, index: number) => string)
): { [key: string]: T } => {
  const r: { [key: string]: T } = {}; // Explicitly defining the result object type
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    const item = arr[i];

    // Handle the case where idKey is a function
    const id: string =
      typeof idKey === "function"
        ? idKey(item, i)
        : String(item[idKey as keyof T]);

    r[id] = item;
  }

  return r;
};

/**
 * Removes specified keys from an object and returns a new object with the remaining keys.
 * Example: { id: 1, name: 'John', age: 30 } with keys ['age'] becomes { id: 1, name: 'John' }.
 * @param obj - The object from which to exclude keys.
 * @param keys - An array of keys to exclude from the object.
 * @returns A new object with the specified keys excluded.
 */
export const omitKeys = <T extends object>(
  obj: T,
  keys: string[]
): Partial<T> => {
  let keysSet = new Set(keys); // Convert keys array to Set for faster lookup
  const r: Partial<T> = {}; // Use Partial to store the filtered object
  for (const key in obj) {
    if (!keysSet.has(key)) {
      // If the key is not in the keys array
      r[key] = obj[key]; // Add it to the result object
    }
  }
  return r; // Return the filtered object
};

/**
 * Finds the difference between two arrays or collections. It excludes values found in the second array from the first.
 * Works for arrays, strings, and other iterable objects.
 * @param value1 - The first collection (array, string, or object).
 * @param value2 - The second collection (array, string, or object).
 * @returns A new collection that contains the elements from `value1` that are not in `value2`.
 */
export const difference = <T>(value1: T, value2: T): T => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    // Handle arrays: Remove items from value1 that are in value2
    return value1.filter((item) => !value2.includes(item)) as T;
  }

  if (typeof value1 === "string" && typeof value2 === "string") {
    // Handle strings: Return characters in value1 not in value2
    return value1
      .split("")
      .filter((char) => !value2.includes(char))
      .join("") as T;
  }

  if (typeof value1 === "object" && typeof value2 === "object") {
    // Handle objects: Return keys and values in value1 not in value2
    const result: any = {};
    for (const key in value1) {
      if (value2 && !value2.hasOwnProperty(key)) {
        result[key] = value1[key];
      }
    }
    return result as T;
  }

  // Default case: Return the first value if no specific handling is found
  return value1;
};

/**
 * Sort callback function for array sort function with possibility for reverse order and primer.
 * @param field
 * @param reverse
 * @param primer
 */
export const arrSort = (
  field: string,
  reverse: boolean = false,
  primer: any = null
) => {
  const key = primer
    ? function (x: { [key: string]: any }) {
        return primer(x[field]);
      }
    : function (x: { [key: string]: any }) {
        return x[field];
      };
  const reverseOrder = !reverse ? 1 : -1;
  return function (a: any, b: any) {
    // @ts-ignore
    return (a = key(a)), (b = key(b)), reverseOrder * ((a > b) - (b > a));
  };
};

// const users = [
//     { name: 'Alice', age: 25 },
//     { name: 'Bob', age: 30 },
//     { name: 'Charlie', age: 20 }
//   ];

//   // Sort by 'name' in ascending order
//   const sortedByNameAsc = users.sort(sort('name'));
//   console.log(sortedByNameAsc);

/**
 * Removes all keys with value null.
 * @param o
 * @return {*} The filtered object without keys having null values.
 */
export const removeNullValues = <T extends object>(
  o: T
): { [K in keyof T]?: T[K] } => {
  return Object.entries(o).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key as keyof T] = value; // Explicitly cast to the correct key type
    }
    return acc;
  }, {} as { [K in keyof T]?: T[K] });
};

/**
 * Checks if value is valid url.
 * @param value
 * @return {boolean}
 */
export const isUrl = (value: string): boolean => {
  let expression =
    /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  return expression.test(String(value).toLowerCase());
};

/**
 * Type guard to check if a value is a string.
 * @param value
 * @return {boolean}
 */
const isString = (value: unknown): value is string => typeof value === "string";

/**
 * Checks if a value is a valid image URL.
 * @param url
 * @return {boolean}
 */
export const isImageUrl = (url: unknown): boolean => {
  return (
    isString(url) && url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) !== null
  );
};

/**
 * Deep clones an object or array, creating a completely independent copy.
 * Example: If you need a deep copy of a nested object to avoid mutating the original object.
 * @param obj - The object or array to clone.
 * @returns A new object or array that is a deep clone of the input.
 */
export const cloneDeep = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * Example: "hello world" becomes "Hello world".
 * @param str - The string to capitalize.
 * @returns A new string with the first letter capitalized.
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Parses the query string of a URL into an object of key-value pairs.
 * Example: "https://example.com?name=John&age=30" becomes { name: "John", age: "30" }.
 * @param url - The URL containing the query string to parse.
 * @returns An object containing the query parameters as key-value pairs.
 */
export const getQueryParams = (url: string): Record<string, string> => {
  const urlObj = new URL(url);
  const params: Record<string, string> = {};

  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

/**
 * Formats a number as a currency string.
 * Example: 1234567.89 becomes "$1,234,567.89" (US dollar format).
 * @param amount - The number to format.
 * @param locale - The locale to format in (e.g., 'en-US' for US currency format).
 * @param currency - The currency symbol (e.g., 'USD' for US dollars).
 * @returns The formatted currency string.
 */
export const formatCurrency = (
  amount: number,
  locale: string = "en-US",
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Recursively flattens an array to a single level.
 * Example: [[1, [2, 3]], 4] becomes [1, 2, 3, 4].
 * @param arr - The array to flatten.
 * @returns A new array with all nested arrays flattened.
 */
export const flattenDeep = (arr: any[]): any[] => {
  return arr.reduce(
    (acc: any[], val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
};

/**
 * Validates if a given string is a valid email address.
 * Example: "test@example.com" is valid, "invalid-email" is not.
 * @param email - The string to check.
 * @returns True if the string is a valid email address, false otherwise.
 */
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const mergeArraysBy = <T>(
  array1: Array<T>,
  array2: Array<T>,
  checker: (a: T, b: Array<T>) => boolean
): Array<T> => {
  return array1.filter((element) => checker(element, array2)).concat(array2);
};

/**
 * returns the argument wrapped in an array if it isn't array itself
 * @param {T | Array<T>} arg
 * @returns {Array<T>}
 * @example
 * const apple = "Apple";
 * const fruits = toArray(apple); // ["Apple"]
 */
export const toArray = <T>(arg: T | Array<T>): Array<T> => {
  return Array.isArray(arg) ? arg : [arg];
};

/**
 * returns stringified value for the given argument
 * @param {*} arg
 * @returns {string}
 * @example
 * const submitData = toString(formData);
 */
export const toString = (arg: any): string => {
  if (typeof arg === "object" && arg !== null) {
    return JSON.stringify(arg);
  }
  return String(arg);
};

/**
 * returns number of words in a given text
 * @param {string} text
 * @returns {number}
 * @example
 * const article = find(document, 'aricle');
 * const articleWords = getWordCount(article.innerText);
 */
export const getWordCount = (text: string): number => {
  return text.split(" ").length;
};

/**
 * function to convert texts to camelCase for example ti generate attribute names
 *
 * @param {string} str - sequence of letters, dashes and spaces to be converted to camelCase
 *
 * @returns {string}
 * @example
 * toCamelCase("some-text") === "someText";
 * toCamelCase("some other text") === "someOtherText";
 */
export const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(-+|\s+)[a-z]/g, (txt) => txt.toUpperCase())
    .replace(/(-|\s)+/g, "");
};

/**
 * converts the provided string to a kebab case (kebab-case)
 * @example
 *   toKebabCase("keyValuePair") === "key-value-pair"
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export const toKebabCase = (str: string): string => {
  return str.replace(
    /[A-Z]/g,
    (match: string) => `-${match.toLocaleLowerCase()}`
  );
};

/**
 * Converts an object into an array of its values.
 * Example: { a: 1, b: 2 } becomes [1, 2].
 * @param obj - The object to convert.
 * @returns An array of the object's values.
 */
export const objectToArray = <T>(obj: { [key: string]: T }): T[] => {
  return Object.values(obj);
};

/**
 * Inverts the keys and values of an object.
 * Example: { a: 1, b: 2 } becomes { '1': 'a', '2': 'b' }.
 * @param obj - The object to invert.
 * @returns An inverted object with keys and values swapped.
 */
export const invertObject = (obj: {
  [key: string]: any;
}): { [key: string]: string } => {
  const result: { [key: string]: string } = {};
  for (const key in obj) {
    result[obj[key]] = key;
  }
  return result;
};

/**
 * Filters an array of objects by a specific value in a given key.
 * Example: [{ id: 1, active: true }, { id: 2, active: false }] by 'active' and true becomes [{ id: 1 }].
 * @param array - The array to filter.
 * @param key - The key to filter by.
 * @param value - The value to match.
 * @returns A filtered array.
 */
export const filterByValue = <T, K extends keyof T>(
  array: T[],
  key: K,
  value: T[K]
): T[] => {
  return array.filter((item) => item[key] === value);
};
