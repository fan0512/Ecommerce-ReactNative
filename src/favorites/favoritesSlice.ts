import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {alertService} from '../alertService';
import {SingleProductDTO} from '../products/single-product/singleProductsSlice';

export interface InitialState {
  favoritesItems: SingleProductDTO[];
}

const initialState: InitialState = {
  favoritesItems: [],
};

export const favortesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, {payload}) {
      const itemIndex = state.favoritesItems.findIndex(
        item => item.id === payload.id,
      );
      if (itemIndex >= 0) {
        alertService.alert(
          'info',
          `${payload.title}\nItem is already in favorites`,
        );
      } else {
        state.favoritesItems.push(payload);
        alertService.alert(
          'success',
          `${payload.title}\nItem added to favorites`,
        );
        const setStorage = async () => {
          await AsyncStorage.setItem(
            'favoritesItems',
            JSON.stringify(state.favoritesItems),
          );
        };
        setStorage();
      }
    },
    removeFromFavorites(state, {payload}) {
      const tempItems = state.favoritesItems.filter(
        item => item.id !== payload,
      );
      state.favoritesItems = tempItems;
      alertService.alert('danger', 'Item removed from favorites');

      const setStorage = async () => {
        await AsyncStorage.setItem(
          'favoritesItems',
          JSON.stringify(state.favoritesItems),
        );
      };
      setStorage();
    },
  },
});

export const {addToFavorites, removeFromFavorites} = favortesSlice.actions;

export default favortesSlice.reducer;