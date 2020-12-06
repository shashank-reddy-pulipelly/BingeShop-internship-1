import React,{memo,useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,
  ScrollView,SafeAreaView
} from 'react-native';
import {useTheme, Avatar} from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Search from './SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from '../../components/StarRating';

const HomeScreen = ({navigation}) => {
  const [search,setSearch]=useState('');
  const theme = useTheme();

  return (
  <View style={styles.container}>
    <ScrollView >
      <StatusBar translucent={true} backgroundColor={'transparent'} />
    
      <Search />
      <View style={styles.sliderContainer}>
    
        <Swiper
          autoplay
          horizontal={true}
          height={200}
          loop={true}
          activeDotColor="#FF6347">
               <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/slider6.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/slider1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/slider2.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/slider3.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/slider4.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/slider5.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('SearchScreen', {title: 'Shops'})
          }>
          <View style={styles.categoryIcon}>
          <Avatar.Image
                        source={require('../../assets/stores.png')}
                    size={65} style={{backgroundColor:"#fff"}}
                  />
          </View>
          <Text style={styles.categoryBtnTxt}>Shops</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Groceries'})
          }>
          <View style={styles.categoryIcon}>
          <Avatar.Image
                        source={require('../../assets/grocery.png')}
                    size={65} style={{backgroundColor:"#ffc77d"}}
                  />
          </View>
          <Text style={styles.categoryBtnTxt}>Groceries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Vegetables'})
          } >
          <View style={styles.categoryIcon}>
          <Avatar.Image
                        source={require('../../assets/vegetable.png')}
                    size={65} style={{backgroundColor:"#BBDEFB"}}
                  />
          </View>
          <Text style={styles.categoryBtnTxt}>Vegetables</Text>
        </TouchableOpacity>
      </View>


    
      <TouchableWithoutFeedback style={styles.cardsWrapper}  onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Groceries'})
          }>
        <Image resizeMode="stretch"  style={{width:"100%",height:600,marginBottom:20,marginTop:20}} source={require('../../assets/banners/banner9.jpg')} ></Image>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={styles.cardsWrapper}  onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Groceries'})
          }>
        <Image resizeMode="stretch"  style={{width:"100%",height:600,marginBottom:20}} source={require('../../assets/banners/banner8.jpg')} ></Image>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={styles.cardsWrapper}  onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Groceries'})
          }>
        <Image resizeMode="stretch"  style={{width:"100%",height:600,marginBottom:20}} source={require('../../assets/banners/banner7.jpg')} ></Image>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={styles.cardsWrapper}  onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Groceries'})
          }>
        <Image resizeMode="stretch"  style={{width:"100%",height:600,marginBottom:20}} source={require('../../assets/banners/banner6.jpg')} ></Image>
      </TouchableWithoutFeedback>
  
    </ScrollView>
    </View>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  sliderContainer: {
    height: 200,
    width: '100%',
  
    justifyContent: 'center',
    alignSelf: 'center',
  },

  wrapper: {},

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
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
    backgroundColor:'#fff'
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 60,
    height: 60,
   
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },

});