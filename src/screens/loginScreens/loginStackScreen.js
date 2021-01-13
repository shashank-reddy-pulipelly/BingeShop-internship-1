import React from 'react';

import { createStackNavigator,TransitionPresets, } from '@react-navigation/stack';

import  OpenScreen  from './OpenScreen';
import  LoginScreen  from './LoginScreen';
import  RegisterScreen  from './RegisterScreen';
import  ForgotPasswordScreen  from './ForgotPasswordScreen';
import  MobileLoginScreen from './MobileLoginScreen';
import  OtpScreen  from './OtpScreen';


const LoginStack = createStackNavigator();

const LoginStackScreen = ({navigation}) => (
    <LoginStack.Navigator screenOptions={{  
        ...TransitionPresets.SlideFromRightIOS}} headerMode='none'>
        <LoginStack.Screen name="OpenScreen" component={OpenScreen}/>
        <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
        <LoginStack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <LoginStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        <LoginStack.Screen name="MobileLoginScreen" component={MobileLoginScreen}/>
        <LoginStack.Screen name="OtpScreen" component={OtpScreen}/>
    </LoginStack.Navigator>
);

export default LoginStackScreen;