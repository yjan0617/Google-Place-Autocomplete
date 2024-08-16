import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import axios from 'axios';
import { FETCH_PLACES_REQUEST, fetchPlacesSuccess, fetchPlacesError } from '../actions';
import { Epic } from 'redux-observable';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import { GOOGLE_API_KEY } from '../utils/api'; // Assuming you've exported the API key from utils/api.ts

export const fetchPlacesEpic: Epic<AnyAction, AnyAction, RootState> = action$ =>
  action$.pipe(
    ofType(FETCH_PLACES_REQUEST), // Use the correct action type here
    mergeMap(action =>
      axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${action.payload}&key=${GOOGLE_API_KEY}`)
        .then(response => fetchPlacesSuccess(response.data))
        .catch(error => fetchPlacesError(error))
    )
  );

export default fetchPlacesEpic;
