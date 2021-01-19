import * as ActionTypes from './ActionTypes';

export const shops = (state = { isLoading: true,
                                 errMess: null,
                                shops:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SHOPS:
            return { isLoading: false, errMess: null, shops: action.payload};

        case ActionTypes.SHOPS_LOADING:
            return {isLoading: true, errMess: null, shops: []}

        case ActionTypes.SHOPS_FAILED:
            return { isLoading: false, errMess: action.payload, shops: []};

        default:
          return state;
      }
};