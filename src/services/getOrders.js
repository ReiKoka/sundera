"use strict";
import { URL } from "./../js/utils/constants";

export const getOrders = async () => {
  try {
    const response = await fetch(`${URL}/orders`);

    if (!response.ok) throw new Error("Failed to get all orders");

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
