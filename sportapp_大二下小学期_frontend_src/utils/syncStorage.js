import React from 'react';
import {AsyncStorage} from 'react-native';
export default class SyncStorage {
  static cache: {[key: string]: string} = {};

  static async init() {
    let keys = await AsyncStorage.getAllKeys();
    let items = await AsyncStorage.multiGet(keys).then();
    items.map(([key, value]) => {
      this.cache[key] = value;
    });
  }

  static getValue(key: string) {
    return this.cache[key];
  }

  static setValue(key: string, value: string) {
    if (this.cache[key] === value) {
      return;
    }
    this.cache[key] = value;
    AsyncStorage.setItem(key, value);
  }

  static removeKey(key: string) {
    delete this.cache[key];
    AsyncStorage.removeItem(key);
  }
}
