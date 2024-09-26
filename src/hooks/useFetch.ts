import { useQuery } from "@tanstack/react-query";

//fetches
import { fetchLocationData } from "../fetches/fetchLocationData.ts";

//types
import { Coords } from '../interfaces/Coords.ts';
import APIService from "../fetches/APIService.ts";

export function useRealtimeData(coords: Coords | null) {
  const realtimeData = useQuery({
    queryKey: ["realtimeData", coords],
    queryFn: () => APIService.RealtimeData(coords),
    refetchInterval: 60000
  })
  if (realtimeData.isLoading) {
    return [];
  } else if (realtimeData.isError) {
    return [];
  }

  return [realtimeData?.data];
}

export function useForecastData(coords: Coords | null) {
  const forecastData = useQuery({
    queryKey: ["forecastData", coords],
    queryFn: () => APIService.ForecastData(coords)
  })
  if (forecastData.isLoading) {
    return [];
  } else if (forecastData.isError) {
    return [];
  }

  return [forecastData?.data];
}

export function useLocationData(coords: Coords | null) {

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

