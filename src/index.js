import React,{useEffect} from 'react';
import 'react-native-gesture-handler';

import LoginStackScreen from './screens/loginScreens/loginStackScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screens/DrawerContent';
import SplashScreen from './screens/splashScreen';
import HomeStackScreen from './screens/homeScreens/HomeStackScreen';
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

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

   const authContext=React.useMemo(()=>({
     signIn:async (foundUser) =>{
         
     const userToken=String(foundUser[0].userToken);
     const username=foundUser[0].username;
   
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
      dispatch({type:'LOGIN'})
     
      dispatch({type:'LOGOUT'})
     },
     signUp: () => {
    
    }
   }),[])

  //  useEffect(()=>{
  //    setTimeout(async()=>{
      
  //     let userToken=null;
  //     try{
  //       userToken = await AsyncStorage.getItem('userToken')
  //     }
  //     catch(e){
  //       console.log(e)
  //     }
  //     dispatch({type:'RETRIEVE_TOKEN',token:userToken})
  //    },2000)
  //  },[])
  //  if(loginState.isLoading) {
  //   return(
  //       <SplashScreen />
  //   );
  // }
  return (
    <AuthContext.Provider value={authContext}>
     <NavigationContainer >

        {loginState.userToken  == null ? (<Drawer.Navigator 
           drawerContent={props=> <DrawerContent {...props} /> }
           headerMode='none'
           screenOptions={{
             header:()=>(null)}}>
           <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} /> 
      </Drawer.Navigator>):<LoginStackScreen />}
      </NavigationContainer>
   </AuthContext.Provider>   
  );
}


