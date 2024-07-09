
import "../CSS/HourlyList.css";

// hooks
import { useForecastData, useForecastHourly } from '../hooks/useFetch.ts';

interface HourlyListProps {
  urlForecast: string;
  urlForecastHourly: string;
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
}


// add horizontal list of the next 23 hours of predictions
// ? mayb add switch between period time and military time ?

function HourlyList(props: HourlyListProps) {
  const [forecastData] = useForecastData(props.urlForecast);
  const [forecastHourly] = useForecastHourly(props.urlForecastHourly);

  console.log(forecastData);
  console.log(forecastHourly);

  return (
    <div className="hourly-list-div">
    </div>
  )

}

export default HourlyList;
