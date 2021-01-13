import React,{Component} from 'react';
import { View, Text, FlatList,Image, StyleSheet,SafeAreaView,
  Alert,TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Card from '../../components/CartCard';
import Amount from '../../components/Amount';
import { postCart, deleteCart,decreaseCart,
 deleteOrder,deleteCartArray,addAddress,deleteAddress,fetchProducts,fetchShopProductsList,fetchShops } from '../../redux/ActionCreators';
import {  Button } from 'native-base';

import {theme} from '../../core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const mapStateToProps = state => {
    return {

      carts: state.carts,
      address:state.address,
      shops:state.shops,
      products: state.products,
      shopProductsList:state.shopProductsList,
    }
  }

  const mapDispatchToProps = dispatch => ({
    
    deleteCart: (itemId) => dispatch(deleteCart(itemId)),
    decreaseCart:(itemId)=>dispatch(decreaseCart(itemId)),
    postCart:(itemId)=>dispatch(postCart(itemId)),
    deleteOrder:()=>dispatch(deleteOrder()),
    deleteCartArray:()=>dispatch(deleteCartArray()),
    addAddress:(object)=>dispatch(addAddress(object)),
    deleteAddress:()=>dispatch(deleteAddress()),
    fetchShops:()=>dispatch(fetchShops()),
    fetchProducts:()=>dispatch(fetchProducts()),
    fetchShopProductsList:()=>dispatch(fetchShopProductsList()),



})

class CartScreen extends Component{



  componentDidMount(){    
 
    this.props.fetchShops();
    this.props.fetchProducts();
    this.props.fetchShopProductsList();
  
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.fetchShops();
    this.props.fetchProducts();
    this.props.fetchShopProductsList();
 
    });


  }
  
  componentWillUnmount() {
    this._unsubscribe();
  }
  placeOrder=()=>{
    if(!this.props.address.pinCode){
      Alert.alert(
        "No delivery Address",
        "Please Add delivery Address",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "ADD", onPress: () => this.props.navigation.navigate('AddressScreen') }
        ],
        { cancelable: false }
      );
    }
    else{
 
      this.props.navigation.navigate('CartSummaryScreen')
    
    }
  
  }

  address=()=>{
    return(
<View style={[{alignItems:'center',backgroundColor:"white",marginBottom:10,paddingVertical:14},styles.row]} >
      <View>
        {this.props.address.city?<Text> Deliver to {this.props.address.city}- {this.props.address.pinCode} </Text>:<Text>Add delivery Details </Text>}
      
      </View>
      <View style={{flex:1,paddingVertical:0}}>
          <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('AddressScreen')} >
           <View style={{backgroundColor:"white",marginHorizontal:10,paddingVertical:5,paddingHorizontal:5,marginLeft:'auto',borderWidth:1,borderColor:'#BDBDBD'}}>
             <Text style={{padding:0,margin:0,fontSize:15,marginHorizontal:10,color:theme.colors.primary}}>Change</Text>
             </View> 
          </TouchableWithoutFeedback>
      
    </View>
    </View>
    )
  }

  priceDetail=()=>{
    return(
      <View>
      <View style={{backgroundColor:'white',marginVertical:10}}>
      <View style={{borderBottomWidth: 1,
 borderColor:'#E0E0E0',
}}>
      <Text style={{padding:10,fontSize:16}}>PRICE DETAILS</Text>
      </View>
   
      
      <View style={styles.row}>
        <Text style={{marginRight:'auto'}}> Price ( {this.props.carts.length} items)</Text>
        <Text> {'\u20B9'} <Amount/> </Text>
      </View>
      <View style={styles.row}>
        <Text style={{marginRight:'auto'}}> Discount</Text>
        <Text style={{color:'#09af00'}}> -  {'\u20B9'} 100 </Text>
      </View>
      <View style={[{borderBottomWidth: 1,
 borderColor:'#E0E0E0',},styles.row]}>
        <Text style={{marginRight:'auto'}}> Delivery Charges</Text>
        <Text style={{color:'#09af00'}}> FREE </Text>
      </View>
      <View style={[{paddingVertical:10},styles.row]}>
        <Text style={{marginRight:'auto',fontWeight:'bold',fontSize:16}}> Total Amount</Text>
        <Text style={{fontWeight:'bold',fontSize:16}}> {'\u20B9'} <Amount/> </Text>
      </View>
    </View>
    <View style={{backgroundColor:'white',marginBottom:10,marginTop:5,
    marginHorizontal:15,padding:10,borderWidth:1,borderColor:'grey',borderRadius:4}}>
      <View>
      <View style={{flexDirection:'row'}}>
        <MaterialCommunityIcons style={{padding:5}}
                        name="cash-100" 
                        color="black"
                        size={28}
                        />
<Text style={{fontSize:18,fontWeight:'bold',padding:5,color:'#1A237E'}}> Cash on Delivery Only </Text>

        </View>
        <Text style={{padding:5}}>we accept only Cash on Delivery for instance</Text>
      </View>
        
    </View >
    </View>
    )
  }

  render(){


    if(this.props.products.isLoading || this.props.shopProductsList.isLoading || this.props.shops.isLoading ){
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
    if(this.props.carts.length==0){
      return(
        <View style={styles.container2}>
          <View style={{alignItems:'center'}}>
          <Image
          style={styles.cartLogo}
          source={require('../../assets/empty-card.png')}
        />
        <Text style={{fontSize:20,fontWeight:'bold'}}>Your cart is empty !</Text>
        
        <Text style={{fontSize:14,color:'#757575',paddingTop:10}}>Add items to it </Text>
         
        <Button onPress={()=>this.props.navigation.navigate('Home')} style={{backgroundColor:theme.colors.primary,alignSelf:'center',marginTop:10}}>
            <Text style={{fontSize:17,marginHorizontal:40,color:'white'}}>Buy Now</Text>
          </Button>
           </View>
        </View>
      )
    }
    const renderItem = ({item}) => {
  const obj=this.props.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item.shop_id).products.find((product)=>product.prod_id==item.prod_id);
      const prodObj=this.props.products.products.find((product)=>product.id==obj.prod_id);
      const shop=this.props.shops.shops.find((shop)=>shop.id==item.shop_id);
       const finalItem={
          ...prodObj,available:obj.available,price:obj.price,shop_name:shop.title,
          shop_id:item.shop_id,
          count:item.count
        }
      return (
          <Card postCart={()=>this.props.postCart({prod_id:item.prod_id,shop_id:item.shop_id})}
          deleteCart={()=>{
            Alert.alert(
              "Delete Item ?",
              "Are you sure to delete this Item ?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "DELETE", onPress: () => this.props.deleteCart({prod_id:item.prod_id,shop_id:item.shop_id}) }
              ],
              { cancelable: false }
            );
            }}
              decreaseCart={()=>this.props.decreaseCart({prod_id:item.prod_id,shop_id:item.shop_id})}
              itemData={finalItem}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:finalItem,shopId:item.shop_id})}
          />
      );
  };
    return(
      <SafeAreaView style={styles.container} >
   
    
  
      <FlatList 
               data={this.props.carts}
               renderItem={renderItem}
               keyExtractor={item => Math.random().toString()}
               ListHeaderComponent={this.address}
               ListFooterComponent={this.priceDetail}
           />
     
        
        
         <View style={{flexDirection:'row',backgroundColor:"white",bottom:0,  borderTopColor:"#E0E0E0",
    borderTopWidth:1.5,
        }}>
  <View style={{flex:1,justifyContent:'center'}}>
  <View >
               <Text style={{fontSize:20,paddingLeft:20 ,fontWeight: 'bold',}}>Total : {'\u20B9'} <Amount/> </Text>
               <Text style={{color:'#09af00',fontSize:12,paddingLeft:20}}>      {'\u20B9'} 100   Savings  </Text>
             </View>
    </View>

    <View style={{flex:1,paddingVertical:5}}>
          <Button onPress={()=>{
        
            this.placeOrder();
            }} style={{backgroundColor:"#FF3D00",borderRadius:0,marginHorizontal:10,marginVertical:5,paddingHorizontal:0,paddingVertical:3,marginLeft:'auto'}}>
            <Text style={{padding:0,margin:0,fontSize:17,marginHorizontal:40,color:'white'}}>Place Order</Text>
          </Button>
      
    </View>
 
  </View>
  
    </SafeAreaView>

    )

  }
}

}

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#EEEEEE",
    flexDirection:'column'
  },
  row:{
    flexDirection:'row',
    padding:7,
    paddingHorizontal:15
  },
  cartLogo:{
  
    resizeMode: 'stretch'
  },
  container2:{

    alignItems:'center',
    flex:1,
    backgroundColor:'white',
    paddingTop:60
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
