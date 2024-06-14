const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
//const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const reactRecommended = require("eslint-plugin-react/configs/recommended");
const pluginTailwindcss = require("eslint-plugin-tailwindcss");

module.exports = [
  {
    files: ["app/frontend/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "tailwindcss/rules",
    plugins: {
      tailwindcss: pluginTailwindcss,
    },
    rules: {
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/enforces-shorthand": "error",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "error",
    },
  },
  reactRecommended,
  eslintPluginPrettierRecommended,
];
