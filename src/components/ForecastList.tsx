import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'

import "../CSS/ForecastList.css";

// hooks
import { useForecastData } from '../hooks/useFetch.ts';

interface ForecastListProps {
  urlForecast: string;
  celsius: boolean;
  setCelsius: (celsius: boolean) => void;
}

interface ListItem {
  name: string;
  startTime: string;
  temperature: number;
  temperatureUnit: string;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number | null;
  }
  relativeHumidity: {
    value: number
  }
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

const apiUrl = "https://api.weather.gov";

function ForecastList(props: ForecastListProps) {

  const [sortedList, setSortedList] = useState<ListItem[][]>([])

  const [forecastData] = useForecastData(props.urlForecast);

  useEffect(() => {

    const forecastList = forecastData ? forecastData.data.properties.periods : [];

    function makeNewList(forecastList: ListItem[]) {
      const updatedList = [];
      for (let i = 0; i < forecastList.length; ++i) {
        if (i !== forecastList.length - 1) {
          const item1 = new Date(forecastList[i].startTime);
          const item2 = new Date(forecastList[i + 1].startTime);
          if (item1.getDay() === item2.getDay()) {
            updatedList.push([forecastList[i], forecastList[i + 1]])
          }
        }
      }
      return updatedList;
    }

    if (forecastList.length !== 0) {
      const newList = makeNewList(forecastList)
      setSortedList(newList);
    }
  }, [setSortedList, forecastData])


  return (
    <div className='forecast-list-div'>
      {sortedList.map((item: ListItem[], i: number) => (
        <div className='forecast-list-item-div' key={i}>
          <p>{item[0].name}</p>
          {
            props.celsius ?
              (<div className='temp-div-list' onClick={() => props.setCelsius(!props.celsius)}>
                <p>{Math.round((item[0].temperature - 32) * (5 / 9))} / {Math.round((item[1].temperature - 32) * (5 / 9))}</p>
                <p className='unit-of-measurement'>{"° C"}</p>
              </div>
              )
              :
              (<div className="temp-div-list" onClick={() => props.setCelsius(!props.celsius)}>
                <p>{item[0].temperature} / {item[1].temperature}</p>
                <p className='unit-of-measurement'>{`° ${item[0].temperatureUnit}`}</p>
              </div>)
          }
          <p className='precipitation-weekly'>
            <FontAwesomeIcon className='weekly-droplet' icon={faDroplet} />
            {item[0].probabilityOfPrecipitation.value || 0}-
            {item[1].probabilityOfPrecipitation.value || 0}%
          </p>
          <img src={apiUrl.concat(item[0].icon)} alt="forecast-icon-weekly" />
        </div>
      ))}
    </div>
  )
}

export default ForecastList;
