import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator,StatusBar } from 'react-native';
import Search from '../../components/Search';
import * as firebase from 'firebase';
const VegetableShopsScreen = (props) => {
  const [shops,setShops]=useState({isLoading:true,errMess:null,shops:[]})
  const [isRefreshing,setRefreshing]=useState(false);

  const load= async ()=>{
    setRefreshing(true);
   const query =await firebase.database().ref('Shops').once('value',snapShot=>{
  var val=snapShot.val();
  const loadedShops=[];
  for(const key in val){
    loadedShops.push(val[key]);
  }

  setShops({isLoading:false,errMess:null,shops:loadedShops})
   })
    setRefreshing(false);
  }
     useEffect(()=>{
  
      firebase.database().ref('Shops').once('value',snapShot=>{
        var val=snapShot.val();
        const loadedShops=[];
        for(const key in val){
          loadedShops.push(val[key]);
        }
        setShops({isLoading:false,errMess:null,shops:loadedShops})
         })
  
     },[])
  if(shops.isLoading){
    return(
     <View style={[styles.container, styles.horizontal]}>
    

     <ActivityIndicator size="large" color="#600EE6" />
   </View>
    )
  }

  else if(shops.errMess){
    return(
     <View style={[styles.horizontal]} > 
     <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
     <Text style={{fontSize:18,fontWeight:'bold'}} >{shops.errMess} !</Text>
 </View>
    )
  }

  else{
    const data=shops.shops.filter(shop=>shop.shop_type.is_vegetables===true)
   return (
     <View style={styles.container}>
    
       <Search cardType='shop' shopType='Vegetables' isRefreshing={isRefreshing} load={load} title={props.route.params.title} data={data} navigation={props.navigation}/>
    
       
     </View>
   );
  }

  
};


export default VegetableShopsScreen;
const styles = StyleSheet.create({
 container: {
   flex: 1, 
   width: '100%',
   alignSelf: 'center',
   backgroundColor:"white",
   flexDirection:'row',
  
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






