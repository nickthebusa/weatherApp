// components
import ThemeSwitch from './ThemeSwitch.tsx';
import Time from './Time.tsx';

import { Location } from "../interfaces/Location.ts";

interface HeaderLocationProps {
  loading: boolean;
  locationData: Location | null;
  screenSize: number;
}

const HeaderLocation: React.FC<HeaderLocationProps> = ({ loading, locationData, screenSize }) => {

  const renderHeading = () => {
    if (loading) {
      return <h2>Loading Location...</h2>
    } else if (locationData) {
      if (screenSize > 600) {
        return <h2 className='weather-in-header'>Weather in {locationData?.name}, {locationData?.region} </h2>
      } else {
        <h2 className='weather-in-header'>{locationData?.name}, {locationData?.region} </h2>
      }
    } else {
      return <h2>No Location</h2>
    }
  }


  return (
    <div className='heading-div'>
      {renderHeading()}
      <div className='time-theme-div'>
        <ThemeSwitch />
        <Time />
      </div>
    </div>
  )
}

export default HeaderLocation;
