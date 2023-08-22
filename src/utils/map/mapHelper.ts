export const getUserPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation not available"));
    }
  });
};
