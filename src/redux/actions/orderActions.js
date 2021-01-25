import * as ActionTypes from './ActionTypes';
import * as firebase from 'firebase';

export const postOrder = (item)  => (dispatch) => {

   firebase.database().ref('Orders').push(item)
};

export const addOrder = (item) => ({
    type: ActionTypes.ADD_ORDER,
    payload: item
});