
import Swiper from 'react-native-swiper';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,
  ScrollView,SafeAreaView
} from 'react-native';
import { theme } from '../core/theme';
function HomeSwiper() {
    return (
        <Swiper
        autoplay
        horizontal={true}
        height={200}
        loop={true}
        activeDotColor="#FF6347">
             <View style={styles.slide}>
          <Image
            source={require('../assets/banners/slider10.jpg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/banners/slider11.jpg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/banners/slider12.jpg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/banners/slider8.jpg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/banners/slider15.jpg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../assets/banners/slider13.jpg')}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        </Swiper>   
    )
}

export default HomeSwiper;



const styles = StyleSheet.create({

  sliderContainer: {
    height: 200,
    width: '100%',
  
    justifyContent: 'center',
    alignSelf: 'center',
  },



  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    
  },

});