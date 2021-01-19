
import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator,StatusBar } from 'react-native';
import Search from '../../components/Search';

import { fetchShops } from '../../redux/ActionCreators';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    shops: state.shops,

  }
}

const mapDispatchToProps = dispatch => ({
  
  fetchShops:()=>dispatch(fetchShops()),

})

const VegetableShopsScreen = (props) => {

  const [isRefreshing,setRefreshing]=useState(false);
  const load= async ()=>{
    setRefreshing(true);
   await props.fetchShops();
    setRefreshing(false);
  }
  useEffect(()=>{

props.fetchShops();

  },[])

  if(props.shops.isLoading){
    return(
     <View style={[styles.container, styles.horizontal]}>
    

     <ActivityIndicator size="large" color="#600EE6" />
   </View>
    )
  }

  else if(props.shops.errMess){
    return(
     <View style={[styles.horizontal]} > 
     <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
     <Text style={{fontSize:18,fontWeight:'bold'}} >{props.shops.errMess} !</Text>
 </View>
    )
  }

  else{
    const data=props.shops.shops.filter(shop=>shop.shop_type.is_vegetables===true)
   return (
     <View style={styles.container}>
    
       <Search cardType='shop' shopType='Vegetables' isRefreshing={isRefreshing} load={load} title={props.route.params.title} data={data} navigation={props.navigation}/>
    
       
     </View>
   );
  }

  
};


export default connect(mapStateToProps,mapDispatchToProps)(VegetableShopsScreen);
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






