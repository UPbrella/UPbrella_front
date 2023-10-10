export const getUserPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity,
      });
    } else {
      reject(new Error("Geolocation not available"));
    }
  });
};
