import React,{useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,ActivityIndicator,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';



import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

import { useTheme } from 'react-native-paper';

const SignInScreen = ({navigation}) => {

  const recaptchaVerifier = React.useRef(null);

  const[fullPhoneNumber,] = React.useState('+91');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState('');
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  

  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

const full=fullPhoneNumber+phoneNumber;
const attemptInvisibleVerification = true;
const { colors } = useTheme();

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor='#0000e4' barStyle="light-content"/>
      <View style={styles.header}>
          <Text style={styles.text_header}>Welcome to BingeShop</Text>
       
      </View>
      <View 
          
          style={[styles.footer, {
              backgroundColor: colors.background
          }]}
      >
      
          

      <View style={{flex:1}}>
        <View  >
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        
     
        <Text style={styles.text}>User Login</Text>
        <View style={{flexDirection:'row',marginBottom:20,backgroundColor:'#F5F5F5',padding:1,borderRadius:5,borderWidth:.5}} >
          <View  >
            <Text style={{fontSize:17,fontWeight:'bold',borderRightWidth:1,alignSelf:'center',paddingRight:2,padding:10}} > +91 </Text>
          </View>
          <TextInput
          style={styles.textInput}
          autoFocus={true}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="  Mobile Number "
          
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        </View>
   <View >
   <TouchableOpacity disabled={!phoneNumber} activeOpacity={.9}
                    style={styles.signIn}
                    onPress={async () => {
                      if(phoneNumber.length!=10){
                        setVerifyError({message:'mobile number must be 10 digit '})
                        return;
                      }
                      setVerifyInProgress(true);
                      const phoneProvider = new firebase.auth.PhoneAuthProvider();
                      try {
                       
                        console.log(full);
                        setVerifyError(null);
                       
                        setVerificationId('');
                        const verificationId = await phoneProvider.verifyPhoneNumber(full,recaptchaVerifier.current);
                        setVerifyInProgress(false);
                        console.log(recaptchaVerifier);
                        setVerificationId(verificationId);
                    if( verificationId  ){
                
                      navigation.navigate('OtpScreen',{verificationId,full})
                    }
                      } catch (err) {
                        setVerifyError(err);
                        setVerifyInProgress(false);
                      }
                    }}
                >
                <LinearGradient
                    colors={['#448AFF','#0000d6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>{verifyInProgress?<ActivityIndicator  color="white"  />:<Text> Send Verification Code</Text>}</Text>
                </LinearGradient>
                </TouchableOpacity>

        </View>
        {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>}
    
        {verificationId ? (
          <Text style={styles.success}>A verification code has been sent to your phone</Text>
        ) : (
          undefined
        )}
        </View>
        <View style={{marginBottom:20,marginTop:70}} >
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner   textStyle={{ fontSize: 13, opacity: .6,textAlign:'center' }}
  linkStyle={{ fontWeight: 'bold' }} />}
        </View>
      
      
        
    
        
      
      </View>
    
    
          


      </View>
    </View>
  );
};

export default SignInScreen;

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
    marginBottom: 50,
    fontWeight: 'bold',
    fontSize:20,
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
    marginTop: 10,
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
});