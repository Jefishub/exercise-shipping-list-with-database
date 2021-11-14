import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function History({navigation, route}) {
    const{ history } = route.params;
    return (
        <View style={styles.container}>
            <Text>History</Text>
            <FlatList data={history} renderItem={({ item }) => <Text>{item}</ Text>} />
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