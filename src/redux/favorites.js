import * as ActionTypes from './ActionTypes';

export const favorites = (state = { isLoading: true,
    errMess: null,
    favorites:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.favorites.some(el => el.prod_id == action.payload.prod_id && el.shop_id==action.payload.shop_id))
                return state;
            else
                return {...state,favorites:state.favorites.concat(action.payload)} ;
            case ActionTypes.DELETE_FAVORITE:
                return {...state,favorites:state.favorites.filter((item) => item.prod_id != action.payload.prod_id || item.shop_id!=action.payload.shop_id)} ;        
        
                case ActionTypes.FETCH_FAVORITES:
                    return { isLoading: false, errMess: null, favorites: action.payload};
        
                case ActionTypes.FAVORITES_LOADING:
                    return { isLoading: true, errMess: null,favorites:[]}
        
                case ActionTypes.FAVORITES_FAILED:
                    return { isLoading: false, errMess: action.payload, favorites:[]};         
        
                default:
          return state;
      }
};