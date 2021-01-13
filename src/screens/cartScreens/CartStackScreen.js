import { createStackNavigator,TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
import React, {Component } from 'react';


import CartScreen from './CartScreen';
import CartSummaryScreen from './CartSummaryScreen';
import AddressScreen from './AddressScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import HeaderButton from '../../components/HeaderButton';
import {theme} from '../../core/theme';
const CartStack = createStackNavigator();

const mapStateToProps = state => {
  return {
  carts:state.carts
  }
}
 class CartStackScreen extends Component {
  constructor(props) {
    super(props)
  
    
  }
  
  render() {
   const {navigation}=this.props;
   const CartBadge=()=>{
    return(
      <TouchableOpacity onPress={() => {navigation.navigate('CartScreen')}} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',marginLeft:3}}>
      <IconBadge
        MainElement={
          <Icon.Button
          name="ios-cart"
          size={25}
          color='#fff'
          backgroundColor={theme.colors.primary}
          onPress={() => {navigation.navigate('CartScreen')}}
        />
        }
        BadgeElement={
          <TouchableOpacity onPress={() => {navigation.navigate('CartScreen')}}> 
            <Text style={{fontSize:12,color:'#FFFFFF'}}>{this.props.carts.length}</Text></TouchableOpacity>
         
        }
        IconBadgeStyle={
          {width:18,
          height:18,
          top:5,
          right:5,
          backgroundColor: '#FF6D00'}
        }
        Hidden={this.props.carts.length==0}
        />
    </TouchableOpacity>
    )
   }

   const rightHeader=()=>{
     return(
       <View style={{marginRight:10}}>
  <HeaderButtons HeaderButtonComponent={HeaderButton} >
    <Item title='favorite' iconName='ios-heart' 
    onPress={()=>navigation.navigate('HomeDrawer',{screen:'FavoriteScreen'})} />
   <CartBadge />
   
  </HeaderButtons>
  </View>
     )
   }
    return (
    
        <CartStack.Navigator  screenOptions={{
        headerStyle:{
          backgroundColor:theme.colors.primary,
          height:70,
          elevation:0,            
        },       
        headerTintColor:'#fff',
        headerTitleStyle:{fontSize:18,marginLeft:60},    
    
       ...TransitionPresets.SlideFromRightIOS
      }
      } 
      headerMode="float"
      animation="fade" >
      
        
    
     
         <CartStack.Screen 
        name="CartScreen"
        component={CartScreen}
        options={({route}) => ({
            headerLeft:()=>(
                <View style={{marginLeft:10}}>
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                  <Item title='favorite' iconName='md-arrow-back' 
                  onPress={()=>navigation.navigate('HomeDrawer')} />
                
                 
                </HeaderButtons>
                </View>
                
              ),
          headerRight: () => rightHeader(),
          title: "My Cart",
          headerBackTitleVisible: false
        })}
      />
      
      <CartStack.Screen 
        name="AddressScreen"
        component={AddressScreen}
        options={({route}) => ({
          headerTitleStyle:{
       
            fontSize:18,
            marginLeft:20
          },
       
          title: "Add delivery address",
          headerBackTitleVisible: false
        })}
      />
     
          <CartStack.Screen 
        name="CartSummaryScreen"
        component={CartSummaryScreen}
        options={({route}) => ({
          headerTitleStyle:{
       
            fontSize:18,
            marginLeft:20
          },
       
          title: "Order Summary ",
          headerBackTitleVisible: false
        })}
      />
        </CartStack.Navigator> 
   
    )
  }
}

export default connect(mapStateToProps)(CartStackScreen);



