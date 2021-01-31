import React,{Component} from 'react';


import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {

    shops:state.shops,
    shopProductsList:state.shopProductsList,
    products:state.products
  }
}

const mapDispatchToProps = dispatch => ({

})

class Amount extends Component {
 
  render(){
 
   const AmountArray=this.props.shopList.products.map(item => {
   
    return item.price*item.count;
   })
    
   
 

    const fun =(total, num) =>{
        return total + num;
      }

    const Amount=AmountArray.reduce(fun,0);


   
    return Amount.toFixed(1);
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(Amount);

