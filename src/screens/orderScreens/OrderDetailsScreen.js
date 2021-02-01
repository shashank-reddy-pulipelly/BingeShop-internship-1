import React,{Component} from 'react';
import { View, Text, StyleSheet,Image,ScrollView,TouchableWithoutFeedback,Modal,Dimensions } from 'react-native';
import { Rating as Ratings, AirbnbRating } from 'react-native-ratings';
import * as firebase from 'firebase';
import {theme} from '../../core/theme';
import {Rating} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Toast from 'react-native-tiny-toast';
import { Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogBox } from 'react-native';
import {Button as PaperButton } from 'react-native-paper';

const { width, height } = Dimensions.get("window");
class OrderDetailsScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       rating:'',
       modal:false,
       userRating:this.props.route.params.orderItem.orderDetials.rating,
       localRating:false,
       shop:{rating:null,reviews:null},
       items:{isLoading:true,errMess:null,items:[]}
    }
  }
  load= async ()=>{
    
 
     
      
    var array=[];
    for(const keys in this.props.route.params.orderItem.items){
    
    await firebase.database().ref(`ShopProducts/${this.props.route.params.orderItem.orderDetials.shop_id}/${this.props.route.params.orderItem.items[keys].prod_id}`).once('value',  snap=>{
    array.push({title:snap.val().title,image:snap.val().image,quantity:snap.val().quantity,itemAmount:this.props.route.params.orderItem.items[keys].itemAmount,count:this.props.route.params.orderItem.items[keys].count})
    
    })
    }
    this.setState({items:{isLoading:false,errMess:null,items:array}})
    
}
async componentDidMount(){
  LogBox.ignoreAllLogs();
  await  this.load();
this.query2=firebase.database().ref('Shops/'+this.props.route.params.orderItem.orderDetials.shop_id).on('value',(snapshot)=>{
const shop=snapshot.val();
this.setState({shop:{rating:shop.rating,reviews:shop.reviews}})
})
}
  componentWillUnmount(){

    firebase.database().ref('Shops/'+this.props.route.params.orderItem.orderDetials.shop_id).off('value',this.query2)
  }
  
  render(){
    const orderItem=this.props.route.params.orderItem;
    const orderStatus=()=>{
      if(this.props.route.params.orderItem.orderStatus.delivered){
       return({status:'Delivered',date:this.props.route.params.orderItem.orderStatus.deliveredDate})
      }
      else if(this.props.route.params.orderItem.orderStatus.orderAccepted){
        return({status:'Order Accepted',date:this.props.route.params.orderItem.orderStatus.orderAcceptedDate})
      }
      if(this.props.route.params.orderItem.orderStatus.ordered){
        return({status:'Ordered',date:this.props.route.params.orderItem.orderStatus.orderedDate})
      }
    }

    return(
      <View style={styles.container}>
<ScrollView>
       <View >
          <View style={styles.row1}>
          <View style={styles.status}>
            <View style={{flexDirection:'row',flex:1}}>
           <View style={{flex:1}}>
           <Text style={this.props.route.params.orderItem.orderStatus.delivered?{fontWeight:'bold',fontSize:20,color:'black'}:{fontWeight:'bold',fontSize:20,color:'#FF8F00'}}>{orderStatus().status}</Text>
        <Text style={{fontSize:16,fontWeight:'bold',marginTop:10,
        color:'black'}}>{orderStatus().date}</Text>
           </View>
     <View style={{flex:1,paddingRight:20}}>
       <Text style={{marginLeft:'auto',fontSize:16,paddingVertical:5,color:'#757575'}}>Shop Name</Text>
       <Text style={{marginLeft:'auto',fontSize:18,fontWeight:'bold'}}>{orderItem.orderDetials.shop_name}</Text>
     </View>
     </View>
         <Text style={{color:'#757575',paddingVertical:5,fontSize:15}}>Order Id : {orderItem.orderDetials.orderId}</Text>
          </View>
       

          </View>
          <View style={styles.track}>
<View>
  <Text style={{fontWeight:'bold',fontSize:18,marginLeft:10}}>Track Order</Text>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
<FontAwesome name="circle" size={13} color={theme.colors.primary}/>
<View style={{height:75,borderLeftWidth:3,borderLeftColor:orderItem.orderStatus.orderAccepted?theme.colors.primary:'#9E9E9E'}}>
  
</View>
<FontAwesome name="circle" size={13} color={orderItem.orderStatus.orderAccepted?theme.colors.primary:'#9E9E9E'}/>
<View style={{height:75,borderLeftWidth:3,borderLeftColor:orderItem.orderStatus.delivered?theme.colors.primary:'#9E9E9E'}}>
  
</View>
<FontAwesome name="circle" size={13} color={orderItem.orderStatus.delivered?theme.colors.primary:'#9E9E9E'}/>
</View >
<View style={{flex:8}}>
<View style={styles.item1}>
<Octicons  name="checklist" size={40} color={theme.colors.primary} />
<View style={{marginLeft:20 ,}}>
<Text numberOfLines={1} style={{fontSize:17}} >Order Placed </Text>
<Text style={{color:'#757575'}}>{orderItem.orderStatus.orderedDate}</Text>
</View>
      </View>
      <View style={styles.item1}>
<FontAwesome name="check-circle" size={40} color={orderItem.orderStatus.orderAccepted?theme.colors.primary:'#9E9E9E'}/>
<View style={{marginLeft:20 ,}}>
<Text numberOfLines={1} style={{fontSize:17,color:orderItem.orderStatus.orderAccepted?'black':'#757575'}} >Order Accepted</Text>
<Text style={{color:'#757575'}}>{orderItem.orderStatus.orderAcceptedDate}</Text>
</View>
</View>
<View style={styles.item1}>

<MaterialCommunityIcons  name="truck-delivery" size={40} color={orderItem.orderStatus.delivered?theme.colors.primary:'#9E9E9E'}/>
<View style={{marginLeft:20 ,}}>
<Text numberOfLines={1} style={{fontSize:17,color:orderItem.orderStatus.delivered?'black':'#757575'}} >Delivered</Text>
<Text style={{color:'#757575'}}>{orderItem.orderStatus.deliveredDate}</Text>
</View>
   </View>
</View>
       

   
  </View>
  <View>
    <Modal animationType="fade" 
                   transparent visible={this.state.modal}  
                   presentationStyle="overFullScreen" >
                     <View style={{  
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
   }}>
     <View style={{    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width:width*.9}}>
                     <Rating
  showRating
  onFinishRating = { rating =>
  
    { 
      this.setState({localRating:rating})
    }}
  style={{ paddingVertical: 20 }}
/>
                     <View style={{flexDirection:'row',paddingTop:15,paddingBottom:10,marginLeft:'auto',marginRight:10}}>
   <PaperButton mode="text" labelStyle={{fontSize:16}} onPress={()=>{this.setState({modal:false})}}>Cancel </PaperButton>
   <PaperButton mode="text"labelStyle={{fontSize:16}} onPress={()=>{

  const newRating=(this.state.shop.rating*this.state.shop.reviews+this.state.localRating)/(this.state.shop.reviews+1);
  firebase.database().ref('Shops/'+this.props.route.params.orderItem.orderDetials.shop_id).update({rating:newRating,reviews:this.state.shop.reviews+1},(error)=>{
    if(error){
      console.log('error in rating',error)
    }
    else{
      firebase.database().ref(`Orders/${this.props.route.params.orderItem.id}/orderDetials`).update({rating:this.state.localRating},(error)=>{
        if(error){
          console.log('error in rating',error)
        }
        else{
          this.setState({modal:false,userRating:this.state.localRating})
          Toast.show('Thank You for rating ',{
            position:-.00001,
             containerStyle:{
               borderRadius:0,
               paddingHorizontal:0,
               width:'100%'
             }
           })
        }

      })
 
    }
  })


}

}> Confirm </PaperButton>


       </View> 
     </View>

                     </View>

    </Modal>
 {this.props.route.params.orderItem.orderStatus.delivered?  (this.state.userRating==false?<View>
      <Button onPress={()=>this.setState({modal:true})} style={styles.filterButton2}>
            <Text style={{fontSize:17,color:'white'}}>Rate the Shop</Text>
          </Button>

</View>:<Rating style={{marginBottom:30}} type='custom' 
                                fractions = { 0 }
                                startingValue={this.state.userRating}
                                ratingColor={theme.colors.primary}
                                ratingBackgroundColor='#c8c7c8'
                                imageSize = { 35 }
                                readonly={true}
                                showRating/>):null}
  
    
                   
                      </View>     
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
                   
                      <Text  style={{ marginTop:10,marginLeft:2,fontSize:16, fontWeight: 'bold',}}> Rs. {itemsItem.itemAmount}</Text>
                      <Text style={{fontSize: 14, color: '#616161'
                         ,marginTop:9,marginLeft:'auto',fontWeight:'bold',marginRight:40}}>Quantity :{itemsItem.count}</Text>
                  </View>
                  <Text style={{alignSelf:'center',paddingVertical:10}} >Net Weight : {itemsItem.quantity} / <Text style={{fontSize:12}} >per piece</Text></Text>
               
              
              </View>
            </View>
            )
          })}
</View>


            <View style={{backgroundColor:'white',marginVertical:10,paddingHorizontal:10, borderBottomColor:"#E0E0E0",
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
               <Text style={{marginRight:'auto',fontWeight:'bold'}}> Total Amount</Text>
               <Text style={{fontWeight:'bold',fontSize:16}}> {'\u20B9'} {orderItem.priceDetails.total} </Text>
             </View>
           </View>
       </View>
       <TouchableWithoutFeedback>
       <View style={{backgroundColor:'white',paddingVertical:15,paddingLeft:10,marginBottom:10, borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,flexDirection:'row'}}>
   
       <MaterialCommunityIcons style={{paddingHorizontal:5}} name="file-document" size={25} color={theme.colors.primary} />
         <Text style={{marginLeft:20,fontSize:17}}>Download Invoice</Text>
         <FontAwesome style={{paddingHorizontal:5,marginLeft:'auto',marginRight:20}} name="angle-right" size={25} color="black"/>
       </View>
       </TouchableWithoutFeedback>
    
       <View style={{backgroundColor:'white',paddingVertical:10,paddingLeft:10,marginBottom:10, borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,}}>
              
                  <View style={{marginLeft:10}} >
  <Text style={{fontWeight:'bold',fontSize:18,}}>Delivery Address</Text>
  <Text style={{padding:3}} >{orderItem.address.name}</Text>
  <Text style={{padding:3}} >{orderItem.address.roadNo}</Text>
  <Text style={{padding:3}} >{orderItem.address.houseNo} , {orderItem.address.city} </Text>
  <Text style={{padding:3}} >{orderItem.address.state} - {orderItem.address.pinCode}</Text>
  <Text style={{padding:3}} >Phone Number : {orderItem.address.number}</Text>
</View>
<View>

</View>
                 
                </View>
       
       </ScrollView>
      
         </View>
    )
  }
}

export default OrderDetailsScreen;

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
paddingBottom:10

  },
  status:{
paddingLeft:10,

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
    alignSelf:'center'
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
    paddingBottom:0,
     flexDirection: 'row',
  borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,
 backgroundColor:"#fff"
 
    
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
    
     fontSize:15
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
  


});
