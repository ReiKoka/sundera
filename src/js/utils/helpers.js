export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const getProductIdAndPassToUrl = () => {
  const products = document.querySelectorAll(".img-container");
  products.forEach((product) => {
    product.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      if (id) {
        window.location.href = `../products.html?id=${id}`;
      }
    });
  });
};