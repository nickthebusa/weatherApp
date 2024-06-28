import axios, { AxiosResponse, AxiosError } from 'axios';


export async function fetchForecastData(url: string): Promise<AxiosResponse> {
  return axios
    .get(url)
    .then((res: AxiosResponse) => {
      return res
    })
    .catch((err: AxiosError) => {
      console.log(err);
      // must throw error because TS expects a return type of AxiosError
      throw err;
    })
}