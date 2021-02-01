import { createStackNavigator,TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
import React, {Component } from 'react';

import OrdersScreen from './OrdersScreen';
import * as firebase from 'firebase';
import OrderDetailsScreen from './OrderDetailsScreen';
import {theme} from '../../core/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,TouchableOpacity} from 'react-native';


import IconBadge from 'react-native-icon-badge';
import HeaderButton from '../../components/HeaderButton';

const OrderStack = createStackNavigator();


 class OrderStackScreen extends Component {
constructor(props) {
  super(props)

  this.state = {
     cartLength:0
  }
}

  componentDidMount(){
    if(firebase.auth().currentUser){

   
    this.sub1=firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts`).on('value',snap=>{
      var count=[];
      for(const key in snap.val()){
          count.push(1);
      }
      
      this.setState({cartLength:count.length})
    })
  }
    }
    componentWillUnmount(){
      if(firebase.auth().currentUser){

   
     
        firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts`).off('value',this.sub1)
      }
      }
  render() {
   const {navigation}=this.props;
   const CartBadge=()=>{
    return(
      <TouchableOpacity onPress={() => {navigation.navigate('CartDrawer',{screen:'CartScreen'})}} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',marginLeft:3}}>
      <IconBadge
        MainElement={
          <Icon.Button
          name="ios-cart"
          size={25}
          color='#fff'
          backgroundColor={theme.colors.primary}
          onPress={() => {navigation.navigate('CartDrawer',{screen:'CartScreen'})}}
        />
        }
        BadgeElement={
          <TouchableOpacity onPress={() => {navigation.navigate('CartDrawer',{screen:'CartScreen'})}}> 
            <Text style={{fontSize:12,color:'#FFFFFF'}}>{this.state.cartLength}</Text></TouchableOpacity>
         
        }
        IconBadgeStyle={
          {width:18,
          height:18,
          top:5,
          right:5,
          backgroundColor: '#FF6D00'}
        }
        Hidden={this.state.cartLength==0}
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
    
        <OrderStack.Navigator  screenOptions={{
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
      <OrderStack.Screen 
        name="OrdersScreen"
        component={OrdersScreen}
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
          title: "My Orders",
          headerBackTitleVisible: false
        })}
      />
      <OrderStack.Screen 
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={({route}) => ({
          headerTitleStyle:{
       
            fontSize:18,
            marginLeft:40
          },
          headerRight: () => rightHeader(),
          title: "Order Details",
          headerBackTitleVisible: false
        })}
      />
   
        </OrderStack.Navigator> 
   
    )
  }
}

export default OrderStackScreen;



