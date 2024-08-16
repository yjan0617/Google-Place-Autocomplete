import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

interface CustomMapViewProps {
  selectedPlace: any;
}

const CustomMapView: React.FC<CustomMapViewProps> = ({ selectedPlace }) => {
  const [region, setRegion] = useState<Region>({
    latitude: 3.1578, // Default to Kota Damansara
    longitude: 101.5945, // Default to Kota Damansara
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    console.log("xxxxx selectedPlace",selectedPlace);
    if (selectedPlace) {
      setRegion({
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [selectedPlace]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {selectedPlace && (
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CustomMapView;
