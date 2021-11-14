import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Calculator({navigation}) {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [result, setResult] = useState(value1 + value2);
  const [data, setData] = useState([]);

  const addition = () => {
    setData([...data, value1 + " + " + value2 + " = " + (value1 + value2)]);
    setResult(value1 + value2);
  }
  const subtraction = () => {
    setData([...data, value1 + " - " + value2 + " = " + (value1 - value2)]);
    setResult(value1 - value2);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Result: {result}</Text>
        <TextInput
          keyboardType='numeric'
          style={{
            width: 200,
            borderColor: 'gray',
            borderWidth: 1
          }} onChangeText={value1 => setValue1(Number(value1))} value={value1} />
        <TextInput
          keyboardType='numeric' style={{
            width: 200,
            borderColor: 'gray',
            borderWidth: 1
          }} onChangeText={value2 => setValue2(Number(value2))} value={value2} />
        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={addition} title="+" />
        <View style={{ marginRight: 10 }}></View>
        <Button onPress={subtraction} title="-" />
        <View style={{ marginRight: 10 }}></View>
        <Button onPress={() => navigation.navigate('History', {history: data})} title="History"/>
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
