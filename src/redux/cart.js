import * as ActionTypes from './ActionTypes';

export const carts = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_CART:
            if (state.some(el => el.id === action.payload))
            {
                const temp1=state.filter((item) => item.id !== action.payload);
                const prevItem=state.filter((item) => item.id == action.payload);
                const newItem={
                    id:prevItem[0].id,
                    count:prevItem[0].count+1
                }
                return temp1.concat(newItem);
            }
             
            else
                return state.concat({id:action.payload,count:1});

        case ActionTypes.DECREASE_CART:
            if (state.some(el => el.id === action.payload))
            {
                const temp1=state.filter((item) => item.id !== action.payload);
                const prevItem=state.filter((item) => item.id == action.payload);
                const newItem={
                    id:prevItem[0].id,
                    count:prevItem[0].count-1
                }
                return temp1.concat(newItem);
            }
             
            else
                return state;      
            case ActionTypes.DELETE_CART:
                return state.filter((item) => item.id !== action.payload); 
                
            case ActionTypes.DELETE_CART_ARRAY:
                return [];  
        default:
          return state;
      }
};