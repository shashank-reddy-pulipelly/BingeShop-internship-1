import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import React, {PureComponent } from 'react';
import ProductsScreen from './ProductsScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,TouchableOpacity} from 'react-native';
const ProductsStack = createStackNavigator();
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import {theme} from '../../../core/theme';
import HeaderButton from '../../../components/HeaderButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
const mapStateToProps = state => {
  return {

  }
}
 class ProductsStackScreen extends PureComponent {
  constructor(props) {
    super(props)
  
    this.state = {
       orders:0
    }
  }
  componentDidMount(){
const query=firebase.database().ref('Orders').orderByChild('orderDetials/shop_id').equalTo('Shop_1');
query.on("value",(snapshot) =>{
  var count=0;
  snapshot.forEach((childSnapshot)=> {
   
    
  
    var childData = childSnapshot.val();
    if(!childData.orderStatus.delivered){
      count =count+1;
    }
})
this.setState({orders:count});
})
  }
  render() {
   const {navigation}=this.props;
   const CartBadge=()=>{
    return(
      <TouchableOpacity onPress={() => {navigation.navigate('VendorOrdersDrawer',{screen:'VendorOrdersScreen'})}} style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',marginLeft:3}}>
      <IconBadge
        MainElement={
 
        <FontAwesome5.Button name='list-alt' size={22}
        color='#fff'
        backgroundColor={theme.colors.primary} style={{paddingRight:0}}
        onPress={() => {navigation.navigate('VendorOrdersDrawer',{screen:'VendorOrdersScreen'})}}/> 
        }
        BadgeElement={
          <TouchableOpacity onPress={() => {navigation.navigate('VendorOrdersDrawer',{screen:'VendorOrdersScreen'})}}> 
            <Text style={{fontSize:12,color:'#FFFFFF'}}>{this.state.orders}</Text></TouchableOpacity>
         
        }
        IconBadgeStyle={
          {width:18,
          height:18,
          top:5,
          right:5,
          backgroundColor: '#FF6D00'}
        }
        Hidden={this.state.orders==0}
        />
    </TouchableOpacity>
    )
   }

   const rightHeader=()=>{
     return(
       <View style={{marginRight:20}}>
  <HeaderButtons HeaderButtonComponent={HeaderButton} >
  
     <CartBadge />

   
  </HeaderButtons>
  </View>
     )
   }
    return (
    
        <ProductsStack.Navigator  screenOptions={{
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
          <ProductsStack.Screen name="ProductsScreen" component={ProductsScreen}
          options={{
            title:'My Products', 
            headerTitleStyle:{
              fontSize:17,
              alignSelf:'center'
            },  
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
      
       
      <ProductsStack.Screen 
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={() => ({
          headerTitleStyle:{
            fontSize:17,
            alignSelf:'center'
          },   
          headerRight: () => rightHeader(),
          headerBackTitleVisible: false,
          title: "Product Details",
       
        })}
      />
   
         
        </ProductsStack.Navigator> 
   
    )
  }
}

export default connect(mapStateToProps)(ProductsStackScreen);



