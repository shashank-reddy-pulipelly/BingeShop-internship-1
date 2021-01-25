import { createStackNavigator,TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
import React, {Component } from 'react';

import OffersScreen from './OffersScreen';


import {theme} from '../../core/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import HeaderButton from '../../components/HeaderButton';

const OfferStack = createStackNavigator();

const mapStateToProps = state => {
  return {
  carts:state.carts.carts
  }
}
 class OfferStackScreen extends Component {

  
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
    onPress={()=>navigation.navigate('HomeDrawer',{screen:'FavoriteScreen'})} />
   <CartBadge />
   
  </HeaderButtons>
  </View>
     )
   }
    return (
    
        <OfferStack.Navigator  screenOptions={{
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
      <OfferStack.Screen 
        name="OffersScreen"
        component={OffersScreen}
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
          title: "Offers",
          headerBackTitleVisible: false
        })}
      />
 
   
        </OfferStack.Navigator> 
   
    )
  }
}

export default connect(mapStateToProps)(OfferStackScreen);



