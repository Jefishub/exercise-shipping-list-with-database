import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import EuroConverter from './EuroConverter';
import History from './History';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator} from'@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'EuroConverter') {
              iconName = 'md-home';
            }
            else if (route.name === 'History') {
              iconName = 'md-settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Stack.Screen name="EuroConverter" component={EuroConverter} />
        <Stack.Screen name="History" component={History} />
      </ Stack.Navigator>
    </NavigationContainer>
  );
};
