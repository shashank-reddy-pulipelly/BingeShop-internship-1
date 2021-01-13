import * as ActionTypes from './ActionTypes';

export const carts = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_CART:
            if (state.some(el => el.prod_id == action.payload.prod_id && el.shop_id==action.payload.shop_id ))
            {
               
                const newState=state.map((item) => {
                    if(item.prod_id == action.payload.prod_id && item.shop_id==action.payload.shop_id){

                        return ({...item,count:item.count+1})
                    }
                    else{
                        return item;
                    }
                    });
              return newState;
              
            }
             
            else
                return state.concat({prod_id:action.payload.prod_id,count:1,shop_id:action.payload.shop_id});

        case ActionTypes.DECREASE_CART:
            if (state.some(el => el.prod_id == action.payload.prod_id && el.shop_id==action.payload.shop_id))
            {
                const newState=state.map((item) => {
                    if(item.prod_id == action.payload.prod_id && item.shop_id==action.payload.shop_id){

                        return ({...item,count:item.count-1})
                    }
                    else{
                        return item;
                    }
                    });
              return newState;
            }
             
            else
                return state;      
            case ActionTypes.DELETE_CART:
                return state.filter((item) =>  item.prod_id != action.payload.prod_id || item.shop_id!=action.payload.shop_id); 
                
            case ActionTypes.DELETE_CART_ARRAY:
                return [];  
        default:
          return state;
      }
};