import { useQuery } from "@tanstack/react-query";

//fetches
import { fetchLocationData } from "../fetches/fetchLocationData.ts";
import { fetchForecastData } from "../fetches/fetchForecastData.ts";

//types
import { Coords } from '../interfaces/Coords.ts';

export function useLocationData(coords: Coords) {

  const locationData = useQuery({
    queryKey: ["location-data", coords],
    queryFn: () => fetchLocationData(coords),
    refetchInterval: 60000
  })

  if (locationData.isLoading) {
    return [];
  } else if (locationData.isError) {
    return [];
  } 

  return [locationData?.data];
}

export function useForecastData(url: string) {

  const forecastData = useQuery({
    queryKey: ["forecast-data"],
    queryFn: () => fetchForecastData(url),
    refetchInterval: 60000
  })

  if (forecastData.isLoading) {
    return [];
  } else if (forecastData.isError) {
    return [];
  }

  return [forecastData?.data];
}

export function useForecastHourly(url: string) {
  
  const forecastHourly = useQuery({
    queryKey: ["forecast-hourly"],
    queryFn: () => fetchForecastData(url),
    refetchInterval: 60000
  })

  if (forecastHourly.isLoading) {
    return [];
  } else if (forecastHourly.isError) {
    return [];
  }

  return [forecastHourly?.data];
}
