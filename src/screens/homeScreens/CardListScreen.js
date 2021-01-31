import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import Search from '../../components/Search';

import * as firebase from 'firebase';

const CardListScreen = (props) => {
  const [shopProducts,setShopProducts]=useState({isLoading:true,errMess:null,shopProducts:[]})
  const [isRefreshing,setRefreshing]=useState(false);

  const load= async ()=>{
    setRefreshing(true);

    setRefreshing(false);
  }
       
  React.useEffect(() => {
   
 firebase.database().ref(`ShopProducts/${props.route.params.shopId}`).once('value',snap=>{
  var val=snap.val();
  const loadedProducts=[];
 
  for(const key in val){

    loadedProducts.push({...val[key],id:val[key].prod_id})

  }
  setShopProducts({isLoading:false,errMess:null,shopProducts:loadedProducts})
})


    
  },[]);

    
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
            
            <Search cardType='card' isRefreshing={isRefreshing} load={load}  data={shopProducts.shopProducts.filter(product=>product.type==props.route.params.shopType)} shopId={props.route.params.shopId} title={props.route.params.title} navigation={props.navigation}/>
              
            </View>
          );
         }
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#fff",
    flexDirection:'row'
  },
  horizontal: {
    flex:1,
    justifyContent: "center",
    alignItems:'center',
    padding: 10,
    paddingBottom:50,
    backgroundColor:'#fff'
  }
});
