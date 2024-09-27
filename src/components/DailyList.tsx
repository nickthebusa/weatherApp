import "../CSS/DailyList.css";
import { Forecast } from "../interfaces/Forecast";

interface DailyListProps {
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
  forecastDaily: Forecast[];
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DailyList: React.FC<DailyListProps> = ({ celsius, setCelsius, forecastDaily }) => {

  const getWeekday = (date: string) => {
    const d = new Date(date);
    return days[d.getDay()];
  }

  return (
    <div className="DailyList">
      <ul>
        {forecastDaily && forecastDaily.map((forecast: Forecast, i: number) => (
          <li key={i}>
            <p>{getWeekday(forecast.date)}</p>
            <p onClick={() => setCelsius(!celsius)}>{celsius ? `${forecast.day.avgtemp_c}°C` : `${forecast.day.avgtemp_f}°F`}</p>
            <img src={`http:${forecast.day.condition.icon}`} alt="forecast-icon" />
            <p>{forecast.day.condition.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default DailyList;
