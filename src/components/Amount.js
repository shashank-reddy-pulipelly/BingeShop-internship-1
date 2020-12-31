import React,{Component} from 'react';
import {View, Text,Button , Image, StyleSheet,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {data} from '../data/groceries';

const mapStateToProps = state => {
  return {
    carts: state.carts
  }
}

const mapDispatchToProps = dispatch => ({

})

class Amount extends Component {
 
  constructor(props) {
    super(props)
    
    this.state = {
      
    }
 
  }

  render(){
 
   const cartItemData=data.filter(item => this.props.carts.some(el => el.id === item.id))
    
   
   const amountArray=cartItemData.map((item)=>{
     const cartIdCountData=this.props.carts.filter((cartItem)=>cartItem.id==item.id)
        return item.amount*cartIdCountData[0].count;
    });

    const fun =(total, num) =>{
        return total + num;
      }

    const Amount=amountArray.reduce(fun);


   
    return Amount;
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(Amount);

const styles = StyleSheet.create({
  
  
});