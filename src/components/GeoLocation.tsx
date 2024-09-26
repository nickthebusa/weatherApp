import { useState, useEffect, useCallback } from 'react';

// components
import CurrentWeather from './CurrentWeather.tsx';
import SearchLocation from './SearchLocation.tsx';
import HeaderLocation from "./HeaderLocation.tsx";
import HourlyList from "./HourlyList.tsx";

// types
import { Coords } from '../interfaces/Coords.ts';

// // hooks
import { useRealtimeData, useForecastData } from '../hooks/useFetch.ts';

// functions
import { getUserLocation } from '../functions/getUserLocation.ts';

function GeoLocation() {

  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [celsius, setCelsius] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [realtimeData] = useRealtimeData(userLocation);
  const [forecastData] = useForecastData(userLocation);


  const handleLocationChange = useCallback(async () => {
    setLoading(true);
    try {
      const coords = await getUserLocation();
      setUserLocation(coords);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [])

  // gets the user's location
  useEffect(() => {
    if (!userLocation && navigator.geolocation) {
      handleLocationChange();
    }

    function resize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);

  }, [userLocation, setScreenSize, handleLocationChange])



  //function forecastList() {
  //  if (locationData && locationData.data) {
  //    const myForecast = locationData.data.properties.forecast as string;
  //    return (
  //      <ForecastList
  //        urlForecast={myForecast}
  //        celsius={celsius}
  //        setCelsius={setCelsius}
  //      />
  //    )
  //  }
  //}

  //      {forecastList()}


  return (
    <div className='geolocation'>

      <div className="errors">
        {error}
      </div>

      <HeaderLocation
        loading={loading}
        locationData={realtimeData?.data?.location || null}
        screenSize={screenSize}
      />
      <SearchLocation
        setUserLocation={setUserLocation}
        getUserLocation={getUserLocation}
      />
      <div className="forecast-modules">
        <CurrentWeather
          realtimeData={realtimeData?.data?.current || null}
          forecastData={forecastData?.data?.forecast?.forecastday[0]?.day || null}
          celsius={celsius}
          setCelsius={setCelsius}
        />
        <HourlyList
          forecastHourly={forecastData?.data?.forecast?.forecastday[0]?.hour || null}
          celsius={celsius}
          setCelsius={setCelsius}
        />
      </div>
    </div>
  )
}

export default GeoLocation;
