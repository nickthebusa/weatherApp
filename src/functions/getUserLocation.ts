import { Coords } from "../interfaces/Coords";

export async function getUserLocation(): Promise<Coords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        resolve({ latitude, longitude });
      },
      (error: GeolocationPositionError) => {
        const errors = [
          "Permission denied. The acquisition of the geolocation information failed because the page didn't have the necessary permissions.",
          "Position unavailable. The acquisition of the geolocation failed because at least one internal source of position returned an internal error.",
          "Timeout. The time allowed to acquire the geolocation was reached before the information was obtained."
        ];
        reject(new Error(errors[error.code - 1]));
      }
    );
  })
}
