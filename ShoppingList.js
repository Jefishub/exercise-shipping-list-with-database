import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import { AsyncStorage } from '@ react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

export default function ShoppingList() {

  try {
    await AsyncStorage.setItem('someKey', 'Thisis the value');
  } catch (error) {
    Alert.alert('Errorsavingdata')
      ;
  }

  readData = async () => {
    try {
      const value = await AsyncStorage.getItem('someKey');
    } catch (error) {
      Alert.alert('Errorsavingdata');
    }
  }

  return (
    <View style={styles.container}>

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