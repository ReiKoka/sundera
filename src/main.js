import { switchTheme } from "./js/switchTheme.js";
import Glide from "@glidejs/glide";

const config = {
  type: "slider",
  perView: 1,
  autoplay: 10000,
  hoverpause: true,
};

new Glide(".glide", config).mount();
switchTheme();
