import React, { Component } from 'react'
import {groceryShops} from '../data/groceryShops';
import {
    FlatList,
    View, Dimensions, Image,
    TouchableOpacity,Text,TextInput,StyleSheet,TouchableWithoutFeedback
  } from 'react-native';
  const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.92;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
class Shop extends Component {
    
    render() {
        const marker=this.props.itemData;
        return (
         
               <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={styles.card} >
                    <View style={{position:'absolute',backgroundColor:'#F44336',top:20,zIndex:5,borderBottomRightRadius:5,borderTopRightRadius:20,paddingVertical:2}}>
                    <Text style={{color:'white',fontFamily:'serif',fontWeight:'bold'}}>  OFF upto 50%   </Text>
                    </View>
                   
                  <Image 
                    source={marker.image}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                      <View style={{backgroundColor:'red',padding:2}}>
                          <FontAwesome name="star" color='white' size={16}/>
                      </View>
                      <View>
                          <Text>  {marker.rating}/5</Text>
                      </View>
                      </View>
                    
                    
                    <Text numberOfLines={1} style={styles.cardDescription}>{marker.address}</Text>
                   
                      
                    
                   
                    <Swiper autoplay showsPagination={false} autoplayTimeout={3}
                    horizontal={true}  loop={true} style={{marginTop:5}}>
                    <View style={{flexDirection:'row',alignItems:'center',}} >
                        <Image style={{width:20,height:20, resizeMode: 'stretch',marginRight:20}} source={require('../assets/safe.jpg')}
          />
        <Text style={{fontSize: 13,marginRight:'auto',marginLeft:'auto',
      color: "grey",}}>We Follows all Max safety measures </Text>
        <Image style={{width:20,height:20,resizeMode: 'stretch',marginLeft:20}} source={require('../assets/safe2.png')}
             />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',}} >
        <Image style={{width:20,height:20,resizeMode: 'stretch',marginRight:20}} source={require('../assets/safe2.png')}
             />
                       
        <Text style={{fontSize: 13,marginRight:'auto',marginLeft:'auto',
      color: "#444",}}>Our Store Follow WHO procotol</Text>
        <Image style={{width:20,height:20, resizeMode: 'stretch',marginLeft:20}} source={require('../assets/safe.jpg')}
          />
        </View>
                        </Swiper>
                  </View>
                </View>
                </TouchableWithoutFeedback>
         
          
        )
    }
}

export default Shop;

const styles = StyleSheet.create({

    card: {
      
      elevation: 10,
      backgroundColor: "#FFF",
      borderRadius: 10,
      
      marginHorizontal: 5,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
      alignSelf: 'center',
      marginTop:15,
      marginBottom:10,
      position:'relative'
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
      fontSize: 13,
      color: "#444",
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