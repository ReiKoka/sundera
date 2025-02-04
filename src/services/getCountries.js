"use strict";

export const getCountries = async () => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=name`
    );
    if (!response.ok) throw new Error(`Failed to get the list of countries`);

    const data = await response.json();
    const countries = data.map((item) => item.name.common).sort((a, b) => a.localeCompare(b));
    return countries;
  } catch (error) {
    console.error(error);
  }
};
