import * as ActionTypes from '../ActionTypes';


export const fetchFavorites = () => (dispatch) => {

    dispatch({
      type: ActionTypes.FAVORITES_LOADING
  });

     fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Favorites.json')
    .then(response => {
        if (response.ok) {                   
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(favorites => {

      loadedfavorites=[];
      for(const key in favorites){
        const obj={
          id:key,
          prod_id:favorites[key].prod_id,
          shop_id:favorites[key].shop_id
        }
        loadedfavorites.push(obj)
      }
        dispatch({
          type: ActionTypes.FETCH_FAVORITES,
          payload:loadedfavorites
});
    })
    .catch(error => dispatch({
      type: ActionTypes.ADDRESS_FAILED,
      payload: error.message
  }));
};



export const postFavorite = (prod_id,shop_id)  => (dispatch) => {

    fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Favorites.json',{
        method: "POST",
    
        body: JSON.stringify({
          prod_id,shop_id
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {                   
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(response => {

      dispatch({
        type: ActionTypes.ADD_FAVORITE,
        payload:{id:response.name,prod_id:prod_id,shop_id:shop_id}
    })
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
  
};



export const deleteFavorite = (favoriteId,prod_id,shop_id)  => async (dispatch) => {

  await fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Favorites/${favoriteId}.json`,{
      method: "DELETE"
  })
    dispatch({
      type: ActionTypes.DELETE_FAVORITE,
      payload:{prod_id,shop_id}
  });

};
