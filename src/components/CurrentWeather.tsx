import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faSnowflake } from '@fortawesome/free-solid-svg-icons'

import "../CSS/CurrentWeather.css";

// interfaces
import { Realtime } from '../interfaces/Realtime';
import { DayForecast } from '../interfaces/Forecast';

interface CurrentWeatherProps {
  realtimeData: Realtime;
  forecastData: DayForecast;
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ realtimeData, forecastData, celsius, setCelsius }) => {

  const tempNumberF = realtimeData?.temp_f || "";
  const tempNumberC = realtimeData?.temp_c || "";
  const forecastIcon = realtimeData?.condition?.icon || "";
  const detailedForecast = realtimeData?.condition?.text || "";
  const percentRain = forecastData?.daily_chance_of_rain || "0";
  const percentSnow = forecastData?.daily_chance_of_snow || "0";
  const willRain = forecastData?.daily_will_it_rain || "";
  const willSnow = forecastData?.daily_will_it_snow || "";

  return (
    <div className='CurrentWeather'>
      <h3>Current Weather</h3>
      {
        celsius ?
          (<div className='temp-div'>
            <p>{tempNumberC}</p>
            <p title='switch to fahrenheit'
              className='temp-unit'
              onClick={() => setCelsius(!celsius)}>{"° C"}</p>
          </div>) :
          (<div className='temp-div'>
            <p>{tempNumberF}</p>
            <p title='switch to celsius'
              className='temp-unit'
              onClick={() => setCelsius(!celsius)}>{`° F`}</p>
          </div>)
      }
      {
        percentSnow > percentRain ?
          (<div>
            <p className='current-prec'>
              <FontAwesomeIcon className='current-droplet' icon={faSnowflake} />{percentSnow}%
            </p>
          </div>) :
          (<div>
            <p className='current-prec'>
              <FontAwesomeIcon className='current-droplet' icon={faDroplet} />{percentRain}%
            </p>
          </div>)
      }
      <img className='forecast-icon' src={`http:${forecastIcon}`} alt="forecast-icon" />
      <p className='detailed-forecast'>{detailedForecast}</p>
      {
        willSnow ?
          (
            <p className='will-rain'>{willSnow ? "its gonna snow" : "no snow"}</p>
          ) : (
            < p className='will-rain'>{willRain ? "its gonna rain" : "we prolly good"}</p>
          )
      }
    </div>
  )
}

export default CurrentWeather;
