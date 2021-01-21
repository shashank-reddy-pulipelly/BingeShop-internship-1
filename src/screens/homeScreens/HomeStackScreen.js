import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import React, {Component } from 'react';
import HomeScreen from './homeScreen';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import FavoriteScreen from './FavoriteScreen';
import GroceryShopsScreen from './GroceryShopsScreen';
import VegetableShopsScreen from './VegetableShopsScreen';
import SearchScreen from './SearchScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,TouchableOpacity, StatusBar} from 'react-native';
const HomeStack = createStackNavigator();
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import {theme} from '../../core/theme';
import HeaderButton from '../../components/HeaderButton';
import SearchContentScreen from './SearchContentScreen';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const mapStateToProps = state => {
  return {
  carts:state.carts.carts
  }
}
 class HomeStackScreen extends Component {
  
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
    onPress={()=>navigation.navigate('FavoriteScreen')} />
   <CartBadge />
   
  </HeaderButtons>
  </View>
     )
   }
    return (
    
        <HomeStack.Navigator  screenOptions={{
          headerStatusBarHeight:StatusBar.currentHeight,
        headerStyle:{
          backgroundColor:theme.colors.primary,
          height:70,
            
        },       
        headerTintColor:'#fff',
        headerTitleStyle:{fontSize:18,marginLeft:60},    
    
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
           <HomeStack.Screen 
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          headerRight: () => rightHeader(),
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
          headerRight: () => rightHeader(),
          title: route.params.title,
          headerBackTitleVisible: false,
         
       
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
          headerRight: () => rightHeader(),
          title: route.params.title,
          headerBackTitleVisible: false,
          
        })}
      />
      <HomeStack.Screen 
        name="CardItemDetails"
        component={CardItemDetails}
        options={() => ({
          headerRight: () => rightHeader(),
          headerBackTitleVisible: false,
          title: "Details",
         
        })}
      />
        
     
        <HomeStack.Screen 
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={({route}) => ({
          headerRight: () => rightHeader(),
          title: "Favorites",
          headerBackTitleVisible: false
        })}
      />

<HomeStack.Screen 
        name="SearchScreen"
        component={SearchScreen}
        options={({route}) => ({
          headerRight: () => rightHeader(),
          title: "Search",
          headerBackTitleVisible: false,
          headerShown:false
        })}
      />
          <HomeStack.Screen 
        name="SearchContentScreen"
        component={SearchContentScreen}
        options={({route}) => ({
          headerTitleStyle:{       
            fontSize:18,
            marginLeft:-10,
            width:200
          },
          headerRight: () => rightHeader(),
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
   
         
        </HomeStack.Navigator> 
   
    )
  }
}

export default connect(mapStateToProps)(HomeStackScreen);



