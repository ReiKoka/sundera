export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const url = `https://reverse-geocoder.p.rapidapi.com/v1/getCityByLocation?lat=${lat}&lon=${lng}&accept-language=en`;
          const options = {
            method: "GET",
            headers: {
              "x-rapidapi-key": "b07954a7a8mshe38bf7bb6b8ca59p1b8d28jsn1072fdcfbf08",
              "x-rapidapi-host": "reverse-geocoder.p.rapidapi.com",
            },
          };

          const response = await fetch(url, options);
          const result = await response.json();
          resolve(result.address);
        } catch (error) {
          reject(error);
        }
      }, (error) => {
        showError(error);
        reject(error);
      });
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}