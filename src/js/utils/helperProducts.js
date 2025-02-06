"use strict";

import { Notyf } from "notyf";
import { getProductById } from "../../services/getProductById";
import { getProducts } from "../../services/getProducts";
import { getProductsWithParams } from "../../services/getProductsWithParams";
import { renderFilters } from "../products/renderFilters";
import { renderProducts } from "../products/renderProducts";
import { searchProduct } from "../products/searchProduct";
import { renderSingleProduct } from "../singleProduct/renderSingleProduct";
import { addToCart, getCart } from "../cart/cartState";
import { updateCartItemsCount } from './helperCart';

// Init All Products
export const initProducts = async (featured) => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "";
  const sort = urlParams.get("sort") || "";
  const loader = document.querySelector(".loader-container");

  let products;

  if (category || sort) {
    products = await getProductsWithParams(category, sort);
  } else {
    products = await getProducts(featured);
  }

  if (products) {
    loader.classList.add("hide");
  }

  if (featured) {
    renderProducts(products);
    return;
  }

  searchProduct(products);
  renderFilters(products);
  renderProducts(products);
};

// Init Single Product
export const initSingleProduct = async () => {
  const product = await getProductById();
  document.title = product.title;
  renderSingleProduct(product);
};

// Get Product ID and Pass it to URL
export const getProductIdAndPassToUrl = () => {
  const products = document.querySelectorAll(".img-container");
  products.forEach((product) => {
    product.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      if (id) {
        window.location.href = `/../../../singleProduct.html?id=${id}`;
      }
    });
  });
};

// Add product to cart handler
export const addProductHandler = (products, getQuantity, getColor) => {
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  if (addToCartBtns.length === 1) {
    addToCartBtns[0].addEventListener("click", () => {
      const inStockEl = document.querySelector(".stock-display");
      const inStock = Number(inStockEl.textContent.split(" ")[0]);

      let quantitySelected = getQuantity() || 0;
      const colorSelected = getColor();
      const cart = getCart();
      const productExists = cart.some(
        (item) =>
          item.product.id === products[0].id && item.color === colorSelected
      );

      if ((quantitySelected === inStock) & productExists) {
        notyf.error(
          `Cannot add ${products[0].title} to cart. Not enough stock.`
        );
        return;
      }

      addToCart(products[0], quantitySelected, colorSelected);
      notyf.success(
        `${quantitySelected} ${products[0].title} added successfully!`
      );

      updateCartItemsCount();
    });

    return;
  }

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const productId = productCard.querySelector(".img-container").dataset.id;

      const selectedProduct = products.find((p) => p.id === productId);

      if (selectedProduct) {
        addToCart(selectedProduct, 1, selectedProduct.colors[0].color);
        notyf.success(`1 ${selectedProduct.title} added successfully!`);
        updateCartItemsCount();
      }
    });
  });
};
