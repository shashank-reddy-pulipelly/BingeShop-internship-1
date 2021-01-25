
import { ImageBackground, StyleSheet, Text, View,ScrollView,Image,TouchableWithoutFeedback } from "react-native";

import Card from './CardHorizontal'
import React, { Component,memo } from 'react';

const App = (props) => (
  <View style={styles.container}>
    <ImageBackground source={require('../assets/back1.jpg')} style={styles.image}>
      <ScrollView     horizontal 
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false} >
          <View style={{height:170,width:110,backgroundColor:'white',
          marginTop:120,justifyContent:'center',marginRight:10}}>
          <Text style={{fontFamily:'serif',fontSize:16,fontWeight:'bold'}}>  Deals of   </Text>
          <Text style={{fontFamily:'serif',fontSize:16,fontWeight:'bold'}} >  the Week</Text>
          </View>
          {props.data.map((item)=>{
            return(
<TouchableWithoutFeedback onPress={()=>props.navigation.navigate('CardItemDetails', {itemData: item,shopId:item.shop_id})} key={item.id}>

              <View>
              <View >
                   <Card itemData={item} ></Card>
              </View>
             
              </View>
              </TouchableWithoutFeedback>
            )
          })}
           <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('GroceryShopsScreen', {title: 'Grocery Stores'})} >
             <View style={styles.lastCard}>
             <Text style={{fontSize:19,fontWeight: 'bold',color:'#EEEEEE'}}>View More</Text>
             </View>
               
              </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
   
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height:420,
    marginBottom:30,
   
 
  },

  lastCard:{
    width:150,
    height:370,
    backgroundColor:'#000000a0',
 
    marginHorizontal:15,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginTop:25
  }
});

export default memo(App);