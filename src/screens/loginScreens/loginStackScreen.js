import React from 'react';

import { createStackNavigator,TransitionPresets, } from '@react-navigation/stack';

import  OpenScreen  from './OpenScreen';
import  LoginScreen  from './LoginScreen';

import  OtpScreen  from './OtpScreen';


const LoginStack = createStackNavigator();

const LoginStackScreen = ({navigation}) => (
    <LoginStack.Navigator  headerMode='none'>
        <LoginStack.Screen name="OpenScreen" component={OpenScreen}/>
        <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
        <LoginStack.Screen name="OtpScreen" component={OtpScreen}/>
    </LoginStack.Navigator>
);

export default LoginStackScreen;