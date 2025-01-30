import { getProducts } from "../services/getProducts";
import { renderProducts } from "./renderProducts";
import { capitalizeFirstLetter, updateURLAndFetch } from "./utils/helpers";

export const renderFilters = (products) => {
  const productsMain = document.querySelector(".featured-products");
  const utilitiesContainer = document.querySelector(".utilities-container");
  const productsContainer = document.querySelector(
    ".featured-products-container"
  );

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  utilitiesContainer.innerHTML = `
    <form class="filters-form" id="filters-form">
      <div class="select-container">
        <select
          title="form-select"
          id="categories"
          class="form-select"
        >
          <option value="all">All Categories</option>
          ${uniqueCategories?.map(
            (category) =>
              `<option value="${category}">${capitalizeFirstLetter(
                category
              )}</option>`
          )}
        </select>
        <div class="icon arrow-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
  
      <div class="select-container">
        <select
          title="form-select"
          id="sort-by"
          class="form-select"
        >
          <option value="id">Default</option>
          <option value="price">Sort By Price (Lowest First)</option>
          <option value="-price">Sort By Price (Highest First)</option>
        </select>
        <div class="icon arrow-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      
      <button type="button" class="btn reset-filters-btn">Reset</button>
      <button type="submit" class="btn apply-filters-btn">Apply Filters</button>
    </form>
  `;

  productsMain.insertBefore(utilitiesContainer, productsContainer);

  const form = document.querySelector("#filters-form");
  const resetBtn = document.querySelector(".reset-filters-btn");
  const categorySelect = document.querySelector("#categories");
  const sortSelect = document.querySelector("#sort-by");

  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category") || "all";
  const sortFromUrl = urlParams.get("sort") || "id";

  categorySelect.value = categoryFromUrl;
  sortSelect.value = sortFromUrl;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = categorySelect.value;
    const sort = sortSelect.value;
    updateURLAndFetch({ category, sort });
  });

  resetBtn.addEventListener("click", () => {
    if (categorySelect.selectedIndex === 0 && sortSelect.selectedIndex === 0)
      return;

    categorySelect.selectedIndex = 0;
    sortSelect.selectedIndex = 0;

    const url = new URL(window.location.href);
    url.search = "";
    window.history.pushState({}, "", url);
    getProducts()
      .then((data) => {
        renderProducts(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  });
};
