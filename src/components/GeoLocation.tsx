import { useState, useEffect } from 'react';

// components
import CurrentWeather from './CurrentWeather.tsx';
import ForecastList from './ForecastList.tsx';
import HourlyList from './HourlyList.tsx';
import Time from './Time.tsx';
import ThemeSwitch from './ThemeSwitch.tsx';

// types
import { Coords } from '../interfaces/Coords.ts';

// // hooks
import { useLocationData } from '../hooks/useFetch.ts';


function GeoLocation() {

  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [celsius, setCelsius] = useState<boolean>(false);

  const [locationData] = useLocationData(userLocation);


  // gets the user's location
  useEffect(() => {
    if (!userLocation && navigator.geolocation) {
      getUserLocation();
    }

    function resize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);

  }, [userLocation, setScreenSize])


  function getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // if position
        (pos: GeolocationPosition) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ latitude: latitude, longitude: longitude });
        },
        // if error getting position
        (error) => {
          const errors = [
            "PERMISSION_DENIED: The acquisition of the geolocation information failed because the page didn't have the necessary permissions, for example because it is blocked by a Permissions Policy",
            "POSITION_UNAVAILABLE : The acquisition of the geolocation failed because at least one internal source of position returned an internal error.",
            "TIMEOUT: The time allowed to acquire the geolocation was reached before the information was obtained."
          ]
          alert(errors[error.code - 1]);
          console.error("Error getting location: ", error);
        }
      )
    } else {
      console.error('Geolocation not supported');
    }
  }

  function headerLocation() {
    if (locationData && locationData.data) {
      const city = locationData.data.properties.relativeLocation.properties.city as string;
      const state = locationData.data.properties.relativeLocation.properties.state as string;
      return (
        <div className='heading-div'>
          {
            screenSize > 600 ?
              (<h2 className='weather-in-header'>Weather in {city}, {state} </h2>) :
              (<h2 className='weather-in-header'>{city}, {state} </h2>)
          }
          <div className='absolute-position-div'>
            <ThemeSwitch />
            <Time />
          </div>
        </div>
      )
    }
  }

  function currentWeather() {
    if (locationData && locationData.data) {
      const myForecast = locationData.data.properties.forecast as string;
      const myForecastHourly = locationData.data.properties.forecastHourly as string;
      return (
        <CurrentWeather
          urlForecast={myForecast}
          urlForecastHourly={myForecastHourly}
          celsius={celsius}
          setCelsius={setCelsius}
        />
      )
    }
  }

  function hourlyList() {
    if (locationData && locationData.data) {
      const myForecast = locationData.data.properties.forecast as string;
      const myForecastHourly = locationData.data.properties.forecastHourly as string;
      return (
        <HourlyList
          urlForecast={myForecast}
          urlForecastHourly={myForecastHourly}
          celsius={celsius}
          setCelsius={setCelsius}
        />
      )
    }
  }

  function forecastList() {
    if (locationData && locationData.data) {
      const myForecast = locationData.data.properties.forecast as string;
      return (
        <ForecastList
          urlForecast={myForecast}
          celsius={celsius}
          setCelsius={setCelsius}
        />
      )
    }
  }

  return (
    <div className='geolocation'>
      {headerLocation()}
      {currentWeather()}
      {hourlyList()}
      {forecastList()}
    </div>
  )
}

export default GeoLocation;
