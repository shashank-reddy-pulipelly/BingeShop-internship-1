import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View,SafeAreaView,ScrollView} from 'react-native';
import Logo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  emailValidator,
  passwordValidator,
  nameValidator,numberValidator 
} from '../../core/utils';
const  RegisterScreen = ({ navigation }) => {

  const [number, setNumber] = useState({ value: '', error: '' });
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
  
     const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const numberError = numberValidator(number.value);

  
    if (emailError || passwordError || nameError || numberError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setNumber({ ...number, error: numberError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container} >
    <ScrollView keyboardShouldPersistTaps="handled" >
<View style={styles.screen}>
      <BackButton goBack={() => navigation.navigate('OpenScreen')} />
    <View style={styles.logo}><Logo /></View>
      

     <Text style={styles.text1}>Create Account</Text>

     <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        dense='true'
      />

      <TextInput
        label="Email Id"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        dense='true'
      />
    <TextInput
        label="Mobile Number"
        returnKeyType="done"
        value={number.value}
        onChangeText={text => setNumber({ value: text, error: '' })}
        error={!!number.error}
        errorText={number.error}
      
        keyboardType="numeric"
        dense='true'
      />
     
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        dense='true'
      />


    
      <TouchableOpacity activeOpacity={.8}
                    style={styles.signIn}
                    onPress={_onSignUpPressed}
                >
                <LinearGradient
                    colors={[theme.colors.primary,'#311B92']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Register</Text>
                </LinearGradient>
                </TouchableOpacity>
    
     
   
            <View style={styles.row}>
        <Text style={styles.label2}>Already have an account? </Text>
        <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
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
    paddingTop:10,
    paddingBottom:10,
    textAlign:'center'
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

export default memo(RegisterScreen);
