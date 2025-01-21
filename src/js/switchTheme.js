"use strict";

let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.documentElement.classList.add("dark");
  localStorage.setItem("darkmode", "active");
};

const disableDarkMode = () => {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("darkmode", null);
};

export const switchTheme = () => {
  if (darkmode === "active") enableDarkmode();

  themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkMode();
  });
};
