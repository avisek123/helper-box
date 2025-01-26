module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"], // Ensure test files are in the __tests__ folder
  transformIgnorePatterns: ["/node_modules/"],
};
