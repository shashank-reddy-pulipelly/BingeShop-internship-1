import { createStackNavigator } from '@react-navigation/stack';
import React,{memo} from 'react';
import HomeScreen from './homeScreen';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import Search from './SearchScreen';
import CartScreen from './CartScreen';
import FavoriteScreen from './FavoriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
const HomeStack = createStackNavigator();
const HomeStackScreen=({navigation})=>{
 
    return (
  <HomeStack.Navigator  screenOptions={{
        headerStyle:{
          backgroundColor:'#600EE6',
          height:70,
          elevation:0,            
        },       
        headerTintColor:'#fff',
        headerTitleStyle:{
          fontWeight:'bold',
          fontSize:20,
          marginLeft:70
        },
       
      }
      } >
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
                <Icon.Button
                  name="ios-cart"
                  size={25}
                  color='#fff'
                  backgroundColor='#600EE6'
                  onPress={() => {navigation.navigate('CartScreen')}}
                />
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
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
              <Icon.Button
                name="ios-cart"
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('CartScreen')}}
              />
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
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
              <Icon.Button
                name="ios-cart"
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('CartScreen')}}
              />
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
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
              <Icon.Button
                name="ios-cart"
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('CartScreen')}}
              />
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
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
              <Icon.Button
                name="ios-cart"
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('CartScreen')}}
              />
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
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('FavoriteScreen')}}
              />
              <Icon.Button
                name="ios-cart"
                size={25}
                color='#fff'
                backgroundColor='#600EE6'
                onPress={() => {navigation.navigate('CartScreen')}}
              />
            </View>
          ),
          title: "Favorites",
          headerBackTitleVisible: false
        })}
      />
        </HomeStack.Navigator> 
         )
  }

  export default memo(HomeStackScreen);