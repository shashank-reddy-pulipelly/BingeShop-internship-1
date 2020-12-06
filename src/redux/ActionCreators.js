import * as ActionTypes from './ActionTypes';


export const postFavorite = (dishId)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(dishId));
    },10);
};


export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});



  export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});  