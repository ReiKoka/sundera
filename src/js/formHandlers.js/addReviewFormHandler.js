"use strict";

import { createReview } from "../../services/createReview";

export const addReviewFormHandler = (modal) => {
  const form = document.querySelector(".form.leave-review-form");

  const notyf = new Notyf({
    position: { x: "center", y: "top" },
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const newReview = { ...data, rating: Number(data.rating) };
    createReview(newReview);
    notyf.success("New review added");
    modal.style.display = "none";
  });
};
