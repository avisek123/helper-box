import {
  isArray,
  isEmpty,
  removeDuplicates,
  reverseString,
  arrayToObject,
  omitKeys,
  difference,
  arrSort,
  removeNullValues,
  isUrl,
  isImageUrl,
  cloneDeep,
  capitalize,
  getQueryParams,
  formatCurrency,
  flattenDeep,
  isEmail,
  mergeArraysBy,
  toArray,
  toString,
  getWordCount,
  toCamelCase,
  toKebabCase,
  objectToArray,
  invertObject,
  filterByValue,
  getFileExtension,
  validEmail,
} from "../index";

describe("Utility Functions", () => {
  test("isArray should correctly identify arrays", () => {
    expect(isArray<number>([1, 2, 3])).toBe(true);
    expect(isArray<number>("not an array" as unknown)).toBe(false);
  });

  test("isEmpty should correctly identify empty values", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(NaN)).toBe(true);
  });

  test("removeDuplicates should correctly remove duplicates", () => {
    expect(removeDuplicates([1, 1, 2, 3])).toEqual([1, 2, 3]);
    expect(removeDuplicates("aabbcc" as unknown as any[])).toBe("abc");
    expect(removeDuplicates({ a: 1, b: 1 })).toEqual({ a: 1, b: 1 });
  });

  test("reverseString should correctly reverse a string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  test("arrayToObject should convert array to object", () => {
    const input = [{ id: 1 }, { id: 2 }];
    const result = { "1": { id: 1 }, "2": { id: 2 } };
    expect(arrayToObject(input, "id")).toEqual(result);
  });

  test("omitKeys should remove specified keys from an object", () => {
    const input = { id: 1, name: "John", age: 30 };
    const result = { id: 1, name: "John" };
    expect(omitKeys(input, ["age"])).toEqual(result);
  });

  test("difference should return difference between collections", () => {
    expect(difference([1, 2, 3], [2])).toEqual([1, 3]);
    expect(difference("abc", "b")).toBe("ac");
  });

  test("arrSort should sort arrays based on field and reverse order", () => {
    const data = [{ field: 2 }, { field: 1 }];
    data.sort(arrSort("field"));
    expect(data).toEqual([{ field: 1 }, { field: 2 }]);
  });

  test("removeNullValues should remove null values from an object", () => {
    expect(removeNullValues({ a: 1, b: null })).toEqual({ a: 1 });
  });

  test("isUrl should validate URLs", () => {
    expect(isUrl("http://example.com")).toBe(true);
    expect(isUrl("invalid-url")).toBe(false);
  });

  test("isImageUrl should validate image URLs", () => {
    expect(isImageUrl("example.jpg")).toBe(true);
    expect(isImageUrl("example.txt")).toBe(false);
  });

  test("cloneDeep should deep clone objects", () => {
    const input = { a: 1, b: { c: 2 } };
    const clone = cloneDeep(input);
    expect(clone).toEqual(input);
    expect(clone).not.toBe(input);
  });

  test("capitalize should capitalize strings", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  test("getQueryParams should parse query strings", () => {
    const url = "https://example.com?name=John&age=30";
    expect(getQueryParams(url)).toEqual({ name: "John", age: "30" });
  });

  test("formatCurrency should format numbers as currency", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  test("flattenDeep should recursively flatten arrays", () => {
    expect(flattenDeep([1, [2, [3]]])).toEqual([1, 2, 3]);
  });

  test("isEmail should validate email addresses", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("invalid-email")).toBe(false);
  });

  test("mergeArraysBy should merge arrays by a condition", () => {
    const array1 = [{ id: 1 }];
    const array2 = [{ id: 2 }];
    const result = mergeArraysBy(
      array1,
      array2,
      (a, b) => !b.some((x) => x.id === a.id)
    );
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test("toArray should wrap non-array arguments in an array", () => {
    expect(toArray("string" as string | string[])).toEqual(["string"]);
    expect(toArray(["already array"])).toEqual(["already array"]);
  });

  test("toString should stringify values", () => {
    expect(toString({ key: "value" })).toBe('{"key":"value"}');
    expect(toString(123)).toBe("123");
  });

  test("getWordCount should count words in a string", () => {
    expect(getWordCount("hello world")).toBe(2);
  });

  test("toCamelCase should convert strings to camel case", () => {
    expect(toCamelCase("some-text" as string)).toBe("someText");
    expect(toCamelCase("some other text" as string)).toBe("someOtherText");
  });

  test("toKebabCase should convert strings to kebab case", () => {
    expect(toKebabCase("keyValuePair" as string)).toBe("key-value-pair");
  });

  test("objectToArray should convert objects to arrays", () => {
    expect(objectToArray({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  test("invertObject should invert object keys and values", () => {
    expect(invertObject({ a: 1, b: 2 })).toEqual({ "1": "a", "2": "b" });
  });

  test("filterByValue should filter arrays of objects by a key value", () => {
    const data = [
      { id: 1, active: true },
      { id: 2, active: false },
    ];
    expect(filterByValue(data, "active", true)).toEqual([
      { id: 1, active: true },
    ]);
  });

  test("getFileExtension should return file extensions", () => {
    expect(getFileExtension("file.txt")).toBe("txt");
    expect(getFileExtension("file" as string)).toBe("");
  });

  test("validEmail should validate email addresses", () => {
    expect(validEmail("test@example.com")).toBe(true);
    expect(validEmail("invalid-email" as string)).toBe(false);
  });
});
