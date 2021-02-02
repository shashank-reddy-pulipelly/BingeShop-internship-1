import React,{memo,Component} from 'react';
import { View, Text, StyleSheet,Image,ScrollView,Alert ,ActivityIndicator} from 'react-native';


import {theme} from '../../../core/theme';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Button } from 'native-base';

import * as firebase from 'firebase';
import { LogBox } from 'react-native';


class VendorOrderDetailsScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      orderItem:this.props.route.params.orderItem,
      items:{isLoading:true,errMess:null,items:[]}
    }
  }

  load= async ()=>{
    
  
     
      
      var array=[];
      for(const keys in this.props.route.params.orderItem.items){
      
      const query2 = firebase.database().ref(`ShopProducts/${this.props.route.params.orderItem.orderDetails.shop_id}/${this.props.route.params.orderItem.items[keys].prod_id}`)
      await query2.once('value',  snap=>{
      array.push({title:snap.val().title,image:snap.val().image,quantity:snap.val().quantity,itemAmount:this.props.route.params.orderItem.items[keys].itemAmount,count:this.props.route.params.orderItem.items[keys].count})
      
      })
      }
      this.setState({items:{isLoading:false,errMess:null,items:array}})
      
  }
 async componentDidMount(){
  LogBox.ignoreAllLogs();
  await  this.load();
  }

  orderStatus=()=>{
    if(this.state.orderItem.orderStatus.delivered){
     return({status:'Delivered'})
    }
    else if(this.state.orderItem.orderStatus.orderDispatched){
      return({status:'Order Dispatched'})
    }
    else if(this.state.orderItem.orderStatus.orderAccepted){
      return({status:'Order Accepted'})
    }
    if(this.state.orderItem.orderStatus.ordered){
      return({status:'Order Pending'})
    }
  }

buttonHandler=()=>{
  if(this.state.orderItem.orderStatus.delivered){
    return(
     
         <View style={{alignItems:'center',paddingVertical:20}}>
          <FontAwesome  name="check-circle" size={80} color="#09af00"/>
      
        <Text style={{fontSize:17,fontWeight:'bold',marginBottom:10}}>Order delivered Successfully</Text>        
      
           </View> 
     
    )
   }
 
   else if(this.state.orderItem.orderStatus.orderDispatched){
     return(
      <View style={{paddingVertical:5}}>
            <Button onPress={()=>{
       Alert.alert(
        "Are you sure Delivering the Order ?",
        "Please press ok to Deliver the Order",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          { text: "OK", onPress: () => {
            var d = new Date();
            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
             const date=d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
             console.log(this.props.route.params.orderItem.id);
            firebase.database().ref('Orders/'+this.props.route.params.orderItem.id+'/orderStatus').update({delivered:true,deliveredDate:date},(error)=>{
if(error){
  console.log(error);

}
else{

  this.setState({orderItem:{...this.state.orderItem,orderStatus:{...this.state.orderItem.orderStatus,delivered:true,deliveredDate:date}}},()=>{
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: this.props.route.params.orderItem.userPushToken,
        sound: 'default',
        title: 'Your Order Delivered just Now !',
        body: 'Please check your orders for details',
      }),
    });
  })
}
            })
          }}
        ],
        { cancelable: false }
      );
            }} style={styles.filterButton2}>
         <Text style={{fontSize:17,color:'white'}}>Deliver Order</Text>
       </Button>
   </View>
     )
   }
   else if(this.state.orderItem.orderStatus.orderAccepted){
    return(
     <View style={{paddingVertical:5}}>
           <Button onPress={()=>{
      Alert.alert(
       "Are you sure Dispatching the Order ?",
       "Please press ok to Dispatch the Order",
       [
         {
           text: "Cancel",
           onPress: () => {},
           style: "cancel"
         },
         { text: "OK", onPress: () => {
           var d = new Date();
           var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const date=d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
            console.log(this.props.route.params.orderItem.id);
           firebase.database().ref('Orders/'+this.props.route.params.orderItem.id+'/orderStatus').update({orderDispatched:true,orderDispatchedDate:date},(error)=>{
if(error){
 console.log(error);

}
else{

 this.setState({orderItem:{...this.state.orderItem,orderStatus:{...this.state.orderItem.orderStatus,orderDispatched:true,orderDispatchedDate:date}}},()=>{
   fetch('https://exp.host/--/api/v2/push/send', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Accept-Encoding': 'gzip, deflate',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       to: this.props.route.params.orderItem.userPushToken,
       sound: 'default',
       title: 'Your Order Dispatched just Now !',
       body: 'Please check your orders for details',
     }),
   });
 })
}
           })
         }}
       ],
       { cancelable: false }
     );
           }} style={styles.filterButton2}>
        <Text style={{fontSize:17,color:'white'}}>Dispatch Order</Text>
      </Button>
  </View>
    )
  }
   else if(this.state.orderItem.orderStatus.ordered){
     return(
      <View style={{paddingVertical:5}}>
      <Button onPress={()=>{
                      Alert.alert(
                        "Are you sure Accepting the Order ?",
                        "Please press ok to Accept the Order",
                        [
                          {
                            text: "Cancel",
                            onPress: () => {},
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {
                            var d = new Date();
                            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                             const date=d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
                             console.log(this.props.route.params.orderItem.id);
                            firebase.database().ref('Orders/'+this.props.route.params.orderItem.id+'/orderStatus').update({orderAccepted:true,orderAcceptedDate:date},(error)=>{
                              if(error){
                                console.log(error);
                              
                              }
                              else{
                                this.setState({orderItem:{...this.state.orderItem,orderStatus:{...this.state.orderItem.orderStatus,orderAccepted:true,orderAcceptedDate:date}}},()=>{
                                  fetch('https://exp.host/--/api/v2/push/send', {
                                    method: 'POST',
                                    headers: {
                                      Accept: 'application/json',
                                      'Accept-Encoding': 'gzip, deflate',
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                      to: this.props.route.params.orderItem.userPushToken,
                                      sound: 'default',
                                      title: 'Your Order Accepted just Now !',
                                      body: 'Please check your orders for details',
                                    }),
                                  });
                                })
                              }
                                          })
                          } }
                        ],
                        { cancelable: false }
                      );
      }} style={styles.filterButton2}>
         <Text style={{fontSize:17,color:'white'}}>Accept Order</Text>
       </Button>
   </View>
     )
   }
}
  
  render(){
      if(this.state.items.isLoading){
return(
    <View style={[styles.container, styles.horizontal]}>
      
 
    <ActivityIndicator size="large" color="#600EE6" />
  </View>
)
      }
      else if(this.state.items.errMess){
          return(
            <View style={[styles.horizontal]} > 
            <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
            <Text style={{fontSize:18,fontWeight:'bold'}} >something went wrong !</Text>
        </View>
          )
      }
      else{
    const orderItem=this.props.route.params.orderItem;


    return(
      <View style={styles.container}>
<ScrollView>
       <View >
          <View style={styles.row1}>
          <View style={styles.status}>
           
        <Text style={this.state.orderItem.orderStatus.delivered?{fontWeight:'bold',fontSize:20,color:'black'}:{fontWeight:'bold',fontSize:20,color:'#FF8F00'}}>{this.orderStatus().status}</Text>
         <Text style={{color:'#757575',paddingVertical:5,fontSize:15,marginTop:10}}>Order Id : {orderItem.orderDetails.orderId}</Text>
          </View>
          <View style={styles.amount}>
          <Text style={{color:'#757575',fontSize:15}}>Total ({orderItem.items.length} items)</Text>
          <Text style={{marginLeft:'auto',marginRight:10,fontSize:18,fontWeight:'bold',marginTop:10}}>{'\u20B9'} {orderItem.priceDetails.total}</Text>
          </View >

          </View>
          <View style={{backgroundColor:'white',paddingVertical:10,paddingLeft:10,marginBottom:10, borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,}}>
              
                  <View style={{marginLeft:10}} >
  <Text style={{fontWeight:'bold',fontSize:18,paddingBottom:10}}>Delivery Address</Text>
  <Text style={{padding:3,fontSize:16,}} ><Text style={{fontWeight:'bold'}}>Name </Text>: {orderItem.address.name}</Text>
  <Text style={{padding:3,fontSize:16}} >{orderItem.address.roadNo}</Text>
  <Text style={{padding:3,fontSize:16}} >H-No : {orderItem.address.houseNo} , {orderItem.address.city} </Text>
  <Text style={{padding:3,fontSize:16}} >{orderItem.address.state} - {orderItem.address.pinCode}</Text>
  <Text style={{padding:3,fontSize:16}} ><Text style={{fontWeight:'bold'}}>Phone Number</Text>  {orderItem.address.number}</Text>
</View>

                 
                </View>
                <View style={{backgroundColor:'#fff',marginBottom:10, borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,}}>
              {this.buttonHandler()}
                </View>
              
          <View style={styles.orderItems}>
          <View style={{marginTop:10,marginLeft:10}} >
  <Text style={{fontWeight:'bold',fontSize:18,marginLeft:10}}>Order Items</Text>
</View>
        
          {this.state.items.items.map((itemsItem,index)=>{

           
            return(
              
              <View key={index} style={styles.card2}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={{uri:itemsItem.image}}
                  resizeMode="stretch"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
      
                <Text numberOfLines={3} style={styles.cardTitle}>{itemsItem.title}</Text>
                
             
   
                  <View style={styles.row}>
                   
                      <Text  style={{ marginTop:10,marginLeft:0,fontSize:16, fontWeight: 'bold',}}> Rs. {itemsItem.itemAmount}</Text>
                      <Text style={{fontSize: 14, color: '#616161'
                         ,marginTop:9,marginLeft:'auto',fontWeight:'bold',marginRight:20}}>Quantity :{itemsItem.count}</Text>
                  </View>
           <Text style={{alignSelf:'center',paddingVertical:10}} >Net Weight : {itemsItem.quantity} / <Text style={{fontSize:12}} >per piece</Text></Text>
               
              
              </View>
            </View>
            )
          })}
</View>


            <View style={{backgroundColor:'white',marginBottom:10,paddingHorizontal:10, borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,}}>
             <View style={{borderBottomWidth: 1,
        borderColor:'#E0E0E0',
       }}>
             <Text style={{padding:10,fontSize:16,fontWeight:'bold',paddingLeft:10}}>PRICE DETAILS</Text>
             </View>
          
             
             <View style={styles.row}>
               <Text style={{marginRight:'auto'}}> Price ({orderItem.items.length} items)</Text>
               <Text> {'\u20B9'} {orderItem.priceDetails.price} </Text>
             </View>
             <View style={styles.row}>
               <Text style={{marginRight:'auto'}}> Discount</Text>
               <Text style={{color:'#09af00'}}> -  {'\u20B9'} {orderItem.priceDetails.discount} </Text>
             </View>
             <View style={[{borderBottomWidth: 1,
        borderColor:'#E0E0E0',},styles.row]}>
               <Text style={{marginRight:'auto'}}> Delivery Charges</Text>
               <Text style={{color:'#09af00'}}> {orderItem.priceDetails.deliveryCharge} </Text>
             </View>
             <View style={[{paddingVertical:10},styles.row]}>
               <Text style={{marginRight:'auto',fontWeight:'bold',fontSize:17}}> Total Amount</Text>
               <Text style={{fontWeight:'bold',fontSize:18}}> {'\u20B9'} {orderItem.priceDetails.total} </Text>
             </View>
           </View>
       </View>
     
    
     
       
       </ScrollView>
      
         </View>
    )
  }
}
}

export default VendorOrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
flex:1,
    width: '100%',
    alignSelf: 'center', 
  },

  cardImg: {
    height: 50,
    width: 40,
resizeMode:'stretch',
margin:10,
  },
  row1:{

width:'100%',
backgroundColor:"#fff",
paddingTop:20,
paddingHorizontal:10,
marginBottom:10,
paddingBottom:10,
flexDirection:'row',
alignItems:'center'

  },
  status:{
paddingLeft:10,
marginRight:'auto',
  },
  amount:{
    paddingRight:10,
  },
  item1:{
flexDirection:'row',
alignItems:'center',
marginVertical:20,
marginHorizontal:10,



  },
  item2:{
    flexDirection:'row',
    alignItems:'center',
borderBottomWidth:1,
borderBottomColor:'#EEEEEE'
  },
  orderItems:{
  backgroundColor:'#fff',
  marginBottom:10

  },
  

    filterButton2:{
    backgroundColor:theme.colors.primary,
    borderRadius:5,
    marginHorizontal:10,
    marginVertical:10,
    paddingHorizontal:30,
    paddingVertical:0,

    height:45,
    alignSelf:'center',

  },
  track:{
    backgroundColor:'#fff',
    paddingTop:10,
paddingHorizontal:10,
marginBottom:10,
paddingBottom:10
  },
  card2: {
 
    padding:10,

     flexDirection: 'row',
  borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,
 backgroundColor:"#fff",
 
 
    
   },
   cardImgWrapper: {
     flex: 1,
     alignSelf: 'center',
     padding:10
   },
   cardImg: {
     height: 110,
     width: 90,
 resizeMode:'stretch'
 
   },
   cardInfo: {
     flex: 3,
     padding: 15,
     paddingBottom:1,
 
 
     backgroundColor: '#fff',
   },
   cardTitle: {
    
     fontSize:15,
     fontWeight:'bold'
   },
 
   ratings:{
     flexDirection: 'row',
     marginTop:0
   },
   star:{
     flex:1,
     backgroundColor:"#09af00",
     marginRight:10,
    height:23,
   
     justifyContent:'center',
     alignItems:"center",
     flexDirection: 'row',
     borderRadius:3,
     paddingHorizontal:2
   
   },
   reviews: {
     flex:4,
    
   },
   row:{
     flexDirection: 'row',
    alignItems:'center',
    paddingBottom:5,
    padding:7,
    paddingHorizontal:5
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
