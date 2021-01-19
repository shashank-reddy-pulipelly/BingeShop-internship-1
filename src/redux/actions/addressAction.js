import * as ActionTypes from '../ActionTypes';


export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

export const fetchProducts = () => (dispatch) => {

    dispatch(productsLoading());

    return fetch('https://bingeshop-2021-default-rtdb.firebaseio.com/Users/User_1/Address.json')
    .then(response => {
        if (response.ok) {
                   
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(address => {

        dispatch(addAddress(address));
    })
    .catch(error => dispatch(addressFailed(error.message)));
};



export const addAddress = (object)  => (dispatch) => {


    setTimeout(() => {
        dispatch({
            type: ActionTypes.ADD_ADDRESS,
            payload:object
        });
    },1);
};




export const deleteAddress= ()  => (dispatch) => {

    setTimeout(() => {

        dispatch({
            type: ActionTypes.DELETE_ADDRESS,
            
        });
    },1);
};