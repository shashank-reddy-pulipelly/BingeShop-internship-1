import {createStore, applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import { carts } from './cart';

import {address} from './address';
import {products} from './products';
import {shops} from './shops';

import {shopProductsList} from './shopProductsList';


export const ConfigureStore = () => {
   
    const store = createStore(
        combineReducers({
 
           carts,address,shops,products,shopProductsList
        }),
        applyMiddleware(thunk,logger)
    );



    return { store };
}

