
import { useState, useEffect } from 'react';

function Time() {

  const [time, setTime] = useState(beforeSettingDate());

  useEffect(() => {
    const timer = setInterval(()=>updateDate(beforeSettingDate()), 1000 )
    return function cleanup() {
        clearInterval(timer)
    }
  });

  function beforeSettingDate() {
    const date = new Date();
    let hours = date.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;
    const minutes = date.getMinutes();
    if (minutes < 10) {
      const myTime = `${hours}:0${minutes} ${amOrPm}`;
      return myTime
    }
    const myTime = `${hours}:${minutes} ${amOrPm}`;
    return myTime
  }
  function updateDate(myTime: string) {
    setTime(myTime);
  }

  return (
    <div>
      <p className='time'>{time}</p>
    </div>
  )
}

export default Time;