import React,{useState} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { Provider } from 'react-redux';
import { ConfigureStore } from './src/redux/configureStore';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
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

const {store } = ConfigureStore();
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
const Main = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  if(!fontLoaded){
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return(
    <Provider store={store}>
 
       <PaperProvider theme={theme}>
      <App />
    </PaperProvider>

  </Provider>
  
  )
}




export default Main;
