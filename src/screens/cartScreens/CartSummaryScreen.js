import React,{memo,Component} from 'react';
import { View, Text, FlatList,Image, StyleSheet,SafeAreaView,ScrollView,Alert,ActivityIndicator,TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import {data} from '../../data/groceries';
import Card from '../../components/CartCard';
import Amount from '../../components/Amount';
import { postCart, deleteCart,decreaseCart,
  postOrder,deleteOrder,deleteCartArray,addAddress,deleteAddress,fetchProducts,fetchShopProductsList,fetchShops  } from '../../redux/ActionCreators';
import {  Button } from 'native-base';
import {theme} from '../../core/theme';
import TotalPrice from '../../components/TotalPrice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
    postOrder:(orderObject)=>dispatch(postOrder(orderObject)),
    deleteOrder:()=>dispatch(deleteOrder()),
    deleteCartArray:()=>dispatch(deleteCartArray()),
    addAddress:(object)=>dispatch(addAddress(object)),
    deleteAddress:()=>dispatch(deleteAddress()),

    fetchShops:()=>dispatch(fetchShops()),
    fetchProducts:()=>dispatch(fetchProducts()),
    fetchShopProductsList:()=>dispatch(fetchShopProductsList()),


})

class CartSummaryScreen extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       orderPlaced:false
    }

  }
  
  componentDidMount(){    
    this.props.fetchShops();
    this.props.fetchProducts();
    this.props.fetchShopProductsList();
  


  }
  amountTotal=(shopList)=>{
    const AmountArray=shopList.products.map(item => {
      const amount=this.props.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==shopList.shop_id).products.find((product)=>product.prod_id==item.prod_id).price;
      return amount*item.count;
     })
      
     
   
  
      const fun =(total, num) =>{
          return total + num;
        }
  
      const Amount=AmountArray.reduce(fun);
  
  
     
      return Amount;
  }
  postOrders=()=>{

    this.props.carts.map(item1=>{
      var d = new Date();
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
       const date=d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
       
      const items=item1.products.map(item => {
        const amount=this.props.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item1.shop_id).products.find((product)=>product.prod_id==item.prod_id).price;
        return ({...item,itemAmount:amount*item.count});
       })

       const obj={
        orderStatus:{
          ordered:true,
          orderedDate:date,
          delivered:false,
          deliveredDate:'',
          orderAccepted:false,
          orderAcceptedDate:''
        },
        address:this.props.address,
        priceDetails:{
          price:this.amountTotal(item1),
          discount:'100',
          deliveryCharge:'FREE',
          total:this.amountTotal(item1)
        },
        items:items,
        orderDetials:{
          orderId:(new Date()).getTime(),
          invoiceId:'',
          shop_id:item1.shop_id
        }
    }

    this.props.postOrder(obj);

    })
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
      this.postOrders();
      this.setState({orderPlaced:true})
      this.props.deleteCartArray();
      setTimeout(()=>{
        this.props.navigation.navigate('HomeDrawer',{screen:'Home'});
      },2000);
 
   
    }
  
  }

  address=()=>{
  
    return(
<View style={[{backgroundColor:"white",marginBottom:10,paddingVertical:14,borderBottomWidth: 1,
 borderColor:'#E0E0E0',paddingHorizontal:10}]} >
      <View style={{marginHorizontal:20}}>
      <Text style={{fontWeight:'bold',fontSize:18,}}>Delivery Address</Text>
        <Text style={{padding:3}}>{this.props.address.name}</Text>
      <Text numberOfLines={1} style={{padding:3}}>{this.props.address.roadNo} , {this.props.address.houseNo} </Text>
      <Text style={{padding:3}}>{this.props.address.city} , {this.props.address.state} - {this.props.address.pinCode} </Text>
      <Text style={{padding:3}}>Phone Number : {this.props.address.number}</Text>
      </View>
      <View style={{paddingVertical:0}}>
        
      <Button block onPress={()=>{
                this.props.navigation.navigate('AddressScreen')
              }} style={{backgroundColor:theme.colors.primary,borderRadius:0,
              marginHorizontal:10,marginVertical:10,paddingHorizontal:'auto',paddingVertical:3}}>
              <Text style={{padding:0,margin:0,fontSize:17,color:'white'}}>Change Address</Text>
            </Button>
    </View>
    </View>
    )
  }

  priceDetail=(shopList)=>{
    return(
      <View>
      <View style={{backgroundColor:'white',marginBottom:10,marginTop:2}}>
      <View style={{borderBottomWidth: 1,
 borderColor:'#E0E0E0',
}}>
      <Text style={{padding:10,fontSize:16,fontWeight:'bold'}}>PRICE DETAILS</Text>
      </View>
   
      
      <View style={styles.row}>
        <Text style={{marginRight:'auto'}}> Price ( {this.props.carts.length} items)</Text>
        <Text> {'\u20B9'} <Amount shopList={shopList} /> </Text>
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
        <Text style={{fontWeight:'bold',fontSize:16}}> {'\u20B9'} <Amount shopList={shopList} /> </Text>
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
   </View>)
    }
else{
    if(this.state.orderPlaced){
      return(
        <View style={styles.container2}>
          <View style={{alignItems:'center'}}>
          <FontAwesome  name="check-circle" size={200} color="#09af00"/>
      
        <Text style={{fontSize:17,fontWeight:'bold'}}>ORDER PLACED SUCCESSFULLY !</Text>
        
        <Text style={{fontSize:14,color:'#757575',paddingTop:10}}>Seller will contact you shortly </Text>
         
        <Button onPress={()=>this.props.navigation.navigate('HomeDrawer',{screen:'Home'})} style={{backgroundColor:theme.colors.primary,alignSelf:'center',marginTop:10}}>
            <Text style={{fontSize:17,marginHorizontal:40,color:'white'}}>OK</Text>
          </Button>
           </View>
        </View>
      )
    }
   


  if(this.props.carts.length==0 && !this.state.orderPlaced){
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
    return(
      <SafeAreaView style={styles.container} >
   
    
  
   <ScrollView>
    {this.address()}
    {this.props.carts.map((item2,index)=>{
 const shop=this.props.shops.shops.find((shop)=>shop.id==item2.shop_id);
 


 const renderItem=({item})=>{
 
   const obj=this.props.shopProductsList.shopProductsList.find((shopProduct)=>shopProduct.shop_id==item2.shop_id).products.find((product)=>product.prod_id==item.prod_id);
   const prodObj=this.props.products.products.find((product)=>product.id==obj.prod_id);
 
    const finalItem={
       ...prodObj,available:obj.available,price:obj.price,shop_name:shop.title,
       shop_id:item2.shop_id,
       count:item.count
     }
 
   return(
     <Card postCart={()=>this.props.postCart({prod_id:item.prod_id,shop_id:item2.shop_id})}
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
                 { text: "DELETE", onPress: () => this.props.deleteCart({prod_id:item.prod_id,shop_id:item2.shop_id}) }
               ],
               { cancelable: false }
             );
             }}
               decreaseCart={()=>this.props.decreaseCart({prod_id:item.prod_id,shop_id:item2.shop_id})}
               itemData={finalItem}
               onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:finalItem,shopId:item2.shop_id})}
           />
   )
 }
 
      return(
        <View key={index}>
             <FlatList 
      data={item2.products}
      renderItem={renderItem}
      keyExtractor={item => Math.random().toString()}
      ListHeaderComponent={()=><View style={{backgroundColor:'#fff',paddingVertical:10,
      justifyContent:'center',alignItems:'center',
      borderTopWidth:1,
      borderBottomWidth:1,
      borderColor:'#E0E0E0'}}> 
      <Text style={{fontSize:16,fontWeight:'bold'}}>Shop Name : {shop.title}</Text></View>}
      ListFooterComponent={()=>this.priceDetail(item2)}
  />
        </View>
      )
    })}
  
   
     
        
     </ScrollView>
        
        
         <View style={{flexDirection:'row',backgroundColor:"white",bottom:0,  borderTopColor:"#E0E0E0",
    borderTopWidth:1.5,
        }}>
  <View style={{flex:1,justifyContent:'center'}}>
  <View >
               <Text style={{fontSize:20,paddingLeft:20 ,fontWeight: 'bold',}}>Total : {'\u20B9'} <TotalPrice /> </Text>
               <Text style={{color:'#09af00',fontSize:12,paddingLeft:20}}>      {'\u20B9'} 100   Savings  </Text>
             </View>
    </View>

    <View style={{flex:1.2,paddingVertical:5}}>
          <Button onPress={()=>{
        
            this.placeOrder();
            }} style={{backgroundColor:"#FF3D00",borderRadius:0,marginHorizontal:10,marginVertical:5,paddingHorizontal:10,paddingVertical:3,marginLeft:'auto'}}>
            <Text style={{padding:0,margin:0,fontSize:17,marginHorizontal:20,color:'white'}}>Confirm Order</Text>
          </Button>
      
    </View>
 
  </View>
  
    </SafeAreaView>

    )

  }
}
}

export default connect(mapStateToProps,mapDispatchToProps)(CartSummaryScreen);

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
