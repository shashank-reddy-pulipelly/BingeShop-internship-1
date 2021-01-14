import FilterItems from '../components/filterItems';
import * as ActionTypes from './ActionTypes';

export const carts = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_CART:
            if (state.some(el =>  el.shop_id==action.payload.shop_id ))
            {
                const newState=state.map(item=>{
                    if(item.shop_id==action.payload.shop_id){
                  
                    if(item.products.some(el=>el.prod_id == action.payload.prod_id)){
                      const newProducts=item.products.map(product=>{

                        if(product.prod_id==action.payload.prod_id){
                            return({...product,count:product.count+1})
                        }
                        else{
                            return product;
                        }
                      })                       
                      return ({shop_id:item.shop_id,products:newProducts});
                    }
                    else{
                        return({...item,products:item.products.concat({prod_id:action.payload.prod_id,count:1})})
                    }
                }
                else{
                    return item;
                }
                }) 
                return newState;
                
            }
             
            else{
                return state.concat({shop_id:action.payload.shop_id,products:[{ prod_id:action.payload.prod_id,count:1}] });
            }
               
                  
               

        case ActionTypes.DECREASE_CART:
            if (state.some(el =>  el.shop_id==action.payload.shop_id ))
            {
                const newState=state.map(item=>{
                    if(item.shop_id==action.payload.shop_id){
                  
                    if(item.products.some(el=>el.prod_id == action.payload.prod_id)){
                      const newProducts=item.products.map(product=>{

                        if(product.prod_id==action.payload.prod_id){
                            return({...product,count:product.count-1})
                        }
                        else{
                            return product;
                        }
                      })                       
                      return ({shop_id:item.shop_id,products:newProducts});
                    }
                    else{
                        return item;
                    }
                }
                else{
                    return item;
                }
                }) 
                return newState;
                
            }
             
            else{
                return state;
            }      
            case ActionTypes.DELETE_CART:
                if (state.some(el =>  el.shop_id==action.payload.shop_id ))
            {
                const newState=state.map(item=>{
                    if(item.shop_id==action.payload.shop_id){
                  
                    if(item.products.some(el=>el.prod_id == action.payload.prod_id)){
                        if(item.products.length==1){
                            return null;
                        }
                        else{
                            const newProducts=item.products.filter(product=>product.prod_id != action.payload.prod_id)                      
                            return  ({shop_id:item.shop_id,products:newProducts});
                        }
                 
                    }
                    else{
                        return item;
                    }
                }
                else{
                    return item;
                }
                }) 
                return newState.filter(item=>item!=null);
                
            }
             
            else{
                return state;
            }
                
            case ActionTypes.DELETE_CART_ARRAY:
                return [];  
        default:
          return state;
      }
};