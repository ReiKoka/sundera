import { capitalizeFirstLetter } from "./utils/helpers";

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
    <div class="select-container">
      <select
        title="form-select"
        id="categories"
        class="form-select"
      >
        <option selected disabled>Select Category</option>
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
        <option selected disabled>Sort By</option>
        <option value="price">Sort By Price (Lowest First)</option>
        <option value="-price">Sort By Price (Highest First)</option>
      </select>
      <div class="icon arrow-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>

    <div class="input-container">
      <input
        type="text"
        id="search"
        class="form-input"
        autocomplete="off"
        placeholder=""
      />
      <label for="search" class="form-label">Search Products</label>
     <div class="icon search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
     </div>
    </div>
  `;

  productsMain.insertBefore(utilitiesContainer, productsContainer);
};
