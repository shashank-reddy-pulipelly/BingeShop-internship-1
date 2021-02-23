import { createStackNavigator,TransitionPresets, CardStyleInterpolators  } from '@react-navigation/stack';
import React, {Component } from 'react';

import CountDown from 'react-native-countdown-component';
import CartScreen from './CartScreen';
import CartSummaryScreen from './CartSummaryScreen';
import AddressScreen from './AddressScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,TouchableOpacity,StatusBar,Platform} from 'react-native';
  import * as firebase from 'firebase';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import HeaderButton from '../../components/HeaderButton';
import {theme} from '../../core/theme';
const CartStack = createStackNavigator();


 class CartStackScreen extends Component {
constructor(props) {
  super(props)

  this.state = {
     cartExists:false
  }
}

componentDidMount(){
  if(firebase.auth().currentUser){


  this.sub1=firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts`).on('value',snap=>{
   if(snap.exists()){
     this.setState({cartExists:true})
   }
   else{
    this.setState({cartExists:false})
   }
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
      <View></View>
         
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
       <View style={{marginRight:10}}>
  <HeaderButtons HeaderButtonComponent={HeaderButton} >
    <Item title='favorite' iconName='ios-heart' 
    onPress={()=>navigation.navigate('HomeDrawer',{screen:'FavoriteScreen'})} />
   <CartBadge />
   
  </HeaderButtons>
  </View>
     )
   }
   const count=()=>{
     return(
       <View style={{marginRight:20}}>
         {this.state.cartExists?          
       <CountDown 
        size={17}
        until={1*60}
        onFinish={() => navigation.navigate('CartScreen')}
        
        digitStyle={{backgroundColor: theme.colors.primary}}
        digitTxtStyle={{color: 'white',fontSize:20}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: 'white'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
    />:<View></View>}
         
       </View>
     )
   }
    return (
    
        <CartStack.Navigator  screenOptions={{
          headerStatusBarHeight:Platform.OS === 'ios' ? 30:StatusBar.currentHeight,
        headerStyle:{
          backgroundColor:theme.colors.primary,
          height:Platform.OS === 'ios' ? 30+40:StatusBar.currentHeight+45,
                 
        },       
        headerTintColor:'#fff',
        headerTitleStyle:{fontSize:18},    
    
       ...TransitionPresets.SlideFromRightIOS
      }
      } 
      headerMode="float"
      animation="fade" >
      
        
    
     
         <CartStack.Screen 
        name="CartScreen"
        component={CartScreen}
        options={({route}) => ({
          headerTitleStyle:{
       
            fontSize:18,
            alignSelf:'center',
            paddingRight:40
          },
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
            alignSelf:'center',
            paddingRight:40
          },
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
            alignSelf:'center',
            paddingRight:40
          },
          headerTitleStyle:{
       
            fontSize:18,
            marginLeft:20
          },
          headerRight:()=>count(),
          title: "Order Summary ",
          headerBackTitleVisible: false
        })}
      />
        </CartStack.Navigator> 
   
    )
  }
}

export default CartStackScreen;



