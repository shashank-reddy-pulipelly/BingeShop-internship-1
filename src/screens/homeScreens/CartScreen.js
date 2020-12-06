import React,{memo} from 'react';
import { View, Text, Button, FlatList,  Dimensions, StyleSheet } from 'react-native';



const CartScreen = ({navigation}) => {

   

    return (
      <View style={styles.container}>
  
        
      </View>
    );
};

export default  memo(CartScreen);

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
