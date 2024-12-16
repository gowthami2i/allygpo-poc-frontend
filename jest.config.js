// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// export default {
//     testEnvironment: "node",
//     transform: {
//       "^.+\\.tsx?$": ["ts-jest", {}],
//     },
//     moduleNameMapper: {
//       '\\.(css|scss)$': 'identity-obj-proxy', 
   
//     },
//   };
/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom", // Change this from "node" to "jsdom"
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Ensure TypeScript files are transformed
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS/SCSS imports
  },
};
