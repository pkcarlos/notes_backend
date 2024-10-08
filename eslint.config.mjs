import globals from "globals";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',     // warn if equality checked w/ anything other than triple equals operator
      'no-trailing-spaces': 'error',    // prevent unneccesary trailing spaces
      'object-curly-spacing': [       // require space before/after curly braces
        'error', 'always'
      ],
      'arrow-spacing': [    // consisten use of whitespaces in function parameters of arrow functions
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',     // alows console.log statements
    },
  },
  {
    ignores: ["dist/**"],
  },
]

// import globals from "globals";
// import js from '@eslint/js';
// import stylisticJs from '@stylistic/eslint-plugin-js'

// export default [
//   js.configs.recommended,      // apply ESLint recommended settings before custom options
//   {
//     files: ["**/*.js"],
//     languageOptions: {
//       sourceType: "commonjs",
//       globals: {
//         ...globals.node,
//       },
//       ecmaVersion: "latest",
//     },
//     plugins: {
//       '@stylistic/js': stylisticJs
//     },
//     rules: {
//       '@stylistic/js/indent': [
//         'error',
//         2
//       ],
//       '@stylistic/js/linebreak-style': [
//         'error',
//         'unix'
//       ],
//       '@stylistic/js/quotes': [
//         'error',
//         'single'
//       ],
//       '@stylistic/js/semi': [
//         'error',
//         'never'
//       ],
//     },
//   },
// ]