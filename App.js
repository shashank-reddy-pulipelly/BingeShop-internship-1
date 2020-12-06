import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { Provider } from 'react-redux';
import { ConfigureStore } from './src/redux/configureStore';

import { PersistGate } from 'redux-persist/es/integration/react'

const { persistor, store } = ConfigureStore();

const Main = () => (
  <Provider store={store}>
  <PersistGate  persistor={persistor}>
     <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
  </PersistGate>
</Provider>

);

export default Main;
