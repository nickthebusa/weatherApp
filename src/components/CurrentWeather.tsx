import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'

import "../CSS/CurrentWeather.css";

// functions
import { getTextColor } from "../functions/getTextColor.ts";

// hooks
import { useForecastData, useForecastHourly } from '../hooks/useFetch.ts';

interface CurrentWeatherProps {
  urlForecast: string;
  urlForecastHourly: string;
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
}

const apiUrl = "https://api.weather.gov";

function CurrentWeather(props: CurrentWeatherProps) {

  const [textColor, setTextColor] = useState<string>("");

  const [forecastData] = useForecastData(props.urlForecast);
  const [forecastHourly] = useForecastHourly(props.urlForecastHourly);

  const tempNumber = forecastHourly ? forecastHourly.data.properties.periods[0].temperature : '';
  const tempUnit = forecastHourly ? forecastHourly.data.properties.periods[0].temperatureUnit : ''
  const forecastIcon = forecastData ? forecastData.data.properties.periods[0].icon : '';
  const detailedForecast = forecastData ? forecastData.data.properties.periods[0].detailedForecast : '';
  const precipitation = forecastData ? forecastData.data.properties.periods[0].probabilityOfPrecipitation.value : 0;

  useEffect(() => {
    if (forecastIcon) {
      getTextColor(`${apiUrl}${forecastIcon}`).then((c: string) => {
        setTextColor(c);
      })
    }
  }, [forecastIcon])

  function fillBg() {
    if (forecastIcon) {
      return (
        <div className='current-weather-bg' style={{
          backgroundImage: `url(${apiUrl}${forecastIcon}`,
          backgroundPosition: '50% 50%'
        }}></div>
      )
    }
  }

  return (
    <div className='current-weather-cont' style={{ color: textColor }}>
      <div className='current-weather-div'>
        {fillBg()}
        {forecastData ?
          (
            <div className='forecast-current'>
              <h3>Current Weather</h3>
              {
                props.celsius ?
                  (<div className='temp-div'>
                    <p>{Math.round((tempNumber - 32) * (5 / 9))}</p>
                    <p title='switch to fahrenheit'
                      className='temp-unit'
                      onClick={() => props.setCelsius(!props.celsius)}>{"° C"}</p>
                  </div>) :
                  (<div className='temp-div'>
                    <p>{tempNumber}</p>
                    <p title='switch to celsius'
                      className='temp-unit'
                      onClick={() => props.setCelsius(!props.celsius)}>{`° ${tempUnit}`}</p>
                  </div>)
              }
              <p className='current-prec'><FontAwesomeIcon className='current-droplet' icon={faDroplet} />{precipitation || 0}%</p>
              <img className='forecast-icon' src={apiUrl.concat(forecastIcon)} alt="forecast-icon" />
              <p className='detailed-forecast'>{detailedForecast}</p>
            </div>
          ) :
          (<p>Loading...</p>)
        }
      </div>
    </div>
  )
}

export default CurrentWeather;
