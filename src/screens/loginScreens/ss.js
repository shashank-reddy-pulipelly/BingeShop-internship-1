import React,{useRef,useState,memo} from 'react';
import { 
    View,Text, TouchableOpacity,StyleSheet ,ActivityIndicator,
    StatusBar,
} from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';
import CodeInput from 'react-native-confirmation-code-input';
import { theme } from '../../core/theme';


import * as firebase from 'firebase';

import { useTheme } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SignInScreen = ({route,navigation}) => {
  
  const [verificationId, setVerificationId] = React.useState(route.params.verificationId);
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  
  const [verificationCode, setVerificationCode] = React.useState();


const full=route.params.full;

const { colors } = useTheme();

const resend= async ()=>{
  setVerifyInProgress(true);
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  try {
                       
    setVerifyError(null);
   
    setVerificationId('');
    const verificationId = await phoneProvider.verifyPhoneNumber(full,route.params.recaptchaVerifier.current);
    setVerifyInProgress(false);
    setVerificationId(verificationId);

  } catch (err) {
    setVerifyError(err);
    setVerifyInProgress(false);
  }
}

const inputRef = useRef('codeInputRef2');

  return (
    <View style={styles.container}>
     
        <StatusBar backgroundColor='#0000e4' barStyle="light-content"/>
      <View style={styles.header}>
      <FontAwesome   onPress={() => {navigation.navigate('LoginScreen')}} name="angle-left" color='white' size={25} style={{marginRight:10,position:'absolute',top:20,left:30}} />
        
          <Text style={styles.text_header}> Verification Code </Text>
       
      </View>
      <View 
       
          style={[styles.footer, {
              backgroundColor: colors.background
          }]}
      >
      
          

      <View >
        <View  >
    
      
     
        <Text style={styles.text}>Please Enter the OTP sent to </Text>
        <Text style={styles.text}>{full} </Text>
        <View style={{ height: 60,
             marginLeft: 10,  alignSelf:'center',marginBottom:20,padding:5,marginTop:20 }}>
          <CodeInput
     ref={inputRef}
     activeColor={theme.colors.primary}
     inactiveColor={theme.colors.primary}
     keyboardType="phone-pad"
     codeLength={6}
     inputPosition='center'
     size={45}
     onFulfill={(code) => {setVerificationCode(code)}}
     autoFocus={true}
     containerStyle={{ marginTop: 0 }}
     codeInputStyle={{ borderWidth: 1.5,borderRadius:5,fontSize:17 }}
          />
        </View>
        <Text style={{textAlign:'center',marginVertical:10}}>Didn't receive an OTP ? </Text>
        <TouchableOpacity activeOpacity={.5} onPress={resend} ><Text style={{textAlign:'center',textDecorationLine: 'underline',marginBottom:20,fontSize:16,fontWeight:'bold'}}>Resend OTP</Text></TouchableOpacity>
        
   <View >
   <TouchableOpacity  activeOpacity={.9}
                    style={styles.signIn}
                    disabled={!verificationCode}
                    onPress={async () => {
                      try {
                        setConfirmError(undefined);
                        setConfirmInProgress(true);
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                          verificationId,
                          verificationCode
                        );
                        await firebase.auth().signInWithCredential(credential);
                      
                       
                        setVerificationCode('');
                 
                        console.log('user sign in');
                        setConfirmInProgress(false);
                      } catch (err) {
                        setConfirmError(err);
                        setConfirmInProgress(false);
                      }
                    }}
                >
                <LinearGradient
                    colors={['#448AFF','#0000d6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>{confirmInProgress?<ActivityIndicator  color="white"  /> : <Text>Verify</Text> }</Text>
                </LinearGradient>
                </TouchableOpacity>

        </View>
        {confirmError && <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>}
        {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>}
    
    {verificationId ? (
      <Text style={styles.success}>A verification code has been sent to your phone</Text>
    ) : (
      undefined
    )}

    
      
        </View>
     
      
      
        
    
        
      
      </View>
    
    
          


      </View>
    </View>
  );
};

export default memo(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#0000e4'
  },
  header: {
      flex: 1.5,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 0
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 25,
     
      paddingBottom:40,
      paddingTop:20
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },


  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  text: {
    marginTop: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize:16,
    alignSelf:'center',
    color:'black',
   
   
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: 'bold',
  },

  textInput: {
   
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor:'#F5F5F5',
    paddingLeft:10,
    flex:1,
    padding:10,
    letterSpacing: 2
  },
  error: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  success: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFFC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontWeight: 'bold',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
},
textSign: {
    fontSize: 17,
    fontWeight: 'bold'
},
button2:{
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 7,
  
}
});