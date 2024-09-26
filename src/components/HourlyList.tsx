import "../CSS/HourlyList.css";
import { DayForecast } from "../interfaces/Forecast";

interface HourlyListProps {
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
  forecastHourly: DayForecast[] | null;
}


// add horizontal list of the next 23 hours of predictions
// ? mayb add switch between period time and military time ?

const HourlyList: React.FC<HourlyListProps> = ({ celsius, setCelsius, forecastHourly }) => {

  return (
    <div className="HourlyList">
      <ul>
        {forecastHourly && forecastHourly.map((forecast, i) => (
          <li key={i}>
            <p>{forecast.condition.text}</p>
            <img src={`http:${forecast.condition.icon}`} alt="forecast-icon" />
          </li>
        ))}
      </ul>
    </div>
  )

}

export default HourlyList;
