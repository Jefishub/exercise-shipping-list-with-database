import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function RecipeFinder({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);


  const getRepositories = (keyword) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(responseJson => setRepositories(responseJson.meals))
      .catch(error => { Alert.alert('Error', error); });
  }

  return (
    <View style={styles.container}>
      <TextInput style={{
        fontSize: 18,
        width: 200
      }} placeholder='keyword' onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={() => getRepositories(keyword)} />
      <FlatList style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.full_name}</Text>
            <Text style={{ fontSize: 16 }}> {item.strMeal}</Text>
            <Image
              style={styles.tinyLogo}
              source={{uri: item.strMealThumb}}
            />
          </View >}
        data={repositories} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
