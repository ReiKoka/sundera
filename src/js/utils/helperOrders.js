import { getOrders } from "../../services/getOrders";
import { renderOrders } from "../orders/renderOrders";

export const initOrders = async () => {
  const loader = document.querySelector(".loader-container");
  const orders = await getOrders();

  if (orders) {
    loader.classList.add("hide");
  }

  renderOrders(orders);
};
