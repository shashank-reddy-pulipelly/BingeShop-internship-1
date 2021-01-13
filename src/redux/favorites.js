import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.some(el => el.prod_id == action.payload.prod_id && el.shop_id==action.payload.shop_id))
                return state;
            else
                return state.concat(action.payload);
            case ActionTypes.DELETE_FAVORITE:
                return state.filter((item) => item.prod_id != action.payload.prod_id || item.shop_id!=action.payload.shop_id);        
        default:
          return state;
      }
};