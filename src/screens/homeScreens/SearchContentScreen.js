import React,{Component} from 'react';
import { View, Text, FlatList, StyleSheet,Image,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Card from '../../components/Card';
import {  Button } from 'native-base';
import {theme} from '../../core/theme';
import { fetchProducts,fetchShopProductsList,fetchShops } from '../../redux/ActionCreators';

const mapStateToProps = state => {
    return {

     
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
  constructor(props) {
    super(props);
    this.state = {
 
        data: [],
       
    
      
       
    };

  
}
  componentDidMount(){ 
    this.props.fetchShops();
    this.props.fetchProducts();
    this.props.fetchShopProductsList();
    const Products=[];
    this.props.shopProductsList.shopProductsList.map(item=>{
      
     
    
     item.products.map((shopProduct)=>{
        const Product=this.props.products.products.find((product)=>product.id==shopProduct.prod_id);
         Products.push({...Product,available:shopProduct.available,price:shopProduct.price,shop_name:this.props.shops.shops.find((shop)=>shop.id===item.shop_id).title,shop_id:item.shop_id});
         return ;
      })
      return ;
    })
    
   const filterProducts=Products.filter(Prod=>{
      const prodTitle=Prod.title.toLowerCase();
      if(prodTitle.includes(this.props.route.params.title.toLowerCase())){
        return true;
      }
      else{
        return false
      }
    })
     console.log('products : 123',Products)


    this.setState({
      
    
    data:filterProducts
    })

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
    
      return (
          <Card 
              itemData={item} shopId={item.shop_id}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:item,shopId:item.shop_id})}
          />
      );
  };

 
    return(
      <View style={styles.container}>
      <FlatList style={styles.list}
               data={this.state.data}
               renderItem={renderItem}
               keyExtractor={(item,index) =>index.toString()}
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
