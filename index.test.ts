import { isArray } from "./src/index";

describe("all helper function", () => {
  it("should return true for arrays", () => {
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray([])).toBe(true);
  });

  it("should return false for non-arrays", () => {
    expect(isArray(123)).toBe(false);
    expect(isArray("string")).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });
});
