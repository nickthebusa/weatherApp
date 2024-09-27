import "../CSS/HourlyList.css";
import { HourForecast } from "../interfaces/Forecast";

interface HourlyListProps {
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
  forecastHourly: HourForecast[] | null;
}


// add horizontal list of the next 23 hours of predictions
// ? mayb add switch between period time and military time ?

const HourlyList: React.FC<HourlyListProps> = ({ celsius, setCelsius, forecastHourly }) => {

  const getPeriodTime = (date: string) => {
    const d = new Date(date);
    let hours = d.getHours();
    //const minutes = d.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const time = `${hours} ${period}`;
    return time;
  }

  return (
    <div className="HourlyList">
      <ul>
        {forecastHourly && forecastHourly.map((forecast, i) => (
          <li key={i}>
            <p>{getPeriodTime(forecast.time)}</p>
            <p onClick={() => setCelsius(!celsius)}>{celsius ? `${forecast.temp_c}°C` : `${forecast.temp_f}°F`}</p>
            <img src={`http:${forecast.condition.icon}`} alt="forecast-icon" />
            <p>{forecast.condition.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default HourlyList;
