
import React from 'react';
import {StyleSheet, View,Dimensions,StatusBar} from 'react-native';

import * as Animatable from 'react-native-animatable';

const SplashScreen=()=>{
    return(
        <View style={{flex:1,justifyContent:'center', backgroundColor: '#F44336',alignItems:'center'}}>
        <StatusBar backgroundColor='#F44336' barStyle="light-content"/>
        <Animatable.Image 
                        animation="bounceIn"
                        duraton="1500"
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                    />
             
              </View>
    )
};

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


 export default SplashScreen;
    