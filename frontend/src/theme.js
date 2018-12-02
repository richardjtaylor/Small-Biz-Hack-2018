// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from "styled-theme/composer";

const theme = {};

theme.palette = {
  primary: ["#F7901E"], // glx orange
  secondary: ["#00a3d9"], // glx blue
  danger: ["#C65251"],
  alert: ["#EB9F00"],
  success: ["#519D33"],
  white: ["#ffffff"],
  black: ["#000000"],
  grayscale: ["#212121", "#616161", "#9e9e9e", "#bdbdbd", "#e0e0e0", "#ffffff"]
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: "Helvetica Neue, Helvetica, Roboto, sans-serif",
  pre: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  quote: "Georgia, serif"
};

theme.sizes = {
  maxWidth: "1100px"
};

export default theme;
