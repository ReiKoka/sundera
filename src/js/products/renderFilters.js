import { getProducts } from "../../services/getProducts";
import { renderProducts } from "./renderProducts";
import { capitalizeFirstLetter, updateURLAndFetch } from "../utils/helpersFunctions";
import { renderSelect } from "../renderSelect";

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
        ${renderSelect(
          "form-select",
          "categories",
          "form-select",
          uniqueCategories,
          "all",
          "All Categories"
        )}
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
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
