import * as ActionTypes from './ActionTypes';

export const address = (state = {name:'',number:'',pinCode:'',
city:'',state:'',houseNo:'',roadNo:'',landmark:''}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ADDRESS:
          return action.payload;
           
            case ActionTypes.DELETE_ADDRESS:
                return {};       
        default:
          return state;
      }
};