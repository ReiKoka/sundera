"use strict";

import Glide from "@glidejs/glide";

import { switchTheme } from "./js/switchTheme.js";
import { initProducts, updateCartItemsCount } from "./js/utils/helpers.js";

const config = {
  type: "slider",
  perView: 1,
  autoplay: 10000,
  hoverpause: true,
};

new Glide(".glide", config).mount();
switchTheme();

const init = () => {
  initProducts(true);
  updateCartItemsCount();
};

init();

// {
//   "id": "c205",
//   "firstName": "Rei",
//   "lastName": "Koka",
//   "country": "Albania",
//   "address": "Rruga Pjeter Budi",
//   "apartment": "P19 Ap 4/2",
//   "city": "Tirane",
//   "postcode": "1057",
//   "email": "reikoka1@outlook.com",
//   "phoneNumber": "0688161541",
//   "products": [
//     {
//       "id": "83ab",
//       "title": "Rambler® 30 oz Stackable Cup",
//       "quantity": 5,
//       "color": "#38219B",
//       "pricePerOne": 15,
//       "totalPrice": 75,
//       "image": "https://www.yeti.com/on/demandware.static/-/Sites-siteCatalog_Yeti_US/default/dw858ffac3/200380-Category-Header-Tumblers-Social-1200x6300.jpg"
//     },
//     {
//       "id": "83ab",
//       "title": "Rambler® 30 oz Stackable Cup",
//       "quantity": 5,
//       "color": "#94e105",
//       "pricePerOne": 15,
//       "totalPrice": 75,
//       "image": "https://www.yeti.com/on/demandware.static/-/Sites-siteCatalog_Yeti_US/default/dw858ffac3/200380-Category-Header-Tumblers-Social-1200x6300.jpg"
//     },
//     {
//       "id": "e123",
//       "title": "Laptop Backpack",
//       "quantity": 3,
//       "color": "#343A40",
//       "pricePerOne": 40,
//       "totalPrice": 120,
//       "image": "https://images.unsplash.com/photo-1667411424594-672f7a3df708?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     }
//   ],
//   "subtotal": 270,
//   "shipping": 0,
//   "total": 270
// },
// {
//   "id": "e705",
//   "firstName": "Rei",
//   "lastName": "Koka",
//   "country": "Albania",
//   "address": "Rruga Pjeter Budi",
//   "apartment": "P19 Ap 4/2",
//   "city": "Tirane",
//   "postcode": "1057",
//   "email": "reikoka1@outlook.com",
//   "phoneNumber": "0688161541",
//   "products": [
//     {
//       "id": "83ab",
//       "title": "Rambler® 30 oz Stackable Cup",
//       "quantity": 1,
//       "color": "#38219B",
//       "pricePerOne": 15,
//       "totalPrice": 15,
//       "image": "https://www.yeti.com/on/demandware.static/-/Sites-siteCatalog_Yeti_US/default/dw858ffac3/200380-Category-Header-Tumblers-Social-1200x6300.jpg"
//     }
//   ],
//   "subtotal": 15,
//   "shipping": 3,
//   "total": 18
// }
