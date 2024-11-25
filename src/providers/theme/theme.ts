import type { HEX } from "@/utils/color/types";

type ThemeType = { [K in string]: HEX | ThemeType };

const theme = {
  main: {
    "100": "#D9F2F7",
    "300": "#85BAD0",
    "500": "#5988A1",
    "700": "#284B63",
  },
  gray: {
    "100": "#F4F4F4",
    "300": "#EAEAEA",
    "500": "#C2C2C2",
    "700": "#858585",
    "900": "#353535",
  },
  sub: {
    "100": "#E0F7F1",
    "300": "#98D4CD",
    "500": "#6EA9A8",
    "700": "#3C6E71",
  },
  pink: {
    "100": "#FDF9F6",
    "300": "#F5E5E1",
    "500": "#E0C2C2",
    "700": "#A1616C",
  },
  red: {
    "100": "#FCE3D6",
    "300": "#EE9684",
    "500": "#DE6D62",
    "700": "#C83434",
  },
  blue: "#BCE8F0",
  dirt: "#CBC09F",
  white: "#FFFFFF",
  black: "#000000",
  brown: "#cbc09f",
} as const satisfies ThemeType;

export type Theme = typeof theme;

export default theme;
