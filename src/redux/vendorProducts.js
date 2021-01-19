import * as ActionTypes from './ActionTypes';

export const vendorProducts = (state = { isLoading: true,
                                 errMess: null,
                                 vendorProducts:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_VENDORSHOPPRODUCTSLIST:
            return { isLoading: false, errMess: null, vendorProducts: action.payload};

        case ActionTypes.VENDORSHOPPRODUCTSLIST_LOADING:
            return {isLoading: true, errMess: null, vendorProducts: []}

        case ActionTypes.VENDORSHOPPRODUCTSLIST_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};