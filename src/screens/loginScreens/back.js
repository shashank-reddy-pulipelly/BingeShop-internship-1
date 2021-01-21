import React,{useContext}  from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import { AuthContext } from '../../components/context';
import { theme } from '../../core/theme';
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAcasnVPElbZmhBMej-ElxFllPh6PGkGYQ",
    authDomain: "projectalpha-c313c.firebaseapp.com",
    databaseURL: "https://projectalpha-c313c-default-rtdb.firebaseio.com",
    projectId: "projectalpha-c313c",
    storageBucket: "projectalpha-c313c.appspot.com",
    messagingSenderId: "703407400320",
    appId: "1:703407400320:web:5d3e0e774bf0008c80cd65",
    measurementId: "G-MV2EEDHZLQ"
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}


export default function PhoneAuthScreen({navigation}) {
  const { signIn } = React.useContext(AuthContext);
  const recaptchaVerifier = React.useRef(null);
  const verificationCodeTextInput = React.useRef(null);
  const[fullPhoneNumber, setFullPhoneNumber] = React.useState('+91');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState('');
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);


  
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;
const full=fullPhoneNumber+phoneNumber;
const attemptInvisibleVerification = true;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        <Text style={styles.title}>Sign in to BingeShop</Text>
     
        <Text style={styles.text}>Enter Mobile Number</Text>
        <View style={{flexDirection:'row',marginBottom:10,backgroundColor:'#EEEEEE',padding:10,borderRadius:5}} >
          <View  >
            <Text style={{fontSize:17,fontWeight:'bold',borderRightWidth:1,alignSelf:'center',paddingRight:2}} > +91 </Text>
          </View>
          <TextInput
          style={styles.textInput}
          autoFocus={isConfigValid}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="  Mobile Number "
          editable={!verificationId}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        </View>
   <View style={{backgroundColor:'red'}} >
        <Button color={theme.colors.primary}
          title={`${verificationId ? 'Resend' : 'Send'} Verification Code`}
          disabled={!phoneNumber}
          onPress={async () => {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
              console.log(full);
              setVerifyError(undefined);
              setVerifyInProgress(true);
              setVerificationId('');
              const verificationId = await phoneProvider.verifyPhoneNumber(full,recaptchaVerifier.current);
              setVerifyInProgress(false);
              setVerificationId(verificationId);
              verificationCodeTextInput.current?.focus();
            } catch (err) {
              setVerifyError(err);
              setVerifyInProgress(false);
            }
          }}
        />
        </View>
        {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>}
        {verifyInProgress && <ActivityIndicator style={styles.loader} />}
        {verificationId ? (
          <Text style={styles.success}>A verification code has been sent to your phone</Text>
        ) : (
          undefined
        )}
        <Text style={styles.text}>Enter verification code</Text>
        <TextInput
          ref={verificationCodeTextInput}
          style={styles.textInput}
          textContentType="oneTimeCode"
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={(verificationCode) => setVerificationCode(verificationCode)}
        />
        <Button
          title="Confirm Verification Code"
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
              setConfirmInProgress(false);
              setVerificationId('');
              setVerificationCode('');
              verificationCodeTextInput.current?.clear();
              signIn(phoneNumber);
            } catch (err) {
              setConfirmError(err);
              setConfirmInProgress(false);
            }
          }}
        />
        {confirmError && <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner   textStyle={{ fontSize: 14, opacity: 1 }}
  linkStyle={{ fontWeight: 'bold' }} />}
      </View>
      {!isConfigValid && (
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.overlayText}>
            To get started, set a valid FIREBASE_CONFIG in App.tsx.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff'
  },
  content: {
    marginTop: 50,
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize:15
  },
  textInput: {
   
    fontSize: 17,
    fontWeight: 'bold',
    backgroundColor:'#EEEEEE',
    paddingLeft:10
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
});