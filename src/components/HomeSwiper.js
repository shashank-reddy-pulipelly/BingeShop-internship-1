
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
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/projectalpha-c313c.appspot.com/o/HomeScreen_TopBanners%2Fslider11.jpg?alt=media&token=62679503-c7a3-464d-82ce-2eed17cc0bc4"}}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/projectalpha-c313c.appspot.com/o/HomeScreen_TopBanners%2Fslider13.jpg?alt=media&token=778048e9-5179-4c37-935c-88c1c3856c52"}}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/projectalpha-c313c.appspot.com/o/HomeScreen_TopBanners%2Fslider12.jpg?alt=media&token=593bc837-321d-4439-8cc8-3345ac7a707c"}}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/projectalpha-c313c.appspot.com/o/HomeScreen_TopBanners%2Fslider10.jpg?alt=media&token=dd9d994d-0d6b-4a0e-9f6b-e01343bd4ea6"}}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/projectalpha-c313c.appspot.com/o/HomeScreen_TopBanners%2Fslider15.jpg?alt=media&token=2a11143c-0534-4f33-a426-d12b864ccd53"}}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{uri:"https://firebasestorage.googleapis.com/v0/b/projectalpha-c313c.appspot.com/o/HomeScreen_TopBanners%2Fslider8.jpg?alt=media&token=4e856cfe-dba4-4fea-9881-143eab0f08f7"}}
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