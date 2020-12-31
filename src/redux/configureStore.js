import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { favorites } from './favorites';
import { carts } from './cart';
import { orders } from './orders';
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
 
            favorites,carts,orders
        }),
        applyMiddleware(thunk,logger)
    );

    const persistor = persistStore(store)

    return { persistor, store };
}

