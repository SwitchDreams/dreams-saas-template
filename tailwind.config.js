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
      curvature: {
        md: 0, // Configura a curvatura dos componentes
        full: 0,
      },
      colors: {
        ...colors,
        ...defaultColors,
        btn: {
          primary: {
            bg: defaultColors.primary["950"],
            hover: defaultColors.primary["900"],
            active: defaultColors.primary["800"],
            focus: defaultColors.primary["950"],
            text: defaultColors.secondary["25"],
          },
          outline: {
            bg: "transparent",
            hover: defaultColors.primary["50"],
            active: defaultColors.primary["100"],
            focus: defaultColors.secondary["25"],
            text: defaultColors.primary["800"],
          },
          invisible: {
            bg: defaultColors.secondary["25"],
            hover: defaultColors.primary["50"],
            active: defaultColors.primary["100"],
            focus: defaultColors.primary["white"],
            text: defaultColors.primary["800"],
          },
        },
        avatar: {
          primary: {
            bg: defaultColors.primary["25"],
            text: defaultColors.secondary["400"],
          },
          gray: {
            bg: defaultColors.primary["100"],
            text: defaultColors.primary["600"],
          },
        },
        tab: {
          border: defaultColors.primary["500"],
          text: defaultColors.primary["500"],
          selectedBorder: defaultColors.primary["950"],
          selectedText: defaultColors.primary["950"],
        },
        slider: {
          bg: defaultColors.primary["300"],
          accent: defaultColors.primary["300"],
          hover: defaultColors.primary["400"],
        },
        input: {
          caret: defaultColors.secondary["400"],
          focus: defaultColors.primary["900"],
        },
        checkbox: {
          primary: {
            border: defaultColors.secondary["200"],
            checked: defaultColors.primary["950"],
            hover: defaultColors.primary["900"],
          },
        },
      },
      fontFamily: {
        default: ["Poppins", "sans-serif"], //.. Opcional
      },
    },
  },
  plugins: [switchUiPlugin],
};
