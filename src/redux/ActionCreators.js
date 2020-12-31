import * as ActionTypes from './ActionTypes';


export const postFavorite = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(item));
    },10);
};


export const addFavorite = (item) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: item
});


export const deleteFavorite = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_FAVORITE,
            payload:item
        });
    },10);
};


export const postCart = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addCart(item));
    },10);
};


export const addCart = (item) => ({
    type: ActionTypes.ADD_CART,
    payload: item
});

export const decreaseCart = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DECREASE_CART,
            payload: item
        });
    },10);
};

export const deleteCart = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART,
            payload: item
        });
    },20);
};
export const deleteCartArray = () => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART_ARRAY,
         
        });
    },20);
};

export const postOrder = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addOrder(item));
    },10);
};

export const addOrder = (item) => ({
    type: ActionTypes.ADD_ORDER,
    payload: item
});

  export const deleteOrder = () => ({
    type: ActionTypes.DELETE_ORDER
});  