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
      },
      fontFamily: {
        default: ["Poppins", "sans-serif"], //.. Opcional
      },
    },
  },
  plugins: [switchUiPlugin],
};
