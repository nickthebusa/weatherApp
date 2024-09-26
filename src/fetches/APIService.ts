import axios, { AxiosResponse } from 'axios';
import { Coords } from '../interfaces/Coords';

const baseUrl = "http://api.weatherapi.com/v1";
const key = "b484764d09bc4fa0a75180103240609";

export default class APIService {

  static async RealtimeData(coords: Coords | null): Promise<AxiosResponse> {
    if (!coords) {
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
      .get(`${baseUrl}/current.json?key=${key}&q=${coords.latitude},${coords.longitude}`)
      .then(res => { return res })
      .catch(err => { throw err })
  }

  static async ForecastData(coords: Coords | null): Promise<AxiosResponse> {
    if (!coords) {
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
      .get(`${baseUrl}/forecast.json?key=${key}&q=${coords.latitude},${coords.longitude}&days=14`)
      .then(res => { return res })
      .catch(err => { throw err })
  }

  static async SearchAutocomplete(query: string): Promise<AxiosResponse> {
    if (!query) {
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
      .get(`${baseUrl}/search.json?key=${key}&q=${query}`)
      .then(res => { return res })
      .catch(err => { throw err })
  }
}
