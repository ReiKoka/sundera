"use strict";

import { getProducts } from "./../../services/getProducts";
import { renderProducts } from "./../renderProducts";
import { getProductById } from "./../../services/getProductById";
import { renderSingleProduct } from "../renderSingleProduct";
import { getLocation } from "../../services/getLocation";
import { addToCart, getCart } from "../cartState";
import { Notyf } from "notyf";

// Update CartItems Count
export const updateCartItemsCount = () => {
  const cartItemsNumber = document.querySelector(".cart-items-number");
  if (cartItemsNumber) {
    cartItemsNumber.textContent = getCartItemsNumber();
  }
};

// Init All Products
export const initProducts = async (featured) => {
  const featuredProducts = await getProducts(featured);
  renderProducts(featuredProducts);
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

// Get Cart Items Number
export const getCartItemsNumber = () => {
  return getCart()
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);
};

// Format currency to $x.yy
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// Get location data
export const getLocationData = async () => {
  try {
    const locationData = await getLocation();
    return locationData;
  } catch (error) {
    console.error("Error getting location:", error);
  }
};

// Export location variable
export const location = await getLocationData();

// Calculate Shipping function
export const calculateShipping = (value) => {
  return value * 0.1;
};

// Calculate review average
export const calculateAverage = (ratingsArr) => {
  return ratingsArr && ratingsArr.length > 0
    ? ratingsArr.reduce((acc, curr) => acc + curr, 0) / ratingsArr.length
    : 0;
};

// Setup Color Buttons
export const setupColorButtons = (buttons, product) => {
  const stockDisplayElement = document.querySelector(".stock-display");

  buttons.forEach((button, i) => {
    button.style.backgroundColor = product.colors[i].color;

    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("focused"));
      button.classList.add("focused");

      const selectedColor = product.colors[i];
      stockDisplayElement.textContent = `${selectedColor.inStock} available`;
    });
  });
};

// Add product to cart handler
export const addProductHandler = (products, getQuantity) => {
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  if (addToCartBtns.length === 1) {
    addToCartBtns[0].addEventListener("click", () => {
      const quantitySelected = getQuantity() || 1;
      addToCart(products[0], quantitySelected);
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

      const selectedProduct = products.find(
        (p) => Number(p.id) === Number(productId)
      );

      if (selectedProduct) {
        addToCart(selectedProduct, 1);
        notyf.success(`1 ${selectedProduct.title} added successfully!`);
        updateCartItemsCount();
      }
    });
  });
};

// Update Quantity Buttons
export const updateQuantityHandler = (updateQuantity) => {
  const addOrRemoveButtons = document.querySelectorAll(".quantity-button");
  const quantityDisplay = document.querySelector(".quantity-display");

  addOrRemoveButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      let quantity;

      if (e.currentTarget.classList.contains("quantity-add")) {
        quantity = updateQuantity(1);
      }

      if (e.currentTarget.classList.contains("quantity-remove")) {
        quantity = updateQuantity(-1);
      }
      quantityDisplay.textContent = quantity;
    })
  );
};
