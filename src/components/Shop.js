import React, { Component } from 'react'

import {
 
    View, Dimensions, Image,
    TouchableOpacity,Text,StyleSheet,TouchableNativeFeedback,Platform,
  } from 'react-native';
  const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.92;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
class Shop extends Component {
    
    render() {
        const shop=this.props.itemData;
        let TouchableCmp=TouchableOpacity;
        if(Platform.OS==='android' && Platform.Version>=21){
          TouchableCmp=TouchableNativeFeedback;
        }
        return (
         <View style={styles.card}>
               <TouchableCmp  activeOpacity={0.8} onPress={()=>this.props.onPress(shop.id)}>
                <View  style={{flexDirection:'column',flex:1}}>
                    <View style={{position:'absolute',backgroundColor:'#F44336',top:20,zIndex:5,borderBottomRightRadius:5,borderTopRightRadius:20,paddingVertical:2}}>
                    <Text style={{color:'white',fontFamily:'serif',fontWeight:'bold'}}>  OFF upto 50%   </Text>
                    </View >
                   
                  <Image 
                    source={{uri: shop.image}}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{shop.title}</Text>
                      <View style={{backgroundColor:'red',padding:2}}>
                          <FontAwesome name="star" color='white' size={16}/>
                      </View>
                      <View>
                          <Text>  {(shop.rating).toFixed(1)}/5</Text>
                      </View>
                      </View>
                    
                    
                    <Text numberOfLines={1} style={styles.cardDescription}>{shop.address}</Text>
                   
                      
                    
                   
                    <Swiper autoplay showsPagination={false} autoplayTimeout={3}
                    horizontal={true}  loop={true} style={{marginTop:5}}>
                    <View style={{flexDirection:'row',alignItems:'center',}} >
                        <Image style={{width:20,height:20, resizeMode: 'stretch',marginRight:20}} source={require('../assets/safe.jpg')}
          />
        <Text style={{fontSize: 14,marginRight:'auto',marginLeft:'auto',
      color: "grey",}}>We Follows all Max safety measures </Text>
        <Image style={{width:20,height:20,resizeMode: 'stretch',marginLeft:20}} source={require('../assets/safe2.png')}
             />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',}} >
        <Image style={{width:20,height:20,resizeMode: 'stretch',marginRight:20}} source={require('../assets/safe2.png')}
             />
                       
        <Text style={{fontSize: 14,marginRight:'auto',marginLeft:'auto',
       color: "grey",}}>Our Store Follow WHO procotol</Text>
        <Image style={{width:20,height:20, resizeMode: 'stretch',marginLeft:20}} source={require('../assets/safe.jpg')}
          />
        </View>
                        </Swiper>
                  </View>
                </View>
                </TouchableCmp>
         
                </View>
        )
    }
}

export default Shop;

const styles = StyleSheet.create({

    card: {
      
      elevation: 10,
      backgroundColor: "#FFF",
      borderRadius: 20,
      
      marginHorizontal: 5,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 0, y: 2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
      alignSelf: 'center',
      marginTop:15,
      marginBottom:10,
      position:'relative',
      flex:1
    },
    cardImage: {
      flex: 3,
      width: "100%",
      height: "100%",
      alignSelf: "center",
      
    },
    textContent: {
      flex: 2,
      padding: 10,
    },
    cardtitle: {
      fontSize: 18,
  
      fontWeight: "bold",
      marginRight:'auto'
    },
    cardDescription: {
      fontSize: 14,
      color:'grey',
      borderBottomWidth:.5,
      borderBottomColor:'grey',
      marginBottom:5,
      paddingBottom:8
    },
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width:50,
      height:50,
    },
 
  
  });