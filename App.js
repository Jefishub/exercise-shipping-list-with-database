import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [newItem, setNewItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const addToShoppingList = () => {
    setShoppingList([...shoppingList, newItem]);
  }
  const clearShoppingList = () => {
    setShoppingList([]);
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{
            width: 200,
            borderColor: 'gray',
            borderWidth: 1
          }} onChangeText={newItem => setNewItem(newItem)} value={newItem} />
        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={addToShoppingList} title="ADD" />
        <View style={{ marginRight: 10 }}></View>
        <Button onPress={clearShoppingList} title="CLEAR" />
      </View>
      <View style={{
        width: 200
      }}>
        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Shopping List:</Text>
        <FlatList data={shoppingList} renderItem={({ item }) => <Text>{item}</ Text>} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
