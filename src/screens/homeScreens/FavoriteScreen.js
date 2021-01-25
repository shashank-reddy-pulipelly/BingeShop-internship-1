import React,{PureComponent} from 'react';
import { View, Text, FlatList, StyleSheet,Image,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Card from '../../components/Card';
import {  Button } from 'native-base';
import {theme} from '../../core/theme';
import { fetchProducts,fetchShopProductsList,fetchShops } from '../../redux/ActionCreators';
import { fetchFavorites} from '../../redux/actions/favoritesActions';
const mapStateToProps = state => {
    return {

      favorites: state.favorites,
     
    }
  }

  const mapDispatchToProps = dispatch => ({
  


    fetchFavorites:()=>dispatch(fetchFavorites())
})

class FavoriteScreen extends PureComponent{
constructor(props) {
  super(props)

  this.state = {
 

    shopProductsList:{isLoading:true,errMess:null,shopProductsList:[]},
    products: {isLoading:true,errMess:null,products:[]},
  }
}

  componentDidMount(){ 

    firebase.database().ref('shopProductsList').on('value', (snapshot) => {
     const shopProductsList = snapshot.val();
     const loadedShopProductsList=[];
     for(const key in shopProductsList){
         const products=shopProductsList[key].products;
         const loadedProducts=[];
         for(const product in products){
            loadedProducts.push(products[product]);
         }
         const obj={
             id:key,
             products:loadedProducts,
             shop_id:shopProductsList[key].shop_id, 
             shop_name:shopProductsList[key].shop_name                              
         }

         loadedShopProductsList.push(obj);
     }
     this.setState({shopProductsList:{isLoading:false,errMess:null,shopProductsList:loadedShopProductsList}})
   })

 firebase.database()
   .ref('Products')
   .on('value', (snapshot) => {
    const products = snapshot.val();
    const loadedProducts=[];
    for(const key in products){
       loadedProducts.push(products[key]);
    }
    this.setState({products:{isLoading:false,errMess:null,products:loadedProducts}})
  })
   
  }




  render(){
   
    if(this.state.products.isLoading || this.state.shopProductsList.isLoading  ){
      return(
       <View style={[styles.container, styles.horizontal]}>
      
 
       <ActivityIndicator size="large" color="#600EE6" />
     </View>
      )
    }
 
    else if(this.state.products.errMess || this.state.shopProductsList.errMess ){
      return(
       <View style={[styles.horizontal]} > 
       <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
       <Text style={{fontSize:18,fontWeight:'bold'}} >{this.state.errMess?this.state.errMess:this.state.shopProductsList.errMess} !</Text>
   </View>
      )
    }
    else{

    const renderItem = ({item}) => {
      const obj=this.state.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item.shop_id).products.find((product)=>product.prod_id==item.prod_id);
      const prodObj=this.state.products.products.find((product)=>product.id==obj.prod_id);
     console.log(this.state.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item.shop_id))
       const finalItem={
          ...prodObj,available:obj.available,price:obj.price,shop_name:this.state.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item.shop_id).shop_name
        }
      return (
          <Card 
              itemData={finalItem} shopId={item.shop_id}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:finalItem,shopId:item.shop_id})}
          />
      );
  };

  if(this.props.favorites.favorites.length==0){
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
      <FlatList  style={styles.list}
               data={this.props.favorites.favorites}
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
