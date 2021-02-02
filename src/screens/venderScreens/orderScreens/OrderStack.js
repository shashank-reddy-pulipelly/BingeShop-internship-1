import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import React, {Component } from 'react';
import OrdersScreen from './OrdersScreen';

import OrderDetailsScreen from './OrderDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,TouchableOpacity,Platform,StatusBar} from 'react-native';
const OrdersStack = createStackNavigator();
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import {theme} from '../../../core/theme';
import HeaderButton from '../../../components/HeaderButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const mapStateToProps = state => {
  return {

  }
}
 class OrdersStackScreen extends Component {
  
  render() {
   const {navigation}=this.props;
   const CartBadge=()=>{
    return(
      <TouchableOpacity onPress={() => {navigation.navigate('ProductsDrawer',{screen:'ProductsScreen'})}} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',marginLeft:3}}>
      <IconBadge
        MainElement={
          <FontAwesome.Button name='list' 
            size={22}
          color='#fff' style={{paddingRight:0}}
          backgroundColor={theme.colors.primary}
          onPress={() => {navigation.navigate('ProductsDrawer',{screen:'ProductsScreen'})}}/> 
        }
        BadgeElement={
          <TouchableOpacity onPress={() => {navigation.navigate('ProductsDrawer',{screen:'ProductsScreen'})}}> 
            <Text style={{fontSize:12,color:'#FFFFFF'}}></Text></TouchableOpacity>
         
        }
        IconBadgeStyle={
          {width:18,
          height:18,
          top:5,
          right:5,
          backgroundColor: '#FF6D00'}
        }
        Hidden={true}
        />
    </TouchableOpacity>
    )
   }

   const rightHeader=()=>{
     return(
       <View style={{marginRight:20}}>
  <HeaderButtons HeaderButtonComponent={HeaderButton} >
  <Item title='favorite' iconSize={27} iconName='ios-list' 
    onPress={()=>navigation.navigate('ProductsDrawer',{screen:'ProductsScreen'})} /> 
 
   
  </HeaderButtons>
  </View>
     )
   }
    return (
    
        <OrdersStack.Navigator  screenOptions={{
          headerStatusBarHeight:Platform.OS === 'ios' ? 30:StatusBar.currentHeight,
        headerStyle:{
          backgroundColor:theme.colors.primary,
          height:70,
                  
        },       
        headerTintColor:'#fff',
        headerTitleStyle:{fontSize:18,alignSelf:'center'},    
    
       ...TransitionPresets.SlideFromRightIOS
      }
      } 
      headerMode="float"
      animation="fade" >
          <OrdersStack.Screen name="VendorOrdersScreen" component={OrdersScreen}
          options={{
            title:'Orders', 
               
            headerLeft:()=>(
              <View style={{
                marginLeft:20,
            
                justifyContent:'center'
              }}>
            <Icon.Button name='ios-menu' style={{
               paddingRight:2
              }} size={25}  backgroundColor={theme.colors.primary}
              onPress={()=>navigation.toggleDrawer()} ></Icon.Button>
              </View>
              
            ),
            headerRight: () => rightHeader(),
          }
           
          } />
      
       
      <OrdersStack.Screen 
        name="VendorOrderDetailsScreen"
        component={OrderDetailsScreen}
        options={() => ({
          headerTitleStyle:{
            fontSize:18,
           alignSelf:'center'
          },   
          headerRight: () => rightHeader(),
          headerBackTitleVisible: false,
          title: "Order Details",
       
        })}
      />
   
         
        </OrdersStack.Navigator> 
   
    )
  }
}

export default connect(mapStateToProps)(OrdersStackScreen);



