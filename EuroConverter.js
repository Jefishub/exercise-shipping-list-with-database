import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_KEY = "99e601a5850683313a9407c69eef229d"

export default function EuroConverter({ navigation }) {
  const [selected, setSelected] = useState('');
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState(1);
  const [eur, setEur] = useState('Press button to convert');

  useEffect(() => {
    getRates(API_KEY);
  }, [])

  useEffect(() => {
    setEur('Press button to convert')
  }, [selected, amount])

  const convert = () => {
    const amountEur = Number(amount) / rates[selected]
    setEur(`${amountEur.toFixed(2)}eur`);
  }

  const getRates = (api_key) => {
    fetch(`http://api.exchangeratesapi.io/latest?access_key=${api_key}`)
      .then(response => response.json())
      .then(responseJson => setRates(responseJson.rates))
      .catch(error => { Alert.alert('Error', error); });
  }

  return (
    <View style={styles.container}>
      <Image style={{ width: 200, height: 200 }}
        source={require('./eurocoin.png')}
      />
      <Text
        style={{ borderBottomWidth: 1, borderColor: "#ababab", backgroundColor: '#ffff11' }}>{eur}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{ borderBottomWidth: 1, borderColor: "#ababab" }}
          placeholder={'Amount'}
          keyboardType={'numeric'}
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Picker
          selectedValue={selected}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemIndex, itemValue);
            setSelected(itemValue);
          }}>
          {Object.keys(rates).map(key => (<Picker.Item label={key} value={key} key={key} />))}
        </Picker>
      </View>
      <Button title="Convert" onPress={convert} />
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
