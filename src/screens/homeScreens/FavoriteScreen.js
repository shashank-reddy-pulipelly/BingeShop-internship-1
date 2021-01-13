import React,{Component} from 'react';
import { View, Text, FlatList, StyleSheet,Image,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Card from '../../components/Card';
import {  Button } from 'native-base';
import {theme} from '../../core/theme';
import { fetchProducts,fetchShopProductsList,fetchShops } from '../../redux/ActionCreators';

const mapStateToProps = state => {
    return {

      favorites: state.favorites,
      shops:state.shops,
      products: state.products,
      shopProductsList:state.shopProductsList,
    }
  }

  const mapDispatchToProps = dispatch => ({
  
    fetchShops:()=>dispatch(fetchShops()),
    fetchProducts:()=>dispatch(fetchProducts()),
    fetchShopProductsList:()=>dispatch(fetchShopProductsList()),
})

class FavoriteScreen extends Component{

  componentDidMount(){ 
    this.props.fetchShops();
    this.props.fetchProducts();
    this.props.fetchShopProductsList();
  
  }


  render(){
   
    if(this.props.products.isLoading || this.props.shopProductsList.isLoading || this.props.shops.isLoading){
      return(
       <View style={[styles.container, styles.horizontal]}>
      
 
       <ActivityIndicator size="large" color="#600EE6" />
     </View>
      )
    }
 
    else if(this.props.products.errMess || this.props.shopProductsList.errMess || this.props.shops.errMess){
      return(
       <View style={[styles.horizontal]} > 
       <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
       <Text style={{fontSize:18,fontWeight:'bold'}} >{this.props.products.errMess?this.props.products.errMess:this.props.shopProductsList.errMess?this.props.shopProductsList.errMess:this.props.shops.errMess} !</Text>
   </View>
      )
    }
    else{

    const renderItem = ({item}) => {
      const obj=this.props.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item.shop_id).products.find((product)=>product.prod_id==item.prod_id);
      const prodObj=this.props.products.products.find((product)=>product.id==obj.prod_id);
      const shop=this.props.shops.shops.find((shop)=>shop.id==item.shop_id);
       const finalItem={
          ...prodObj,available:obj.available,price:obj.price,shop_name:shop.title
        }
      return (
          <Card 
              itemData={finalItem} shopId={item.shop_id}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:finalItem,shopId:item.shop_id})}
          />
      );
  };

  if(this.props.favorites.length==0){
    return(
      <View style={styles.container2}>
      <View style={{alignItems:'center'}}>
      <Image
      style={styles.cartLogo}
      source={require('../../assets/favourite-location.png')}
    />
    <Text style={{fontSize:20,fontWeight:'bold',marginBottom:20}}>Your Wishlist is empty !</Text>
    

     
    <Button onPress={()=>this.props.navigation.navigate('HomeDrawer')} style={{backgroundColor:theme.colors.primary,alignSelf:'center',marginTop:10}}>
        <Text style={{fontSize:17,marginHorizontal:40,color:'white'}}>Shop Now</Text>
      </Button>
       </View>
    </View>
    )
  }
    return(
      <View style={styles.container}>
      <FlatList style={styles.list}
               data={this.props.favorites}
               renderItem={renderItem}
               keyExtractor={item => Math.random().toString()}
           />
           
         </View>
    )
  }
}
}

export default connect(mapStateToProps,mapDispatchToProps)(FavoriteScreen);

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
  },
  cartLogo:{
  
    resizeMode: 'stretch',
    width:300,
    height:300
  },
  container2:{

    alignItems:'center',
    flex:1,
    backgroundColor:'white',
    paddingTop:40
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
