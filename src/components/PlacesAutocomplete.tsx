// src/components/PlacesAutocomplete.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, List } from '@ant-design/react-native';
import { GOOGLE_API_KEY } from '../utils/api';

interface PlacesAutocompleteProps {
  onPlaceSelected: (place: any) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ onPlaceSelected }) => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);

  const fetchPlaces = async (input: string) => {
    if (input.length < 3) {
      setPredictions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      console.log("xxxxx",data);
      if (data.status === 'OK' && data.predictions) {
        setPredictions(data.predictions);
      } else {
        console.error(`Error: ${data.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchPlaceDetails = async (placeId: any) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        const location = data.result.geometry.location;
        onPlaceSelected({
          name: data.result.formatted_address,
          latitude: location.lat,
          longitude: location.lng,
        });
      } else {
        console.error(`Error: ${data.status}`);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const handleSelectPlace = (place: any) => {
    fetchPlaceDetails(place.place_id);
    setQuery(place.description);
    setPredictions([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Search for a place"
          onChangeText={(text) => {
            setQuery(text);
            fetchPlaces(text);
          }}
          value={query}
        />
      </View>
      {predictions.length > 0 && (
        <List style={styles.list}>
          {predictions.map((item) => (
            <List.Item key={item.place_id} onPress={() => handleSelectPlace(item)}>
              {item.description}
            </List.Item>
          ))}
        </List>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  inputContainer: {
    zIndex: 2,  // Ensures the input stays on top
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  list: {
    maxHeight: 200, // Adjust the max height as needed
    overflow: 'scroll',
    backgroundColor: '#fff',
    zIndex: 1,  // Ensure the list overlaps the map but appears under the input
  },
});

export default PlacesAutocomplete;
