import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import { Header, Icon, Input, Button, ListItem, CheckBox } from 'react-native-elements';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'


export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);

  const saveItem = () => {
    const newList = items.concat({ amount: amount, product: product, id: uuid() });
    setItems(newList);
  };

  const deleteItem = (id) => {
    var newItems = items.filter((item) => item.id !== id);;
    setItems(newItems)
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'SHOPPINGLIST', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Input label='PRODUCT' onChangeText={product => setProduct(product)} value={product} />
      <Input label='AMOUNT' onChangeText={amount => setAmount(amount)} value={amount} />
      <Button raised icon={{ name: 'save' }} onPress={saveItem} title="SAVE" />
      <FlatList
        style={{ marginLeft: "5%" }}
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <View>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    {item.product}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.amount}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <CheckBox
                  iconType='material'
                  checkedIcon='clear'
                  checkedColor='red'
                  checked="true"
                  onPress={() => deleteItem(item.id)}
                />
              </ListItem>
            </View>
          </View>}
        data={items}
      />
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
    justifyContent: 'flex-start',
  },
  listcontainer: {
    width: Dimensions.get('window').width,
    height: 90,
    flexDirection: 'column',
  },
  input: {
    margin: 24,
    width: 200,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1
  }
});