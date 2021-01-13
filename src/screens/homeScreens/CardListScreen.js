import React,{useEffect} from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import Search from '../../components/Search';

import { fetchProducts,fetchShopProductsList,fetchShops } from '../../redux/ActionCreators';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    products: state.products,
    shopProductsList:state.shopProductsList,
    shops:state.shops
  }
}

const mapDispatchToProps = dispatch => ({
  fetchShops:()=>dispatch(fetchShops()),
  fetchProducts:()=>dispatch(fetchProducts()),
  fetchShopProductsList:()=>dispatch(fetchShopProductsList()),
  
})

const CardListScreen = (props) => {

  useEffect(()=>{
    props.fetchShops();
    props.fetchProducts();
    props.fetchShopProductsList();
    
       },[])
       
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.fetchShops();
      props.fetchProducts();
      props.fetchShopProductsList();
    });

    return unsubscribe;
  }, [props.navigation]);

    
         if(props.products.isLoading || props.shopProductsList.isLoading || props.shops.isLoading){
          return(
           <View style={[styles.container, styles.horizontal]}>
          
     
           <ActivityIndicator size="large" color="#600EE6" />
         </View>
          )
        }
     
        else if(props.products.errMess || props.shopProductsList.errMess || props.shops.errMess){
          return(
           <View style={[styles.horizontal]} > 
           <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
           <Text style={{fontSize:18,fontWeight:'bold'}} >{props.products.errMess?props.products.errMess:props.shopProductsList.errMess?props.shopProductsList.errMess:props.shops.errMess} !</Text>
       </View>
          )
        }
      
         else{
           const productsArray=props.shopProductsList.shopProductsList.find(shop=>shop.shop_id==props.route.params.shopId).products;
     
           const filterProductsArray=productsArray.filter((shopProduct)=>{
             const exist=props.products.products.some((product)=>{
               return product.id==shopProduct.prod_id && product.type==props.route.params.shopType;
             })
             return exist;
           })
         
           const finalProductsArray=filterProductsArray.map((shopProduct)=>{
             const Product=props.products.products.find((product)=>product.id==shopProduct.prod_id);
             return ({...Product,available:shopProduct.available,price:shopProduct.price,shop_name:
              props.shops.shops.find((shop)=>shop.id===props.route.params.shopId).title})
           })

           return (
            <View style={styles.container}>
            
            <Search cardType='card'  data={finalProductsArray} shopId={props.route.params.shopId} title={props.route.params.title} navigation={props.navigation}/>
              
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
