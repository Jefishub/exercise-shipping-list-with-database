import React from 'react';
import { View, Text } from 'react-native';

export default function SettingScreen({ route, navigation }) {
    const{ user} = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to settings {user}</Text>
        </ View>
    );
}