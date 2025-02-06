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