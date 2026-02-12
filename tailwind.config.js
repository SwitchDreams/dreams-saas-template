import generated from "@headlessui/tailwindcss";

import defaultColors from "./app/frontend/constants/colors";

module.exports = {
  content: [
    "app/**/*.html.erb",
    "app/frontend/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
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
        default: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [generated({ prefix: "ui" })],
};
