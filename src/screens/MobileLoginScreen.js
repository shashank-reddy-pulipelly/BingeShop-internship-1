
import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity,View } from 'react-native';
import { numberValidator } from '../core/utils';
import BackButton from '../components/BackButton';

import TextInput from '../components/TextInput';
import { theme } from '../core/theme';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const MobileLoginScreen = ({ navigation }) => {
  const [number, setNumber] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    
    const numberError = numberValidator(number.value);

    if (numberError) {
      setNumber({ ...number, error: numberError });
      return;
    }

    navigation.navigate('OtpScreen',{number:number.value});
  };

  return (
 <View style={styles.container}>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />
<View style={styles.phone}>
<Icon name="mobile" size={150} color={ theme.colors.primary} />
</View>
      

    
      <Text style={styles.text1}>Login with Mobile Number</Text>
      <Text style={styles.text2} >Enter your mobile number  we will send you OTP to verify</Text>
      <TextInput
        label="Mobile Number"
        returnKeyType="done"
        value={number.value}
        onChangeText={text => setNumber({ value: text, error: '' })}
        error={!!number.error}
        errorText={number.error}
      
        keyboardType="numeric"
      />

      <TouchableOpacity
                    style={styles.signIn}
                    onPress={_onSendPressed} 
                >
                <LinearGradient
                    colors={['#600EE6','#311B92']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Continue</Text>
                </LinearGradient>
                </TouchableOpacity>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
         <Icon name="arrow-left" size={18} color={ theme.colors.primary} />
        <Text style={styles.label}>  Back to login</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    
    paddingHorizontal:30,
    justifyContent: 'center',
  },
  back: {
    flexDirection: 'row',

    marginTop: 42,
 
    justifyContent:'center',
    alignItems:'center'
  },
  text1:{
    fontSize:22,
    fontFamily:'Roboto',
    paddingTop:20,
    paddingBottom:20,
    alignSelf:'center'
  },
  text2:{
    color: theme.colors.secondary,
    fontSize:15,
    paddingBottom:20,
    textAlign:'center'
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.primary,
  

    fontSize:15
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop:20
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
phone:{
  alignItems:'center'
}
});

export default memo(MobileLoginScreen);
