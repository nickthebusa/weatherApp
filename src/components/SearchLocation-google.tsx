import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import '../CSS/SearchLocation.css';
import { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from 'react';

import { Coords } from '../interfaces/Coords';

interface SearchLocationProps {
  setUserLocation: Dispatch<SetStateAction<Coords | null>>;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ setUserLocation }) => {

  const [query, setQuery] = useState<string>("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[] | null
  >(null);

  const searchDivRef = useRef<HTMLDivElement | null>(null);

  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

  const setSuggestions = useCallback((
    predictions: google.maps.places.AutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    setPredictions(predictions);
  }, [])

  const closeSearch = useCallback((e: MouseEvent) => {
    console.log(e.target)
    const searchDiv = searchDivRef.current;
    const target = e.target as HTMLElement;
    if (!searchDiv?.contains(target)) {
      setPredictions(null);
      setQuery("");
    }
  }, [])

  // init autocomplete service
  useEffect(() => {
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
    geocoderRef.current = new google.maps.Geocoder();
    placesServiceRef.current = new google.maps.places.PlacesService(document.createElement('div'));
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
    if (query && autocompleteServiceRef.current && sessionTokenRef.current) {
      // get predictions
      autocompleteServiceRef.current.getPlacePredictions({
        input: query,
        sessionToken: sessionTokenRef.current
      }, setSuggestions);
    }
    else {
      setPredictions(null);
    }
  }, [query, setSuggestions])

  async function getPlace(placeId: string) {
    if (placesServiceRef.current) {
      placesServiceRef.current.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry) {
          const location = place.geometry.location;
          if (location && location.lat() && location.lng()) {
            setUserLocation({ latitude: location?.lat(), longitude: location?.lng() });
          }
        } else {
          alert(`Failed to get details for place ID: ${status}`);
        }
      });
    }
  }

  return (
    <div className="SearchLocation">
      <div className="header">
        <h3>Search Location</h3>
        <FontAwesomeIcon icon={faLocationDot} />
      </div>
      <div className='input-div' ref={searchDivRef}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <div className="search-results">
        {
          predictions && predictions.map((p: google.maps.places.AutocompletePrediction, i: number) => (
            <div className="result" key={i} onClick={() => getPlace(p.place_id)}>
              {p.description}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SearchLocation;
