"use strict";

import { getProducts } from "./../../services/getProducts";
import { getProductById } from "./../../services/getProductById";
import { renderSingleProduct } from "../singleProduct/renderSingleProduct";
import { addToCart, getCart } from "../cart/cartState";
import { Notyf } from "notyf";
import { getProductsWithParams } from "../../services/getProductsWithParams";
import { searchProduct } from "../products/searchProduct";
import { renderProducts } from "../products/renderProducts";
import { renderFilters } from "../products/renderFilters";
import { getOrders } from "../../services/getOrders";

// Update CartItems Count - DOM
export const updateCartItemsCount = () => {
  const cartItemsNumber = document.querySelector(".cart-items-number");
  if (cartItemsNumber) {
    cartItemsNumber.textContent = getCartItemsNumber();
  }
};

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

// Get Cart Items Number
export const getCartItemsNumber = () => {
  return getCart()
    .map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);
};

export const initOrders = async () => {
  const orders = await getOrders();
  console.log(orders);
  return orders;
};

// Format currency to $x.yy
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// Returns an obj with main and fractional. Purely for styling purposes. Made this into a function to be reused everywhere
export const formatAndSplitPrice = (price) => {
  const formattedPrice = formatCurrency(price);
  const [main, fraction] = formattedPrice.split(".");
  return { main, fraction };
};

// Calculate review average
export const calculateAverage = (ratingsArr) => {
  return ratingsArr && ratingsArr.length > 0
    ? ratingsArr.reduce((acc, curr) => acc + curr, 0) / ratingsArr.length
    : 0;
};

// Setup Color Buttons
export const setupColorButtons = (buttons, product, onColorSelect) => {
  const stockDisplayElement = document.querySelector(".stock-display");

  buttons.forEach((button, i) => {
    button.style.backgroundColor = product.colors[i].color;

    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("focused"));
      button.classList.add("focused");

      const selectedColor = product.colors[i];
      onColorSelect(selectedColor.color);

      stockDisplayElement.textContent = `${selectedColor.inStock} available`;
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
      const quantitySelected = getQuantity() || 1;
      const colorSelected = getColor();
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

// Update Quantity Buttons
export const updateQuantityHandler = (updateQuantity, price) => {
  const addOrRemoveButtons = document.querySelectorAll(".quantity-button");
  const quantityDisplay = document.querySelector(".quantity-display");
  const totalValue = document.querySelector(".total-value");

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

      const formattedTotalPrice = formatAndSplitPrice(quantity * price);
      const { main: totalMainPrice, fraction: totalFractionalPrice } =
        formattedTotalPrice;
      totalValue.innerHTML = `<span>${totalMainPrice}</span>.<span>${totalFractionalPrice}</span>`;
    })
  );
};

// Calculate Subtotal
export const calculateSubtotal = (arr) => {
  return arr
    ?.map((item) => item.product.price * item.quantity)
    ?.reduce((acc, curr) => acc + curr, 0);
};

// Calculate Shipping
export const calculateShipping = (arr) => {
  if (calculateSubtotal(arr) < 30) return calculateSubtotal(arr) * 0.2;

  if (calculateSubtotal(arr) >= 30 && calculateSubtotal(arr) < 70)
    return calculateSubtotal(arr) * 0.1;

  if (calculateSubtotal(arr) >= 70 && calculateSubtotal(arr) < 120)
    return calculateSubtotal(arr) * 0.05;

  if (calculateSubtotal(arr) >= 120) return 0.0;
};

// Calculate Total
export const calculateTotal = (arr) => {
  return calculateSubtotal(arr) + calculateShipping(arr);
};

// Update Prices in DOM
export const updatePricesInDOM = (selector, calculatePrice, arr) => {
  const formattedPrice = formatAndSplitPrice(calculatePrice(arr));
  const mainPrice = formattedPrice.main;
  const fractionalPrice = formattedPrice.fraction;

  const priceContainer = document.querySelector(selector);

  if (priceContainer) {
    priceContainer.innerHTML = `<span>${mainPrice}</span>.<span>${fractionalPrice}</span>`;
  }
};

// Update DOM when cart gets cleared
export const updateDomOnCartClearance = (renderCart) => {
  const cartParentContainer = document.querySelector(".cart");
  while (cartParentContainer.firstChild) {
    cartParentContainer.removeChild(cartParentContainer.firstChild);
  }
  renderCart();
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const updateURLAndFetch = (newParams) => {
  console.log(newParams);
  const url = new URL(window.location.href);
  Object.keys(newParams).forEach((key) => {
    if (newParams[key]) {
      url.searchParams.set(key, newParams[key]);
    }
  });

  window.history.pushState({}, "", url);
  const params = Object.fromEntries(url.searchParams.entries());

  if (params.category === "all" && params.sort === "id") return;
  getProductsWithParams(params.category, params.sort)
    .then((data) => {
      renderProducts(data);
    })
    .catch((err) => console.error(err));
};

export const searchByTitle = (products, searchTerm) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
};

export const searchByCategory = (products, searchTerm) => {
  return products.filter((product) =>
    product.category.toLowerCase().includes(searchTerm)
  );
};

export const searchByDescription = (products, searchTerm) => {
  return products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm)
  );
};

export const rgbToHex = (rgbString) => {
  const rgbValues = rgbString.match(/\d+/g).map(Number);
  return `#${rgbValues
    .map((val) => val.toString(16).padStart(2, "0"))
    .join("")}`;
};
