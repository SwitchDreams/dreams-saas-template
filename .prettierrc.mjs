// .prettierrc.mjs
import switchDreamsConfig from "@switchdreams/lint-config/prettier";

const config = {
  ...switchDreamsConfig,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./app/frontend/entrypoints/application.css",
};

export default config;
