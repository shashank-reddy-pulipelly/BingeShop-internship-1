import * as ActionTypes from './ActionTypes';

export const products = (state = { isLoading: true,
                                 errMess: null,
                                 products:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCTS:
            return { isLoading: false, errMess: null, products: action.payload};

        case ActionTypes.PRODUCTS_LOADING:
            return { isLoading: true, errMess: null,products:[]}

        case ActionTypes.PRODUCTS_FAILED:
            return { isLoading: false, errMess: action.payload, products: []};

        default:
          return state;
      }
};