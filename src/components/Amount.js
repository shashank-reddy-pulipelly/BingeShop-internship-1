import React,{Component} from 'react';


import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    carts: state.carts,
    shops:state.shops,
    shopProductsList:state.shopProductsList,
    products:state.products
  }
}

const mapDispatchToProps = dispatch => ({

})

class Amount extends Component {
 
  render(){
 
   const AmountArray=this.props.carts.map(item => {
    const amount=this.props.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item.shop_id).products.find((product)=>product.prod_id==item.prod_id).price;
    return amount*item.count;
   })
    
   
 

    const fun =(total, num) =>{
        return total + num;
      }

    const Amount=AmountArray.reduce(fun);


   
    return Amount;
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(Amount);

