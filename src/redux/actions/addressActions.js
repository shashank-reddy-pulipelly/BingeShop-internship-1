import * as ActionTypes from '../ActionTypes';
import * as firebase from 'firebase';

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

     firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Address`).once('value',snap=>{
       if(snap.exists()){
        dispatch(addAddress(snap.val()));
       }
     })
};



export const editAddress = (object)  => (dispatch) => {

  firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Address`).set(object,(error)=>{
    if(error){
      console.log('error in address update',error)
    }
    else{
      dispatch(addAddress(object));
    }
  })
  
};




