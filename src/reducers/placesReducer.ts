import { FETCH_PLACES_SUCCESS, FETCH_PLACES_ERROR, PlacesActionTypes } from '../actions';

interface Place {
  place_id: string;
  description: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface PlacesState {
  results: Place[];
  error: any;
}

const initialState: PlacesState = {
  results: [],
  error: null
};

const placesReducer = (state = initialState, action: PlacesActionTypes): PlacesState => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, results: action.payload.predictions };
    case FETCH_PLACES_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default placesReducer;
