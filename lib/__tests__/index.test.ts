import { isArray } from "../index";

describe("Utility Functions", () => {
  test("isArray should correctly identify arrays", () => {
    expect(isArray<number>([1, 2, 3])).toBe(true);
    expect(isArray<number>("not an array")).toBe(false);
  });
});
