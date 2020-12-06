import React from 'react';
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'react-native-elements';
const Card = ({itemData, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={itemData.image}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>

          <Text style={styles.cardTitle}>{itemData.title}</Text>
          
       

            <View style={styles.row}>
                <Text style={{fontSize:24,padding:0,paddingVertical:0,margin:0}}>{'\u20B9'}</Text>
                <Text style={{ marginTop:6,marginLeft:2,fontSize:18}}>{itemData.amount}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 13, color: '#444' ,marginTop:9,marginLeft:10}}>{itemData.amount+100} </Text>
                <Text style={{fontSize: 13, color: '#09af00' ,marginTop:9,marginLeft:10}}>33% off</Text>
            </View>
          
            <View style={styles.ratings}>
              <View style={styles.star}>
<Text style={{color:'white',paddingLeft:10}}>{itemData.rating}</Text>
<View style={{paddingRight:10,paddingLeft:5}}>
<Icon name="star"  size={12} color="#fff" />
</View>

              </View>
              <View style={styles.reviews}>
                <Text style={{ fontSize: 12,
    color: '#444',}}>({itemData.reviews}) </Text>
              </View>
             
            </View>
            <Button buttonStyle={{marginVertical:10,marginLeft:'auto',paddingVertical:10,paddingHorizontal:15,backgroundColor:"#600EE6"}}  
  titleStyle={{fontSize:15}}
                title="Add to Cart"/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
 
   padding:10,
   paddingBottom:0,
    flexDirection: 'row',
 borderBottomColor:"#E0E0E0",
borderBottomWidth:1,
backgroundColor:"#fff"

   
  },
  cardImgWrapper: {
    flex: 1,
    alignSelf: 'center',
  },
  cardImg: {
    height: 160,
    width: '100%',

   
  
  
  },
  cardInfo: {
    flex: 2,
    padding: 15,
    paddingBottom:1,


    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize:16
  },

  ratings:{
    flexDirection: 'row',
    marginTop:0
  },
  star:{
    flex:1,
    backgroundColor:"#09af00",
    marginRight:10,
   height:23,
  
    justifyContent:'center',
    alignItems:"center",
    flexDirection: 'row',
    borderRadius:3,
    paddingHorizontal:2
  
  },
  reviews: {
    flex:4,
   
  },
  row:{
    flexDirection: 'row',
   
  }
});