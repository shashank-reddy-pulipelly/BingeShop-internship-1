import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity,View } from 'react-native';
import { emailValidator } from '../core/utils';
import BackButton from '../components/BackButton';

import TextInput from '../components/TextInput';
import { theme } from '../core/theme';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    navigation.navigate('LoginScreen');
  };

  return (
 <View style={styles.container}>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <View style={styles.phone}>
<Icon name="unlock-alt" size={100} color={ theme.colors.primary} />
</View>

    
      <Text style={styles.text1}>Forgot your password ?</Text>
      <Text style={styles.text2} >Enter your email and we will send the password reset link</Text>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
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
                    }]}>Reset Password</Text>
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
    fontSize:27,
    fontFamily:'Roboto',
    paddingTop:40,
    paddingBottom:20,
  },
  text2:{
    color: theme.colors.secondary,
    paddingBottom:40,
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

export default memo(ForgotPasswordScreen);
