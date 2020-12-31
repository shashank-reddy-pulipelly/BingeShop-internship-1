import React,{memo,Component} from 'react';
import { View, Text, FlatList,Image, StyleSheet,SafeAreaView,ScrollView,TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import {data} from '../../data/groceries';
import Card from '../../components/CartCard';
import Amount from '../../components/Amount';
import { postCart, deleteCart,decreaseCart,postOrder,deleteOrder,deleteCartArray } from '../../redux/ActionCreators';
import {  Button } from 'native-base';
import { Searchbar } from 'react-native-paper';
import Toast from 'react-native-tiny-toast';
const mapStateToProps = state => {
    return {

      carts: state.carts
    }
  }

  const mapDispatchToProps = dispatch => ({
    
    deleteCart: (itemId) => dispatch(deleteCart(itemId)),
    decreaseCart:(itemId)=>dispatch(decreaseCart(itemId)),
    postCart:(itemId)=>dispatch(postCart(itemId)),
    postOrder:(orderObject)=>dispatch(postOrder(orderObject)),
    deleteOrder:()=>dispatch(deleteOrder()),
    deleteCartArray:()=>dispatch(deleteCartArray()),



})

class CartScreen extends Component{

  amountTotal=()=>{
    const cartItemData=data.filter(item => this.props.carts.some(el => el.id === item.id))
    
   
    const amountArray=cartItemData.map((item)=>{
      const cartIdCountData=this.props.carts.filter((cartItem)=>cartItem.id==item.id)
         return item.amount*cartIdCountData[0].count;
     });
 
     const fun =(total, num) =>{
         return total + num;
       }
 
     const Amount=amountArray.reduce(fun);
     return Amount;
  }
orderItem=()=>{
  var d = new Date();
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 const date=d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();

const cartItems=this.props.carts.map((item)=>{
  const itemAmount=data.filter((dataItem)=>dataItem.id==item.id)[0].amount;
  return({count:item.count,id:item.id,itemAmount:itemAmount*item.count})
});
  return({
      orderStatus:{
        ordered:true,
        orderedDate:date,
        delivered:false,
        deliveredDate:'',
        orderAccepted:false,
        orderAcceptedDate:''
      },
      address:{},
      priceDetails:{
        price:this.amountTotal(),
        discount:'100',
        deliveryCharge:'FREE',
        total:this.amountTotal()
      },
      items:cartItems,
      orderDetials:{
        orderId:(new Date()).getTime(),
        invoiceId:'',
      }
  })
}
  placeOrder=()=>{
    this.props.postOrder(this.orderItem());
    this.props.deleteCartArray();
  }

  address=()=>{
    return(
<View style={[{alignItems:'center',backgroundColor:"white",marginBottom:10,paddingVertical:14},styles.row]} >
      <View>
      <Text> Deliver to Hyderabad - 508207 </Text>
      </View>
      <View style={{flex:1,paddingVertical:0}}>
          <TouchableWithoutFeedback  >
           <View style={{backgroundColor:"white",marginHorizontal:10,paddingVertical:5,paddingHorizontal:5,marginLeft:'auto',borderWidth:1,borderColor:'#BDBDBD'}}>
             <Text style={{padding:0,margin:0,fontSize:15,marginHorizontal:10,color:'#600EE6'}}>Change</Text>
             </View> 
          </TouchableWithoutFeedback>
      
    </View>
    </View>
    )
  }

  priceDetail=()=>{
    return(
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
        <Text style={{color:'#09af00'}}> -  {'\u20B9'} 16,925 </Text>
      </View>
      <View style={[{borderBottomWidth: 1,
 borderColor:'#E0E0E0',},styles.row]}>
        <Text style={{marginRight:'auto'}}> Delivery Charges</Text>
        <Text style={{color:'#09af00'}}> FREE </Text>
      </View>
      <View style={[{paddingVertical:10},styles.row]}>
        <Text style={{marginRight:'auto',fontWeight:'bold'}}> Total Amount</Text>
        <Text style={{fontWeight:'bold',fontSize:16}}> {'\u20B9'} <Amount/> </Text>
      </View>
    </View>
    )
  }

  render(){
   

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
         
        <Button onPress={()=>this.props.navigation.navigate('Home')} style={{backgroundColor:"#600EE6",alignSelf:'center',marginTop:10}}>
            <Text style={{fontSize:17,marginHorizontal:40,color:'white'}}>Bu Now</Text>
          </Button>
           </View>
        </View>
      )
    }
    const renderItem = ({item}) => {
      return (
          <Card postCart={(itemId)=>this.props.postCart(itemId)}
          deleteCart={()=>this.props.deleteCart(item.id)}
              decreaseCart={(itemId)=>this.props.decreaseCart(itemId)}
              itemData={item}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData: item})}
          />
      );
  };
    return(
      <SafeAreaView style={styles.container} >
   
    
  
      <FlatList 
               data={data.filter(item => this.props.carts.some(el => el.id === item.id))}
               renderItem={renderItem}
               keyExtractor={item => item.id}
               ListHeaderComponent={this.address}
               ListFooterComponent={this.priceDetail}
           />
     
        
        
         <View style={{flexDirection:'row',backgroundColor:"white",bottom:0,  borderTopColor:"#E0E0E0",
    borderTopWidth:1.5,
        }}>
  <View style={{flex:1,justifyContent:'center'}}>
  <View >
               <Text style={{fontSize:20,paddingLeft:20 ,fontWeight: 'bold',}}>Total : {'\u20B9'} <Amount/> </Text>
               <Text style={{color:'#09af00',fontSize:12,paddingLeft:20}}>      {'\u20B9'} 16,925   Savings  </Text>
             </View>
    </View>

    <View style={{flex:1,paddingVertical:5}}>
          <Button onPress={()=>{
              Toast.show(' Order Placed Successfully ',{
      position:-70,
      containerStyle:{
        borderRadius:10,
        paddingHorizontal:10
      }
    });
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
  }
 
});
