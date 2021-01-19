import * as ActionTypes from '../ActionTypes';

export const postFavorite = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(item));
    },1);
};


export const addFavorite = (item) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: item
});


export const deleteFavorite = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_FAVORITE,
            payload:item
        });
    },1);
};