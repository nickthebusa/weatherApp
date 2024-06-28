import axios, { AxiosResponse } from 'axios';

//types
import { Coords } from '../interfaces/Coords.ts';

export async function fetchLocationData(coords: Coords): Promise<AxiosResponse> {
  if (!(coords.latitude && coords.longitude)) {
    const blankResponse = {
      status: 200,
      data: null,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    return Promise.resolve(blankResponse as AxiosResponse);
  }
  return axios
    .get(`https://api.weather.gov/points/${coords.latitude},${coords.longitude}`)
    .then((res: AxiosResponse) => {
      return res
    })
    .catch((err: AxiosResponse) => {
      console.log(err);
      return err;
    })

}
