import React,{memo,Component} from 'react';
import { View, Text, FlatList, StyleSheet,Image,ScrollView,TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import {data} from '../../data/groceries';
import Card from '../../components/Card';
import { Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const mapStateToProps = state => {
    return {

      favorites: state.favorites,
      carts:state.carts
    }
  }

  const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class OrderDetailsScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  
  
  render(){
    const orderItem=this.props.route.params.orderItem;
    const orderStatus=()=>{
      if(orderItem.orderStatus.delivered){
       return({status:'Delivered',date:orderItem.orderStatus.deliveredDate})
      }
      else if(orderItem.orderStatus.orderAccepted){
        return({status:'Expected Delivery Date',date:orderItem.orderStatus.orderAcceptedDate})
      }
      if(orderItem.orderStatus.ordered){
        return({status:'Ordered',date:orderItem.orderStatus.orderedDate})
      }
    }

    return(
      <View style={styles.container}>
<ScrollView>
       <View >
          <View style={styles.row1}>
          <View style={styles.status}>
        <Text style={{fontWeight:'bold',fontSize:18}}>{orderStatus().status}</Text>
        <Text style={{fontSize:16,fontWeight:'bold',marginTop:10,
        color:'green'}}>{orderStatus().date}</Text>
          </View>
       

          </View>
          <View style={styles.track}>
<View>
  <Text style={{fontWeight:'bold',fontSize:18,marginLeft:10}}>Track Order</Text>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
<FontAwesome name="circle" size={13} color="#600EE6"/>
<View style={{height:75,borderLeftWidth:3,borderLeftColor:orderItem.orderStatus.orderAccepted?'#600EE6':'#9E9E9E'}}>
  
</View>
<FontAwesome name="circle" size={13} color={orderItem.orderStatus.orderAccepted?'#600EE6':'#9E9E9E'}/>
<View style={{height:75,borderLeftWidth:3,borderLeftColor:orderItem.orderStatus.delivered?'#600EE6':'#9E9E9E'}}>
  
</View>
<FontAwesome name="circle" size={13} color={orderItem.orderStatus.delivered?'#600EE6':'#9E9E9E'}/>
</View >
<View style={{flex:8}}>
<View style={styles.item1}>
<Octicons  name="checklist" size={40} color="#600EE6"/>
<View style={{marginLeft:20 ,}}>
<Text numberOfLines={1} style={{fontSize:17}} >Order Placed </Text>
<Text style={{color:'#757575'}}>{orderItem.orderStatus.orderedDate}</Text>
</View>
      </View>
      <View style={styles.item1}>
<FontAwesome name="check-circle" size={40} color={orderItem.orderStatus.orderAccepted?'#600EE6':'#9E9E9E'}/>
<View style={{marginLeft:20 ,}}>
<Text numberOfLines={1} style={{fontSize:17,color:orderItem.orderStatus.orderAccepted?'black':'#757575'}} >Order Accepted</Text>
<Text style={{color:'#757575'}}>{orderItem.orderStatus.orderAcceptedDate}</Text>
</View>
</View>
<View style={styles.item1}>

<MaterialCommunityIcons  name="truck-delivery" size={40} color={orderItem.orderStatus.delivered?'#600EE6':'#9E9E9E'}/>
<View style={{marginLeft:20 ,}}>
<Text numberOfLines={1} style={{fontSize:17,color:orderItem.orderStatus.delivered?'black':'#757575'}} >Delivered</Text>
<Text style={{color:'#757575'}}>{orderItem.orderStatus.deliveredDate}</Text>
</View>
   </View>
</View>
       

   
  </View>
          
  </View>
          <View style={styles.orderItems}>
          <View style={{marginTop:10,marginLeft:10}} >
  <Text style={{fontWeight:'bold',fontSize:18,marginLeft:10}}>Order Items</Text>
</View>
        
          {orderItem.items.map((itemsItem,index)=>{
           const itemData=data.filter(item =>item.id==itemsItem.id)[0];
            return(
              
              <View key={index} style={styles.card2}>
              <View style={styles.cardImgWrapper}>
                <Image
                  source={itemData.image}
                  resizeMode="stretch"
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfo}>
      
                <Text numberOfLines={3} style={styles.cardTitle}>{itemData.title}</Text>
                
             
   
                  <View style={styles.row}>
                   
                      <Text  style={{ marginTop:10,marginLeft:2,fontSize:16, fontWeight: 'bold',}}> Rs. {itemsItem.itemAmount}</Text>
                      <Text style={{fontSize: 14, color: '#616161'
                         ,marginTop:9,marginLeft:'auto',fontWeight:'bold',marginRight:40}}>Quantity :{itemsItem.count}</Text>
                  </View>
           
               
              
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
   
       <MaterialCommunityIcons style={{paddingHorizontal:5}} name="file-document" size={25} color="#600EE6"/>
         <Text style={{marginLeft:20,fontSize:17}}>Download Invoice</Text>
         <FontAwesome style={{paddingHorizontal:5,marginLeft:'auto',marginRight:20}} name="angle-right" size={25} color="black"/>
       </View>
       </TouchableWithoutFeedback>
    
       <View style={{backgroundColor:'white',paddingVertical:10,paddingLeft:10,marginBottom:10, borderBottomColor:"#E0E0E0",
 borderBottomWidth:1,}}>
              
                  <View style={{marginLeft:10}} >
  <Text style={{fontWeight:'bold',fontSize:18,}}>Delivery Address</Text>
  <Text style={{padding:3}} >Chaitanya Nagar,H-No : 7-153/2</Text>
  <Text style={{padding:3}} >Road Number:5 , Miryalaguda</Text>
  <Text style={{padding:3}} >Telangana - 508207</Text>
  <Text style={{padding:3}} >Phone Number : 6303365901</Text>
</View>
<View>

</View>
                 
                </View>
       
       </ScrollView>
      
         </View>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetailsScreen);

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
  
  filterButton1:{
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:10,
    paddingHorizontal:20,
    paddingVertical:0,
    marginRight:'auto',
    borderColor:'#BDBDBD',
    borderWidth:1,
    height:45,
    marginLeft:20
  },
    filterButton2:{
    backgroundColor:"#600EE6",
    borderRadius:5,
    marginHorizontal:10,
    marginVertical:10,
    paddingHorizontal:30,
    paddingVertical:0,
    marginLeft:'auto',
    height:45
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
