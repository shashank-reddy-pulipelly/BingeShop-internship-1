import React, { memo, useState, useRef } from 'react';
import { Text,TextInput, StyleSheet, TouchableOpacity,View } from 'react-native';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountDown from 'react-native-countdown-component';
import CodeInput from 'react-native-confirmation-code-input';
import { Button } from "react-native-elements";
const  OtpScreen = ({ navigation }) => {


    const number= navigation.getParam('number', '')



  const inputRef = useRef('codeInputRef2');
  const [counter, SetCounter] = useState(30); 
  // Set here  timer configurable
  const [random, SetRandom] = useState(Math.random());
  const [disabled, setDisabled] = useState(true)
  const handleResend = () => {
    SetRandom(Math.random())
    // Handle Resend otp action here
  }
  const handleVerify = (otp) => {
  // Handle the verification logic here
  // dispatch verify action
  };

  const _onSendPressed = () => {
   

    navigation.navigate('Dashboard');
  };

  return (
 <View style={styles.container}>
      <BackButton goBack={() => navigation.goBack()} />
      <View >
   
      <Text style={styles.text1}>Enter OTP</Text>
      <Text style={styles.text2} >Enter OTP code sent to your number </Text>
  <Text style={{ textAlign:'center', color: theme.colors.secondary,}} >+91 {number}</Text>
      <View >
        <View style={{ height: 60,
             marginLeft: 10,  alignSelf:'center',marginBottom:50 }}>
          <CodeInput
            ref={inputRef}
           
            className={'border-b'}
            activeColor='black'
            inactiveColor='green'
            space={10}
            keyboardType="numeric"
            autoFocus={true}
            codeLength={6}
            size={40}
            inputPosition='left'
            onFulfill={(code) => handleVerify(code)}
          />
        </View>
   
      </View>
    </View>
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
                    }]}>Login</Text>
                </LinearGradient>
                </TouchableOpacity>
                <View style={{ display: 'flex',
                 flexDirection: 'row',
                 marginTop:30, justifyContent: 'center' }}>
          <CountDown
            key={random}
            until={counter}
            size={15}
            onFinish={() => setDisabled(() => false)}
            separatorStyle={{ color: 'black' }}
            digitStyle={{ backgroundColor: '#FFF' }}
            digitTxtStyle={{ color: 'black' }}
            timeToShow={['M', 'S']}
            showSeparator
            timeLabels={{ m: '', s: '' }}
          />
          <View >
          <Button buttonStyle={{ marginLeft: 10,borderRadius:8,
        backgroundColor:'#311B92',paddingHorizontal:20 }} disabled={disabled}  title="Resend" onPress={handleResend}></Button>
          </View>
          </View>
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
   
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},


});

export default memo(OtpScreen);
