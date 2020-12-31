

import React,{memo} from 'react';
import { View, Text, Button, FlatList,  Dimensions, StyleSheet } from 'react-native';
import Search from '../../components/Search';
import {groceryShops} from '../../data/groceryShops';

const GroceryShopsScreen = ({navigation,route}) => {

   
const title=route.params.title;
    return (
      <View style={styles.container}>
      
        <Search cardType='shop'  title={title} data={groceryShops} navigation={navigation}/>
     
        
      </View>
    );
};

export default  memo(GroceryShopsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"white",
    flexDirection:'row',
   
  },
  list:{
    flex:0.5
  }
});
