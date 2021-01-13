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



import Search from './SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeSwiper from '../../components/HomeSwiper';
import Background from '../../components/BackgroundImage';

import { Button } from 'native-base';
const HomeScreen = ({navigation}) => {



  return (
  <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ScrollView>
    <View >
    
    <View >
    <Search navigation={navigation} />
    </View >
    
     

      
      <View style={styles.sliderContainer}>
    
     <HomeSwiper/>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,paddingHorizontal:15,
      backgroundColor:'#D50000',paddingVertical:10,marginTop:20,borderRadius:10}} >
                        <Image style={{width:30,height:30, resizeMode: 'stretch',marginRight:20}} source={require('../../assets/logo.png')}
          />
        <Text style={{fontSize: 18,marginRight:'auto',marginLeft:'auto',fontWeight:'bold',
      color: '#fff',}}>Shop By Category</Text>
        <Image style={{width:30,height:30,resizeMode: 'stretch',marginLeft:20}} source={require('../../assets/logo.png')}
             />
             </View>
      <View style={styles.categoryContainer}>
     
        <TouchableOpacity activeOpacity={0.7}
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('GroceryShopsScreen', {title: 'Grocery Stores'})
          }>
          
          <Image
                        source={require('../../assets/grocery4.jpg')}
                    size={65} style={{
                      backgroundColor:"#FFCCBC",
                      resizeMode:'stretch',width:'100%',height:170}}
                  />
      
          <Text style={styles.categoryBtnTxt}>Grocery shops</Text>
          <View  style={styles.filterButton1}>
            <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>Buy Now</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.categoryBtn2} onPress={() =>
            navigation.navigate('VegetableShopsScreen', {title: 'Vegetable Stores'})
          } >
     
          <Image
                        source={require('../../assets/grocery/background2.jpg')}
                    size={65} style={{backgroundColor:"#BBDEFB",width:'100%',height:170,resizeMode:'cover',}}
                  />
       
          <Text style={styles.categoryBtnTxt2}>Vegetable shops</Text>
          <View  style={styles.filterButton1}>
            <Text style={{fontSize:13,color:'black',fontWeight:'bold'}}>Buy Now</Text>
          </View>
        </TouchableOpacity>
      </View>


    
     

      <View>
      
          <Background navigation={navigation} />
      </View>
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
      <View>
      
      <Background navigation={navigation} />
  </View>
      <TouchableWithoutFeedback style={styles.cardsWrapper}  onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Groceries'})
          }>
        <Image resizeMode="stretch"  style={{width:"100%",height:600,marginBottom:20}} source={require('../../assets/banners/banner6.jpg')} ></Image>
      </TouchableWithoutFeedback>
   
    </View>
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
    marginTop: 15,
    marginBottom: 10,
    backgroundColor:'#fff'
  },
  categoryBtn: {
    flex: 1,
   
    alignSelf: 'center',
    backgroundColor:'#FFAB00',
    marginRight:10,
    borderRadius:10,
    overflow:'hidden'
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    backgroundColor:'red',
   
    
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
    height:27,
    color:'white',
    fontSize:17,
    fontWeight:'bold'
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  categoryBtn2: {
    flex: 1,
   
    alignSelf: 'center',
    backgroundColor:'#2E7D32',
    marginLeft:10,
    borderRadius:10,
    overflow:'hidden',
    elevation:5
  },
  categoryIcon2: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
   
    backgroundColor:'red',
   
    borderRadius: 0,
    
  },
  categoryBtnTxt2: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'black',
    height:27,
    color:'white',
    fontSize:17,
    fontWeight:'bold'
  },
  filterButton1:{
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:10,
    paddingHorizontal:10,
    borderColor:'#BDBDBD',
    borderWidth:1,
    height:30,
    alignSelf: 'center',
    justifyContent:'center'
  },
});