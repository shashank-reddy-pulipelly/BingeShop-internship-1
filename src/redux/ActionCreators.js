import * as ActionTypes from './ActionTypes';
import * as firebase from 'firebase';
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


export const postCart = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addCart(item));
    },1);
};


export const addCart = (item) => ({
    type: ActionTypes.ADD_CART,
    payload: item
});

export const decreaseCart = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DECREASE_CART,
            payload: item
        });
    },1);
};

export const deleteCart = (item)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART,
            payload: item
        });
    },2);
};
export const deleteCartArray = () => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_CART_ARRAY,
         
        });
    },2);
};

export const postOrder = (item)  => (dispatch) => {

    firebase.database().ref('Orders').push(item)
};

export const addOrder = (item) => ({
    type: ActionTypes.ADD_ORDER,
    payload: item
});



export const deleteOrder = ()  => (dispatch) => {

    
    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_ORDER,
            
        });
    },2);
};



export const addAddress = (object)  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.ADD_ADDRESS,
            payload:object
        });
    },1);
};




export const deleteAddress= ()  => (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: ActionTypes.DELETE_ADDRESS,
            
        });
    },1);
};

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

export const fetchProducts = () => (dispatch) => {

    dispatch(productsLoading());

    return fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/Products.json')
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
    .then(products => {
        const loadedProducts=[];
        for(const key in products){
            const obj={
                id:key,
                image:products[key].image,
                description:products[key].description,
                quantity:products[key].quantity,
                title:products[key].title,
                type:products[key].type,                
            }

            loadedProducts.push(obj);
        }
        dispatch(addProducts(loadedProducts));
    })
    .catch(error => dispatch(productsFailed(error.message)));
};


export const shopProductsListLoading = () => ({
    type: ActionTypes.SHOPPRODUCTSLIST_LOADING
});

export const shopProductsListFailed = (errmess) => ({
    type: ActionTypes.SHOPPRODUCTSLIST_FAILED,
    payload: errmess
});

export const addShopProductsList = (products) => ({
    type: ActionTypes.ADD_SHOPPRODUCTSLIST,
    payload: products
});

export const fetchShopProductsList = () => (dispatch) => {

    dispatch(shopProductsListLoading());

    return fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/shopProductsList.json')
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
    .then(shopProductsList => {
        const loadedShopProductsList=[];
        for(const key in shopProductsList){
            const products=shopProductsList[key].products;
            const loadedProducts=[];
            for(const product in products){
               loadedProducts.push(products[product]);
            }
            const obj={
                id:key,
                products:loadedProducts,
                shop_id:shopProductsList[key].shop_id, 
                shop_name:shopProductsList[key].shop_name                              
            }

            loadedShopProductsList.push(obj);
        }
        dispatch(addShopProductsList(loadedShopProductsList));
    })
    .catch(error => dispatch(shopProductsListFailed(error.message)));
};


export const shopsLoading = () => ({
    type: ActionTypes.SHOPS_LOADING
});

export const shopsFailed = (errmess) => ({
    type: ActionTypes.SHOPS_FAILED,
    payload: errmess
});

export const addShops = (shops) => ({
    type: ActionTypes.ADD_SHOPS,
    payload: shops
});

export const fetchShops = () => (dispatch) => {

    dispatch(shopsLoading());

    return fetch('https://projectalpha-c313c-default-rtdb.firebaseio.com/Shops.json')
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
    .then(shops => {
        const loadedShops=[];
        for(const key in shops){
            const obj={
                id:shops[key].id,
                address:shops[key].address,
                delivery_radius:shops[key].delivery_radius,
                image:shops[key].image,
                location:shops[key].location,
                minimum_order:shops[key].minimum_order,
                phone_num:shops[key].phone_num,
                rating:shops[key].rating,
                reviews:shops[key].reviews,
                title:shops[key].shop_name,
                shop_type:{
                    is_groceries:shops[key].shop_type.is_groceries,
                    is_vegetables:shops[key].shop_type.is_vegetables,
                }
            }

            loadedShops.push(obj);
        }
        dispatch(addShops(loadedShops));
    })
    .catch(error => dispatch(shopsFailed(error.message)));
};





export const  vendorShopProductsListLoading = () => ({
    type: ActionTypes.VENDORSHOPPRODUCTSLIST_LOADING
});

export const vendorShopProductsListFailed = (errmess) => ({
    type: ActionTypes.VENDORSHOPPRODUCTSLIST_FAILED,
    payload: errmess
});

export const vendorAddShopProductsList = (products) => ({
    type: ActionTypes.ADD_VENDORSHOPPRODUCTSLIST,
    payload: products
});

export const fetchVendorShopProductsList = (shopProductListId) => (dispatch) => {

    dispatch(vendorShopProductsListLoading());

    return fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/shopProductsList/${shopProductListId}.json`)
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
    .then(shopProductsList => {
        
      
            const products=shopProductsList.products;
            const loadedProducts=[];
            for(const product in products){
               loadedProducts.push(products[product]);
            }
           

       
        dispatch(vendorAddShopProductsList(loadedProducts));
    })
    .catch(error => dispatch(vendorShopProductsListFailed(error.message)));
};



export const editProduct=(shopProductListId,productId,price,available)=>(dispatch)=>{

return fetch(`https://projectalpha-c313c-default-rtdb.firebaseio.com/shopProductsList/${shopProductListId}/products/${productId}.json`, {
    method: "PATCH",
    
    body: JSON.stringify({
        price:Number(price),
        available:available
    }),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
})

}