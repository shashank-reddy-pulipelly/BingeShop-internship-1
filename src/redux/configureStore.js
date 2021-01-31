import {createStore, applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';




import {address} from './address';



export const ConfigureStore = () => {
   
    const store = createStore(
        combineReducers({
 
          address
        }),
        applyMiddleware(thunk)
    );



    return { store };
}

