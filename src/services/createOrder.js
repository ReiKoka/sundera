"use strict";
import { URL } from "../js/utils/constants";

export const createOrder = async (order) => {
  
  try {
    const response = await fetch(
      `${URL}/orders`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) throw new Error("Failed to add new order");

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
