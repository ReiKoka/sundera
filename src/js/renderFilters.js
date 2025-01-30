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
      
      <button type="button" class="btn reset-filters-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span>Reset</span>
      </button>
      <button type="submit" class="btn apply-filters-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
        </svg>
        <span>Apply Filters</span>
      </button>
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
