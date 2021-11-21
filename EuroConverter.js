  import React from 'react';
  import { StyleSheet, StatusBar, View } from 'react-native';
  import MapView, { Marker } from 'react-native-maps';
  
  export default function App() {
    const region = {
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221
    };
  
    const coordinates = {
      latitude: 60.201373,
      longitude: 24.934041
    };
  
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={region}
        >
          <Marker
            coordinate={coordinates}
            title='Haaga-Helia'
          />
        </MapView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop:StatusBar.currentHeight,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      flex: 1,
      width: "100%",
      height: "100%"
    }
  });