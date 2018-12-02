// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from "styled-theme/composer";

const theme = {};

theme.palette = {
  primary: ["#05728f"], //
  secondary: ["#00a3d9"], // glx blue
  danger: ["#C65251"],
  alert: ["#EB9F00"],
  success: ["#519D33"],
  white: ["#ffffff"],
  black: ["#000000"],
  grayscale: [
    "#212121",
    "#616161",
    "#4c4c4c",
    "#9e9e9e",
    "#bdbdbd",
    "#e0e0e0",
    "#ffffff"
  ]
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: "'Titillium Web', sans-serif"
};

theme.sizes = {
  maxWidth: "1100px"
};

export default theme;
