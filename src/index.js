import React,{useEffect,useState} from 'react';
import 'react-native-gesture-handler';
import LoginStackScreen from './screens/loginScreens/loginStackScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screens/DrawerContent';
import HomeStackScreen from './screens/homeScreens/HomeStackScreen';
import CartStackScreen from './screens/cartScreens/CartStackScreen';
import OrderStackScreen from './screens/orderScreens/OrderStackScreen';
import OfferStackScreen from './screens/offersScreens/OfferStackScreen';
import {   NavigationContainer } from '@react-navigation/native';
import { StyleSheet,  View,Dimensions,StatusBar,Platform } from 'react-native';
const Drawer = createDrawerNavigator();
import * as Animatable from 'react-native-animatable';
import { theme } from './core/theme';
import * as firebase from 'firebase';
export default function App() {

  const [isLoading,setIsLoading]=useState(true);
  const [userFound,setUserFound]=useState(false);




  useEffect(()=>{
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
     setUserFound(true)
      } else {
       setUserFound(false)
      }
    })
    setTimeout(()=>{
      setIsLoading(false)
 
     },2000)
    

  },[])

  if(isLoading) {
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

  
       
     <NavigationContainer >

{userFound ? (<Drawer.Navigator 
   drawerContent={props=> <DrawerContent {...props} /> }
   headerMode='none' 
   screenOptions={{
     header:()=>(null)}}>
    <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
    <Drawer.Screen name="OfferDrawer" component={OfferStackScreen} /> 
   <Drawer.Screen name="CartDrawer" component={CartStackScreen} />
   <Drawer.Screen name="OrderDrawer" component={OrderStackScreen} /> 

</Drawer.Navigator>):<LoginStackScreen />}
</NavigationContainer>

   
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