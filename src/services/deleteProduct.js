import { URL } from "../js/utils/constants";

export const deleteProduct = async (id) => {
  if (!id) return;

  try {
    const response = await fetch(`${URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to delete product");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
