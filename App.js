import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import { FlatList } from 'react-native-gesture-handler';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      setContacts(data);
      if (data.length > 0) {
        setCurrentContact(data);
      }
    }
  }

  return (

    <View style={styles.container} >
      <StatusBar style="auto" />
      {
        hasPermission ? (
          <View>
            <FlatList
              style={{ marginLeft: "5%" }}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) =>
                <View style={styles.listcontainer}>
                  <Text style={{ fontSize: 18 }}>{item.firstName} {item.lastName}, {item.phoneNumbers[0].number}</Text>
                </View>}
              data={contacts}
            />
            <Button title="Show Contacts" onPress={getContacts} />
          </View>
        ) : (
          <View>
            <Text>No permission to use Contacts</Text>
            <Button title="Change permissions" onPress={requestPermission} />
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    marginBottom: 36,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});