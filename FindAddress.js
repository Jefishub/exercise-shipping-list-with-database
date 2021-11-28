import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const API_URL = "http://www.mapquestapi.com/geocoding/v1/address";
const API_KEY = "nk4AOXVkJGl4bHJ7ycsAQdTN2JRd4YW1";

export default function App() {
  const [latLng, setLatLng] = useState({ region: initialRegion });
  const [locationAddress, setLocationAddress] = useState('Helsinki');
  const initialRegion = { latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.0322, longitudeDelta: 0.0221, };

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    fetch(API_URL + "?key=" + API_KEY + "&location=" + locationAddress, { method: 'GET' })
      .then(res => res.json())
      .then((resJson) => {
        setLatLng({
          region: {
            latitude: JSON.stringify(resJson.results[0].locations[0].latLng.lat),
            longitude: JSON.stringify(resJson.results[0].locations[0].latLng.lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        });
        console.log(latLng);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setLocationAddress}
        value={locationAddress}
      />
      <Button
        onPress={fetchData}
        title="Find Location"
      />
      <MapView
        style={styles.map}
        region={latLng}>
        <Marker coordinate={latLng} title={locationAddress} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});