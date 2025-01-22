import { URL } from "../utils/constants";

export const getFeaturedProducts = async () => {
  try {
    const response = await fetch(
      `${URL}/products?_embed=reviews&featured=true`
    );
    if (!response.ok) throw new Error(`Failed to get featured products!`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
