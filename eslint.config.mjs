// eslint.config.mjs
import eslintConfigSwitchDreams from "@switchdreams/lint-config";

export default [
  ...eslintConfigSwitchDreams,
  {
    settings: {
      tailwindcss: {
        cssConfigPath: "app/frontend/entrypoints/application.css",
      },
    },
  },
  {
    // Add your overrides here
  },
];
