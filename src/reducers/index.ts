// src/reducers/index.ts

import { combineReducers } from 'redux';
import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAILURE } from '../actions';

const placesReducer = (state = { results: [] }, action: any) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, results: action.payload };
    case FETCH_PLACES_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  places: placesReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
