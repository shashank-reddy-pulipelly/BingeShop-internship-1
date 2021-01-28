import React,{memo,useEffect,useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import Search from '../../../components/vendorComponents/Search';
import * as firebase from 'firebase';





const ProductsScreen= (props) => {

  const [shopProducts,setShopProducts]=useState({isLoading:true,errMess:null,shopProducts:[]})
  

  React.useEffect(() => {
   
     firebase.database().ref(`ShopProducts/Shop_1`).once('value',snap=>{
      var val=snap.val();
      const loadedProducts=[];
      for(const key in val){
    
        loadedProducts.push({...val[key],id:val[key].prod_id})
    
      }
      setShopProducts({isLoading:false,errMess:null,shopProducts:loadedProducts})
    })
    

        
      }, []);

  if(shopProducts.isLoading){
    return(
     <View style={[styles.container, styles.horizontal]}>
    

     <ActivityIndicator size="large" color="#600EE6" />
   </View>
    )
  }

  else if(shopProducts.errMess ){
    return(
     <View style={[styles.horizontal]} > 
     <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
     <Text style={{fontSize:18,fontWeight:'bold'}} >{shopProducts.errMess} !</Text>
 </View>
    )
  }
  else{

  
    return (
      <View style={styles.container}>
      
        <Search  data={shopProducts.shopProducts}  navigation={props.navigation}/>
     
        
      </View>
    );
  }
};


export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#fff",
    flexDirection:'row'
  }
  ,
  horizontal: {
    flex:1,
    justifyContent: "center",
    alignItems:'center',
    padding: 10,
    paddingBottom:50,
    backgroundColor:'#fff'
  }
});
