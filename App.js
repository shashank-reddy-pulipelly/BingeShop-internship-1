import React,{useState} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { Provider } from 'react-redux';
import { ConfigureStore } from './src/redux/configureStore';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


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
