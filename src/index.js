import React,{useEffect} from 'react';
import 'react-native-gesture-handler';
import LoginStackScreen from './screens/loginScreens/loginStackScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screens/DrawerContent';
import ProductsStack from './screens/venderScreens/productsScreens/ProductsStack';
import OrdersStack from './screens/venderScreens/orderScreens/OrderStack';
import HomeStackScreen from './screens/homeScreens/HomeStackScreen';
import CartStackScreen from './screens/cartScreens/CartStackScreen';
import OrderStackScreen from './screens/orderScreens/OrderStackScreen';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginReducer} from './redux/loginReducer';
import {   NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


export default function App() {

  const initialLoginState = {
    isLoading: false,
    userName: null,
    userToken: null,
  };

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

 


  return (

    
       
     <NavigationContainer >

{loginState.userToken  == null ? (<Drawer.Navigator 
   drawerContent={props=> <DrawerContent {...props} /> }
   headerMode='none' 
   screenOptions={{
     header:()=>(null)}}>
    <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
   <Drawer.Screen name="CartDrawer" component={CartStackScreen} />
   <Drawer.Screen name="OrderDrawer" component={OrderStackScreen} /> 
   <Drawer.Screen name='ProductsDrawer' component={ProductsStack} />
   <Drawer.Screen name='VendorOrdersDrawer' component={OrdersStack} />
</Drawer.Navigator>):<LoginStackScreen />}
</NavigationContainer>
   
   
  );
}

