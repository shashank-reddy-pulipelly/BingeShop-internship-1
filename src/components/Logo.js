import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/trial.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 58,
    marginBottom: 12,
    alignSelf: 'center',
  },
});

export default memo(Logo);
