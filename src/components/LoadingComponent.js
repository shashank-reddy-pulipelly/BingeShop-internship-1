import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
  } from 'react-native'
  import { theme } from '../core/theme';
const styles = StyleSheet.create({
    loadingView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    loadingText: {
      color: '#512DA8',
      fontSize: 14,
      fontWeight: 'bold'
    }
});

export const Loading = () => {
    return(
        <View style={styles.loadingView} >
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText} >Loading . . .</Text>
        </View>
    );
};