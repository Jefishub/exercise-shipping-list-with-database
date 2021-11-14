import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

const RANDOM_NUMBER = Math.floor(Math.random() * 100) + 1;

export default function App() {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState("Guess a number between 1-100");
  const [count, setCount] = useState(0)

  const guess = () => {
    value == RANDOM_NUMBER ? correctAnswer() : wrongAnswer();
  }

  const wrongAnswer = () => {
    const isLower = RANDOM_NUMBER - value < 0 ? 'high' : 'low';
    setResult('Your guess ' + value + ' is too ' + isLower)
    setCount(count + 1);
  };

  const correctAnswer = () => {
    Alert.alert('You guessed the number in ' + count + ' guessess');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{}}>
        <Text>Result: {result}</Text>
        <TextInput
          keyboardType='numeric'
          style={{
            width: 200,
            borderColor: 'gray',
            borderWidth: 1
          }} onChangeText={value => setValue(Number(value))} value={value} />
        <StatusBar style="auto" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={guess} title="Make Guess" />
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
