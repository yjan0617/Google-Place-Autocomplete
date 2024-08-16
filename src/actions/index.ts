// src/actions/index.ts

export const FETCH_PLACES_REQUEST = 'FETCH_PLACES_REQUEST';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_PLACES_FAILURE = 'FETCH_PLACES_FAILURE';

export const fetchPlaces = (query: string) => ({
  type: FETCH_PLACES_REQUEST,
  payload: query,
});

export const fetchPlacesSuccess = (data: any) => ({
  type: FETCH_PLACES_SUCCESS,
  payload: data,
});

export const fetchPlacesError = (error: any) => ({
  type: FETCH_PLACES_FAILURE,
  payload: error,
});