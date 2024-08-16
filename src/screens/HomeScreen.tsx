// src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces } from '../actions';
import CustomMapView from '../components/CustomMapView';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { RootState } from '../store';

const HomeScreen: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<string>('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchPlaces(selectedPlace));
  };

  const handlePlaceSelected = (place: string) => {
    setSelectedPlace(place);
    handleSearch(); // Search automatically after selecting a place
  };

  return (
    <View style={styles.container}>
      <PlacesAutocomplete onPlaceSelected={handlePlaceSelected} />
      <CustomMapView selectedPlace={selectedPlace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
