import AsyncStorage from '@react-native-async-storage/async-storage';
import { Key } from 'iconsax-react';


export const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(Key, jsonValue);
    } catch (e) {
  
    }
  };