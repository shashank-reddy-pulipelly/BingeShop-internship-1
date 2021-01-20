import * as ActionTypes from '../ActionTypes';


export const addressLoading = () => ({
    type: ActionTypes.ADDRESS_LOADING
});

export const addressFailed = (errmess) => ({
    type: ActionTypes.ADDRESS_FAILED,
    payload: errmess
});

export const addAddress = (object) => ({
            type: ActionTypes.ADD_ADDRESS,
            payload:object
});


export const fetchAddress = () => (dispatch) => {

    dispatch(addressLoading());

     fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Address.json')
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



export const editAddress = (object)  => (dispatch) => {

    fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Address.json',{
        method: "PUT",
    
        body: JSON.stringify({
           ...object
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
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




