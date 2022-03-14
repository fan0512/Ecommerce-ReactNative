import React, {FunctionComponent, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Chip} from 'react-native-paper';

const CATEGORIES = [
  {
    name: 'all Products',
    url: 'https://fakestoreapi.com/products',
  },
  {
    name: 'electronics',
    url: 'https://fakestoreapi.com/products/category/electronics',
  },
  {
    name: 'jewelery',
    url: 'https://fakestoreapi.com/products/category/jewelery',
  },
  {
    name: "men's clothing",
    url: "https://fakestoreapi.com/products/category/men's clothing",
  },
  {
    name: "women's clothing",
    url: "https://fakestoreapi.com/products/category/women's clothing",
  },
];
interface CategoriesProps {
  setUrl: (url: string) => void;
}

export const Categories: FunctionComponent<CategoriesProps> = ({setUrl}) => {
  const [selectedCategory, setSelectedCategory] = useState('all Products');
  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        renderItem={itemData => (
          <Chip
            mode="outlined"
            selected={selectedCategory === itemData.item.name}
            selectedColor="#fff"
            style={styles.renderItemContainer}
            textStyle={styles.renderItemText}
            onPress={() => {
              setUrl(itemData.item.url);
              setSelectedCategory(itemData.item.name);
            }}>
            {itemData.item.name.toLocaleUpperCase()}
          </Chip>
        )}
        keyExtractor={item => item.url.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  renderItemContainer: {
    backgroundColor: '#004666',
    marginRight: 5,
    marginVertical: 10,
  },
  renderItemText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});