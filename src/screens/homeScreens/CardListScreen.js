import React,{memo} from 'react';
import { View, Text, Button, FlatList,  Dimensions, StyleSheet } from 'react-native';
import Search from '../../components/Search';
import {data} from '../../data/groceries';

const CardListScreen = ({navigation,route}) => {

   
  const title=route.params.title;
    return (
      <View style={styles.container}>
      
        <Search cardType='card' data={data} title={title} navigation={navigation}/>
     
        
      </View>
    );
};

export default  memo(CardListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#fff",
    flexDirection:'row'
  },
  list:{
    flex:0.5
  }
});
