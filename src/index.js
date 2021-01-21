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
import { StyleSheet,  View,Dimensions,StatusBar } from 'react-native';
const Drawer = createDrawerNavigator();
import * as Animatable from 'react-native-animatable';
import { theme } from './core/theme';
export default function App() {

  const initialLoginState = {
    isLoading:true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

  const authContext=React.useMemo(()=>({
    signIn:async (phoneNumber) =>{
   
 
    const userToken=String(phoneNumber);
    const username=phoneNumber;
  
       try{
        
         await AsyncStorage.setItem('userToken',userToken)
       }
       catch(e){
         console.log(e)
       }
   
     dispatch({type:'LOGIN',id:username,token:userToken})
    },
    signOut:async()=>{
    
     try{
      
       await AsyncStorage.removeItem('userToken')
     }
     catch(e){
       console.log(e)
     }
     
 
     dispatch({type:'LOGOUT'})
    },
   toggleTheme:()=>{

     setIsDarkTheme(isDarkTheme=> !isDarkTheme )
   }
  }),[])

  useEffect(()=>{
    setTimeout(async()=>{
     
     let userToken=null;
     try{
       userToken = await AsyncStorage.getItem('userToken')
     }
     catch(e){
       console.log(e)
     }
     dispatch({type:'RETRIEVE_TOKEN',token:userToken})
    },2000)
  },[])

  if(loginState.isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center', backgroundColor: theme.colors.primary,alignItems:'center'}}>
<StatusBar backgroundColor={theme.colors.primary} barStyle="light-content"/>
<Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
     
      </View>
    );
  }
  return (

    <AuthContext.Provider value={authContext}>
       
     <NavigationContainer >

{loginState.userToken  !== null ? (<Drawer.Navigator 
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
</AuthContext.Provider> 
   
  );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   
  },
  logo: {
    width: height_logo,
    height: height_logo
},
});