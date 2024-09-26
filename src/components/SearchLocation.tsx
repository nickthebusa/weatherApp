import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import '../CSS/SearchLocation.css';
import { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from 'react';
import APIService from '../fetches/APIService';
import { Coords } from '../interfaces/Coords';
import { SearchLocation } from '../interfaces/SearchLocation';

interface SearchLocationProps {
  setUserLocation: Dispatch<SetStateAction<Coords | null>>;
  getUserLocation: () => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ setUserLocation, getUserLocation }) => {

  const [query, setQuery] = useState<string>("");
  const [predictions, setPredictions] = useState<SearchLocation[] | null>(null);

  const searchDivRef = useRef<HTMLDivElement | null>(null);


  const setSuggestions = useCallback(async (query: string) => {
    // set predictions
    try {
      const res = await APIService.SearchAutocomplete(query);
      const dataLocations = res?.data;
      setPredictions(dataLocations);
    } catch (err) {
      console.log(err);
    }
  }, [])

  const closeSearch = useCallback((e: MouseEvent) => {
    const searchDiv = searchDivRef.current;
    const target = e.target as HTMLElement;
    if (!searchDiv?.contains(target)) {
      setPredictions(null);
      setQuery("");
    }
  }, [])

  // event listener for clicking out of search box
  useEffect(() => {
    window.addEventListener("click", closeSearch);
    return () => {
      window.removeEventListener("click", closeSearch);
    }
  }, [closeSearch])

  // update on search query
  useEffect((): void => {
    if (query) {
      // get predictions
      setSuggestions(query);
    }
    else {
      //setPredictions(null);
    }
  }, [query, setSuggestions])

  function getPlace(p: SearchLocation) {
    // set user location
    setUserLocation({ latitude: p?.lat, longitude: p?.lon });
  }


  return (
    <div className="SearchLocation">
      <div className="header">
        <h3>Search Location</h3>
        <FontAwesomeIcon icon={faLocationDot} title="use geolocation" onClick={getUserLocation} />
      </div>
      <div className='input-div' ref={searchDivRef}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <div className="search-results">
        {
          predictions && predictions.map((p: SearchLocation, i: number) => (
            <div className="result" key={i} onClick={() => getPlace(p)}>
              {p.name}, {p.region}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SearchLocation;
