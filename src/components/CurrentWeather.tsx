
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'


// components

// hooks
import { useForecastData, useForecastHourly } from '../hooks/useFetch.ts';

interface CurrentWeatherProps {
  urlForecast: string;
  urlForecastHourly: string;
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
}


function CurrentWeather(props: CurrentWeatherProps) {


  const [forecastData] = useForecastData(props.urlForecast);
  const [forecastHourly] = useForecastHourly(props.urlForecastHourly);

  const apiUrl = "https://api.weather.gov";

  const tempNumber = forecastHourly ? forecastHourly.data.properties.periods[0].temperature : '';
  const tempUnit = forecastHourly ? forecastHourly.data.properties.periods[0].temperatureUnit : ''
  const forecastIcon = forecastData ? forecastData.data.properties.periods[0].icon : '';
  const detailedForecast = forecastData ? forecastData.data.properties.periods[0].detailedForecast : '';
  const precipitation = forecastData ? forecastData.data.properties.periods[0].probabilityOfPrecipitation.value : 0;

  function fillBg() {
    if (forecastIcon) {
      return (
        <div className='current-weather-bg' style={{ backgroundImage: `url(${forecastIcon}`, backgroundPosition: '50% 50%' }}></div>
      )
    }
  }


  return (
    <div className='current-weather-cont'>
    <div className='current-weather-div'>
      {fillBg()}
      {forecastData ? 
        (
          <div className='forecast-current'>
            <h3>Current Weather</h3>
              {
                props.celsius ? 
                  (<div className='temp-div'>
                    <p>{((tempNumber - 32) * (5 / 9)).toFixed(2)}</p>
                  <p title='switch to fahrenheit'
                    className='temp-unit'
                    onClick={() => props.setCelsius(!props.celsius)}>{" °C"}</p>
                  </div>) :
                  (<div className='temp-div'>
                    <p>{tempNumber}</p>
                  <p title='switch to celsius'
                    className='temp-unit'
                    onClick={() => props.setCelsius(!props.celsius)}>°{tempUnit}</p>
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