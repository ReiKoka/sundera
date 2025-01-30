import { renderProducts } from "./renderProducts";
import {
  searchByCategory,
  searchByDescription,
  searchByTitle,
} from "./utils/helpers";

export const searchProduct = (products) => {
  const searchInput = document.querySelector("#search");

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredByTitle = searchByTitle(products, searchTerm);
    const filteredByCategory = searchByCategory(products, searchTerm);
    const filteredByDescription = searchByDescription(products, searchTerm);

    const filteredProducts = [
      ...new Set([
        ...filteredByTitle,
        ...filteredByCategory,
        ...filteredByDescription,
      ]),
    ];

    renderProducts(filteredProducts);
  });
};
