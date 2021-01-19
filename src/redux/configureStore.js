import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { favorites } from './favorites';
import { carts } from './cart';
import { orders } from './orders';
import {address} from './address';
import {products} from './products';
import {shops} from './shops';
import {vendorProducts} from './vendorProducts';
import {shopProductsList} from './shopProductsList';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'

export const ConfigureStore = () => {
    const config = {
        key: 'root',
        storage:AsyncStorage,
        debug: true
      }
    
    const store = createStore(
        persistCombineReducers(config,{
 
            favorites,carts,orders,address,shops,products,shopProductsList,vendorProducts
        }),
        applyMiddleware(thunk)
    );

    const persistor = persistStore(store)

    return { persistor, store };
}

