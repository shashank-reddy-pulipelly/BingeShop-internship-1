import * as ActionTypes from './ActionTypes';

export const shopProductsList = (state = { isLoading: true,
                                 errMess: null,
                                 shopProductsList:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SHOPPRODUCTSLIST:
            return { isLoading: false, errMess: null, shopProductsList: action.payload};

        case ActionTypes.SHOPPRODUCTSLIST_LOADING:
            return { isLoading: true, errMess: null, shopProductsList: []}

        case ActionTypes.SHOPPRODUCTSLIST_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};