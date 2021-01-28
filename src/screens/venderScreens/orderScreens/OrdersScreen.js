import React,{Component} from 'react';
import { View, Text, StyleSheet,ScrollView,ActivityIndicator,Dimensions,Platform,TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");
import * as firebase from 'firebase';
import {theme} from '../../../core/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



  

class VendorOrdersScreen extends Component {
constructor(props) {
  super(props)

  this.state = {
     orders:{isLoading:true,errMess:null,orders:[]}
  }
}

componentDidMount(){
  
  const query = firebase.database().ref('Orders').orderByChild('orderDetials/shop_id').equalTo('Shop_1')
  query.on('value', (snapshot) => {
    
   const orders = snapshot.val();
   
   const loadedOrders=[];
   for(const key in orders){
      loadedOrders.push(orders[key]);
   }
   this.setState({orders:{isLoading:false,errMess:null,orders:loadedOrders}})
 })
}
  render(){
    
    if(this.state.orders.isLoading){
      return(    <View style={[styles.container2, styles.horizontal]}>
          
     
        <ActivityIndicator size="large" color="#600EE6" />
      </View>)
  
    }
else if(this.state.orders.errMess){
  return(
    <View style={[styles.horizontal]} > 
    <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
    <Text style={{fontSize:18,fontWeight:'bold'}} > something went wrong !</Text>
</View>
  )
}
else{
  let TouchableCmp=TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21){
      TouchableCmp=TouchableNativeFeedback;
    }
    const orderStatus=(orderItem)=>{
      if(orderItem.orderStatus.delivered){
       return({status:'Delivered',date:orderItem.orderStatus.deliveredDate})
      }
      else if(orderItem.orderStatus.orderAccepted){
        return({status:'Ordered Accepted',date:orderItem.orderStatus.orderAcceptedDate})
      }
      if(orderItem.orderStatus.ordered){
        return({status:'Order Pending',date:orderItem.orderStatus.orderedDate})
      }
    }

    
    return(
      <View style={styles.container}>
        <ScrollView>
        {this.state.orders.orders.slice().reverse().map((orderItem,index)=>{

          return(
            <TouchableCmp onPress={()=>this.props.navigation.navigate('VendorOrderDetailsScreen',{orderItem:orderItem})} activeOpacity={.5} key={index} >
              <View style={styles.card}>
          <View style={styles.row1}>
          <View style={styles.status}>
          <Text style={orderItem.orderStatus.delivered?{fontSize:17,fontWeight:'bold',color:'black'}:{fontSize:17,color:'#FF8F00',fontWeight:'bold'}} >{orderStatus(orderItem).status} , {orderStatus(orderItem).date}</Text>
    <View>
      <Text numberOfLines={1} style={{color:'#757575',marginRight:30,paddingVertical:10}} >Name: {orderItem.address.name}  , No. : {orderItem.address.number}</Text>
    </View>
    
          </View>
          <FontAwesome name="angle-right" color='black' size={25} style={{marginRight:10}} />

          </View>
          </View>
       </TouchableCmp>
          )
        })}
       
       <View style={{borderBottomWidth:5,borderBottomColor:'#E0E0E0',width:width}}>

       
      <Text style={{color:'#757575',fontSize:15,alignSelf:'center',paddingVertical:10,}}>No more Orders</Text>
      </View>
      </ScrollView>
         </View>
    )
}
    
  }
}

export default VendorOrdersScreen;

const styles = StyleSheet.create({
  container: {

 
    alignSelf: 'center',
    backgroundColor:"#fff",
    marginTop:10   
  },
  card:{
    
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#E0E0E0',
  },
  cardImg: {
    height: 50,
    width: 40,
resizeMode:'stretch',
margin:10,


  },
  row1:{
flexDirection:'row',
width:'100%',
alignItems:'center'

  },
  status:{
paddingLeft:10,
marginRight:'auto',
paddingVertical:10
  },
  amount:{
    paddingRight:10,
  },
  item1:{
flexDirection:'row',
alignItems:'center',
borderBottomWidth:1,
borderBottomColor:'#EEEEEE',
overflow:'hidden',
marginRight:20

  },
  item2:{
    flexDirection:'row',
    alignItems:'center',
borderBottomWidth:1,
borderBottomColor:'#EEEEEE',
overflow:'hidden',
marginRight:20
  },
  items:{
    alignItems:'center',
    paddingVertical:10
  },
  
  filterButton1:{
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:10,
    paddingHorizontal:20,
    paddingVertical:0,
    marginRight:'auto',
    borderColor:theme.colors.primary,
    borderWidth:1,
    height:45,
    marginLeft:20
  },
    filterButton2:{
    backgroundColor:theme.colors.primary,
    borderRadius:5,
    marginHorizontal:10,
    marginVertical:10,
    paddingHorizontal:30,
    paddingVertical:0,
    marginLeft:'auto',
    height:45
  },
  container2: {
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
