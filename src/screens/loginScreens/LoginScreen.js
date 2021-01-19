import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View,SafeAreaView,ScrollView} from 'react-native';

import Logo from '../../components/Logo';

import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    
  };

  return (
    <SafeAreaView style={styles.container} >
    <ScrollView keyboardShouldPersistTaps="handled" >
<View style={styles.screen}>
      <BackButton goBack={() => navigation.navigate('OpenScreen')} />
    <View style={styles.logo}><Logo /></View>
      

     <Text style={styles.text1}>Welcome !</Text>

      <TextInput
        label="Email / mobile number"
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

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TouchableOpacity activeOpacity={1}
                    style={styles.signIn}
                    onPress={_onLoginPressed}
                >
                <LinearGradient
                    colors={[theme.colors.primary,'#311B92']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
     
      <TouchableOpacity activeOpacity={1}
                    onPress={() => navigation.navigate('MobileLoginScreen')}
                    style={[styles.signIn, {
                        borderColor:theme.colors.primary,
                        borderWidth: 1,
                        marginTop: 20,
                        backgroundColor:'#fff'
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color:theme.colors.primary
                    }]}>Login with Mobile OTP</Text>
                </TouchableOpacity>
                <View style={styles.row}>
        <Text style={styles.label2}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
      </View></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  screen:{paddingHorizontal:30,
  },
  logo:{
    marginTop:50
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginTop:30,
    marginBottom: 2,
  },
  text1:{
    fontSize:27,
    fontFamily:'Roboto',
    paddingTop:30,
    paddingBottom:20
  },
  row: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent:'center'
  },
  label: {
    color: theme.colors.primary,
  },
  label2: {
    color: theme.colors.secondary,

  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
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
});

export default memo(LoginScreen);
