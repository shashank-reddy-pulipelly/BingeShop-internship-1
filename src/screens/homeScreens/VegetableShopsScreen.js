

import React,{memo} from 'react';
import { View, Text, Button, FlatList,  Dimensions, StyleSheet } from 'react-native';
import Search from '../../components/Search';
import {vegetableShops} from '../../data/vegetableShops';

const VegetableShopsScreen = ({navigation,route}) => {

   
  const title=route.params.title;
    return (
      <View style={styles.container}>
      
        <Search cardType='shop' title={title}  data={vegetableShops} navigation={navigation}/>
     
        
      </View>
    );
};

export default  memo(VegetableShopsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"white",
    flexDirection:'row',
   
  }
 
});
