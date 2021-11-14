import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Homescreen</Text>
            <Button title="Settings" onPress={() => navigation.navigate('Settings', {user:'Mike'})} />
        </ View>
    );
}
