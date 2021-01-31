import React,{Component} from 'react';

class Amount extends Component {
  
  render(){
   const AmountArray=this.props.carts.map(item1 => {
       const produ=item1.products.map(item=>{
       
        return item.price*item.count;
       })

       const fun1 =(total, num) =>{
        return total + num;
      }

     return produ.reduce(fun1);
   })
    
   
 

    const fun =(total, num) =>{
        return total + num;
      }

    const Amount=AmountArray.reduce(fun,0);


   
    return Amount.toFixed(1);
  }
}




export default Amount;

