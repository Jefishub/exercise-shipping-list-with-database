import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from "firebase/database";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtBHGEjnXa6s622TNFKLJbBEYhNFE3xRc",
  authDomain: "exercise-shoppinglist.firebaseapp.com",
  databaseURL: "https://exercise-shoppinglist-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "exercise-shoppinglist",
  storageBucket: "exercise-shoppinglist.appspot.com",
  messagingSenderId: "301876490657",
  appId: "1:301876490657:web:d9656e98ff987e52e11be0",
  measurementId: "G-67NXFDKSYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);

/*   useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping_list (id integer primary key not null, amounts text, product text);');
    });
    updateList();
  }, []); */

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      console.log('test');
      const data = snapshot.val();
      setItems(Object.values(data));
    })
  }, []);

  // Save shopping_list
  const saveItem = () => {
    push(ref(database, 'items/'),
      { 'product': product, 'amount': amount });
  }

/*   // Update shopping_list list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping_list;', [], (_, { rows }) =>
        setItems(rows._array)
      );
    });
  }

  // Delete shopping_list
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping_list where id = ?;`, [id]);
      }, null, updateList
    )
  } */

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder='Product' style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(product) => setProduct(product)}
        value={product} />
      <TextInput placeholder='Amounts' style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount} />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Items</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => 
        <View style={styles.listcontainer}>
          <Text style={{ fontSize: 18 }}>{item.product}, {item.amount}</Text>
          {/* <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(item.id)}> bought</Text> */}
        </View>}
        data={items}
        ItemSeparatorComponent={listSeparator}
      />
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
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});