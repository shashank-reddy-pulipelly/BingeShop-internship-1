import { createStackNavigator,TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
import React, { Component } from 'react';
import HomeScreen from './homeScreen';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import Search from './SearchScreen';
import CartScreen from './CartScreen';
import FavoriteScreen from './FavoriteScreen';
import OrdersScreen from './OrdersScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import GroceryShopsScreen from './GroceryShopsScreen';
import VegetableShopsScreen from './VegetableShopsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,TouchableOpacity} from 'react-native';
const HomeStack = createStackNavigator();
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

const mapStateToProps = state => {
  return {
  carts:state.carts
  }
}
 class HomeStackScreen extends Component {
  constructor(props) {
    super(props)
  
    
  }
  
  render() {
   const {navigation}=this.props;
   const CartBadge=()=>{
    return(
      <TouchableOpacity onPress={() => {navigation.navigate('CartScreen')}} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
      <IconBadge
        MainElement={
          <Icon.Button
          name="ios-cart"
          size={25}
          color='#fff'
          backgroundColor='#600EE6'
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
    return (
    
        <HomeStack.Navigator  screenOptions={{
        headerStyle:{
          backgroundColor:'#600EE6',
          height:70,
          elevation:0,            
        },       
        headerTintColor:'#fff',
        headerTitleStyle:{
       
          fontSize:18,
          marginLeft:60
        },
     
       gestureEnabled:true,
       gestureDirection:'horizontal',
       ...TransitionPresets.SlideFromRightIOS
      }
      } 
      headerMode="float"
      animation="fade" >
          <HomeStack.Screen name="Home" component={HomeScreen}
          options={{
            title:'BitsBaton',
         
            headerLeft:()=>(
              <View style={{
                marginLeft:20,
                elevation:0,  
                justifyContent:'center'
              }}>
            <Icon.Button name='ios-menu' style={{
               paddingRight:2
              }} size={25}  backgroundColor="#600EE6"
              onPress={()=>navigation.toggleDrawer()} ></Icon.Button>
              </View>
              
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row', marginRight: 10}}>
                <Icon.Button
                  name="ios-heart"
                  size={23}
                  color='#fff'
                  backgroundColor='#600EE6'
                  onPress={() => {navigation.navigate('FavoriteScreen')}}
                />
               
                <CartBadge />
              </View>
            ),
          }
           
          } />
           <HomeStack.Screen 
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
          <CartBadge />
            </View>
          ),
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
             <HomeStack.Screen 
        name="GroceryShopsScreen"
        component={GroceryShopsScreen}
        options={({route}) => ({
          headerTitleStyle:{
       
            fontSize:18,
            marginLeft:20
          },
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
          <CartBadge />
            </View>
          ),
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
        <HomeStack.Screen 
        name="VegetableShopsScreen"
        component={VegetableShopsScreen}
        options={({route}) => ({
          headerTitleStyle:{
       
            fontSize:17,
            marginLeft:20
          },
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
          <CartBadge />
            </View>
          ),
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen 
        name="CardItemDetails"
        component={CardItemDetails}
        options={() => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
            <CartBadge />
            </View>
          ),
          headerBackTitleVisible: false,
          title: "Details",
       
        })}
      />
             <HomeStack.Screen 
        name="SearchScreen"
        component={Search}
        options={({route}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
             <CartBadge />
            </View>
          ),
          title: "Search",
          headerBackTitleVisible: false
        })}
      />
         <HomeStack.Screen 
        name="CartScreen"
        component={CartScreen}
        options={({route}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
             <CartBadge />
            </View>
          ),
          title: "My Cart",
          headerBackTitleVisible: false
        })}
      />
        <HomeStack.Screen 
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={({route}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
            <CartBadge />
            </View>
          ),
          title: "Favorites",
          headerBackTitleVisible: false
        })}
      />
          <HomeStack.Screen 
        name="OrdersScreen"
        component={OrdersScreen}
        options={({route}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
            <CartBadge />
            </View>
          ),
          title: "My Orders",
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen 
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={({route}) => ({
          headerTitleStyle:{
       
            fontSize:18,
            marginLeft:40
          },
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-heart"
                size={23}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
            <CartBadge />
            </View>
          ),
          title: "Order Details",
          headerBackTitleVisible: false
        })}
      />
        </HomeStack.Navigator> 
   
    )
  }
}

export default connect(mapStateToProps)(HomeStackScreen);



