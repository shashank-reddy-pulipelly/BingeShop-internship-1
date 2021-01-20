import * as ActionTypes from './ActionTypes';

export const address = (state = { isLoading: true,
  errMess: null,
  address:{name:'',number:'',pinCode:'',
  city:'',state:'',houseNo:'',roadNo:'',landmark:''}}, action) => {
    switch (action.type) {

         
          case ActionTypes.ADD_ADDRESS:
            return { isLoading: false, errMess: null, address: action.payload};

        case ActionTypes.ADDRESS_LOADING:
            return { isLoading: true, errMess: null,address:{}}

        case ActionTypes.ADDRESS_FAILED:
            return { isLoading: false, errMess: action.payload, address:{}};  
                  
        default:
          return state;
      }
};