import React,{memo,useEffect} from 'react';
import { View, Text, Button, FlatList,  Dimensions, StyleSheet,ActivityIndicator } from 'react-native';
import Search from '../../../components/vendorComponents/Search';

import { fetchProducts,fetchVendorShopProductsList } from '../../../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    products: state.products,
    vendorProducts:state.vendorProducts
  }
}

const mapDispatchToProps = dispatch => ({
 
  fetchProducts:()=>dispatch(fetchProducts()),
  fetchVendorShopProductsList:(listName)=>dispatch(fetchVendorShopProductsList(listName)),
  
})


const CardListScreen = (props) => {


  

       
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const listName='ShopListing_1';
      props.fetchProducts();
      props.fetchVendorShopProductsList(listName);
    });

    return unsubscribe;
  }, [props.navigation]);
  if(props.products.isLoading || props.vendorProducts.isLoading){
    return(
     <View style={[styles.container, styles.horizontal]}>
    

     <ActivityIndicator size="large" color="#600EE6" />
   </View>
    )
  }

  else if(props.products.errMess || props.vendorProducts.errMess ){
    return(
     <View style={[styles.horizontal]} > 
     <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
     <Text style={{fontSize:18,fontWeight:'bold'}} >{props.products.errMess?props.products.errMess:props.vendorProducts.errMess} !</Text>
 </View>
    )
  }
  else{

    const finalProductsArray=props.vendorProducts.vendorProducts.map((shopProduct)=>{
      const Product=props.products.products.find((product)=>product.id==shopProduct.prod_id);
      return ({...Product,available:shopProduct.available,price:shopProduct.price})
    })
    return (
      <View style={styles.container}>
      
        <Search  data={finalProductsArray}  navigation={props.navigation}/>
     
        
      </View>
    );
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(CardListScreen);
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
