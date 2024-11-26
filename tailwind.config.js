import generated from "@headlessui/tailwindcss";
import { colors } from "@switchdreams/ui";
import switchUiPlugin from "@switchdreams/ui/dist/tailwind.plugin";

import defaultColors from "./app/frontend/constants/colors";

module.exports = {
  content: [
    "app/**/*.html.erb",
    "app/frontend/**/*.jsx",
    "./node_modules/@switchdreams/ui/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...defaultColors,
        btn: {
          primary: {
            bg: defaultColors.primary["300"],
            hover: defaultColors.primary["400"],
            active: defaultColors.primary["500"],
            focus: defaultColors.primary["300"],
            text: defaultColors.gray["white"],
          },
        },
      },
      fontFamily: {
        default: ["Poppins", "sans-serif"], //.. Opcional
      },
    },
  },
  plugins: [switchUiPlugin, generated({ prefix: "ui" })],
};
