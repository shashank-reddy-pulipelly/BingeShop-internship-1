import * as ActionTypes from '../ActionTypes';











export const deleteCartArray = () => (dispatch) => {
  fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Carts.json`,{
    method: "DELETE"
  })
  .then(response => {
    if (response.ok) {                   
      setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART_ARRAY,
         
        });
    },2);
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
  .catch(error => dispatch({
    type: ActionTypes.CART_FAILED,
    payload: error.message
}));
    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART_ARRAY,
         
        });
    },2);
};





export const fetchCarts = () => (dispatch) => {

    dispatch({
      type: ActionTypes.CART_LOADING
  });

     fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Carts.json')
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
    .then(cart => {

     const loadedcart=[];
      for(const key in cart){
     
        const products=cart[key].products;
        const  loadProducts=[];
          for(const item in products){
                const ob={
                    prod_id:item,
                    count:products[item]
                }
                loadProducts.push(ob);
          }
        const obj={
          shop_id:key,
          products:loadProducts,
          
        }
        loadedcart.push(obj)
      }
        dispatch({
          type: ActionTypes.FETCH_CART,
          payload:loadedcart
});
    })
    .catch(error => dispatch({
      type: ActionTypes.CART_FAILED,
      payload: error.message
  }));
};



export const addCart = (prod_id,shop_id)  => (dispatch,getState) => {
const state=getState().carts.carts;
  if (state.some(el =>  el.shop_id==shop_id ))
  {

   const shopProducts=state.find(el=>el.shop_id==shop_id).products;
    if(shopProducts.some(el=>el.prod_id == prod_id)){
        const count=shopProducts.find(el=>el.prod_id == prod_id).count+1;
        fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Carts/${shop_id}/products/${prod_id}.json`,{
          method: "PUT",
    
          body: JSON.stringify(Number(count)),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        })
        .then(response => {
          if (response.ok) {                   
            dispatch({
              type: ActionTypes.ADD_CART,
              payload: {prod_id,shop_id}
          })
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
        .catch(error => dispatch({
          type: ActionTypes.CART_FAILED,
          payload: error.message
      }));
    }
    else{
      
      fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Carts/${shop_id}/products/${prod_id}.json`,{
        method: "PUT",
  
        body: JSON.stringify(Number(1)),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
      .then(response => {
        if (response.ok) {                   
          dispatch({
            type: ActionTypes.ADD_CART,
            payload: {prod_id,shop_id}
        })
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
      .catch(error => dispatch({
        type: ActionTypes.CART_FAILED,
        payload: error.message
    }));
    }
  
  }
  else{
    fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Carts/${shop_id}/products/${prod_id}.json`,{
      method: "PUT",

      body: JSON.stringify(Number(1)),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then(response => {
      if (response.ok) {                   
        dispatch({
          type: ActionTypes.ADD_CART,
          payload: {prod_id,shop_id}
      })
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
    .catch(error => dispatch({
      type: ActionTypes.CART_FAILED,
      payload: error.message
  }));

  }
   

  
};

export const decreaseCart = (prod_id,shop_id)  => (dispatch,getState) => {
  const state=getState().carts.carts;
  if (state.some(el =>  el.shop_id==shop_id ))
  {

    const shopProducts=state.find(el=>el.shop_id==shop_id).products;
    if(shopProducts.some(el=>el.prod_id == prod_id)){
        const count=shopProducts.find(el=>el.prod_id == prod_id).count-1;
        fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Carts/${shop_id}/products/${prod_id}.json`,{
          method: "PUT",
    
          body: JSON.stringify(Number(count)),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        })
        .then(response => {
          if (response.ok) {                   
            dispatch({
              type: ActionTypes.DECREASE_CART,
              payload: {prod_id,shop_id}
          })
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
        .catch(error => dispatch({
          type: ActionTypes.CART_FAILED,
          payload: error.message
      }));
     
    }
  }
};


export const deleteCart = (prod_id,shop_id)  => (dispatch,getState) => {
  const state=getState().carts.carts;
  if (state.some(el =>  el.shop_id==shop_id ))
  {

  const  shopProducts=state.find(el=>el.shop_id==shop_id).products;
    if(shopProducts.some(el=>el.prod_id == prod_id)){
  
        fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/Users/User_1/Carts/${shop_id}/products/${prod_id}.json`,{
          method: "DELETE"
        })
        .then(response => {
          if (response.ok) {                   
            dispatch({
              type: ActionTypes.DELETE_CART,
              payload: {prod_id,shop_id}
          })
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
        .catch(error => dispatch({
          type: ActionTypes.CART_FAILED,
          payload: error.message
      }));
    
    }
  }
};

