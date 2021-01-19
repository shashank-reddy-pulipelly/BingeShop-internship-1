import * as ActionTypes from '../ActionTypes';



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
    },1);
};

export const deleteCart = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART,
            payload: item
        });
    },2);
};
export const deleteCartArray = () => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART_ARRAY,
         
        });
    },2);
};