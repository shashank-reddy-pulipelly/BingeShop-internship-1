import React,{Component} from 'react';
import { View, Text, StyleSheet,Image,ScrollView,Dimensions,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchProducts,fetchShopProductsList,fetchShops } from '../../redux/ActionCreators';
const { width, height } = Dimensions.get("window");
import { Button } from 'native-base';
import {theme} from '../../core/theme';
const mapStateToProps = state => {
    return {

      favorites: state.favorites,
      carts:state.carts,
      orders:state.orders,
      products:state.products,
      shops:state.shops
    }
  }

  const mapDispatchToProps = dispatch => ({
    fetchShops:()=>dispatch(fetchShops()),
    fetchProducts:()=>dispatch(fetchProducts()),
})

class OrdersScreen extends Component {

  componentDidMount(){ 
    this.props.fetchShops();
    this.props.fetchProducts();
  
  }
  render(){

    if(this.props.products.isLoading  ||this.props.shops.isLoading){
      return(
       <View style={ styles.horizontal}>
      
 
       <ActivityIndicator size="large" color="#600EE6" />
     </View>
      )
    }
 
    else if(this.props.products.errMess ||this.props.shops.errMess){
      return(
       <View style={[styles.horizontal]} > 
       <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
       <Text style={{fontSize:18,fontWeight:'bold'}} >{this.props.shops.errMess?this.props.shops.errMess:this.props.products.errMess } !</Text>
   </View>
      )
    }  
    else{
    var newOrders = this.props.orders.slice().reverse();
    return(
      <View style={styles.container}>
        <ScrollView>
        {newOrders.map((orderItem,index)=>{
           const shop=this.props.shops.shops.find((shop)=>shop.id==orderItem.orderDetials.shop_id);
          const itemsData=this.props.products.products.filter(item => orderItem.items.some(el => el.prod_id === item.id))
          return(
            <View key={index} style={styles.card}>
              <View style={{backgroundColor:'#fff',paddingVertical:10,
      justifyContent:'center',alignItems:'center',
      borderTopWidth:1,
      borderBottomWidth:1,marginBottom:10,
      borderColor:'#E0E0E0'}}> 
      <Text style={{fontSize:16,fontWeight:'bold'}}>Shop Name : {shop.title}</Text></View>
          <View style={styles.row1}>
          <View style={styles.status}>
        <Text style={{color:'#757575'}}>Order Status</Text>
        <Text style={{fontSize:16,fontWeight:'bold',marginTop:10}}>{orderItem.orderStatus.delivered?'Delivered , '+orderItem.orderStatus.deliveredDate:'Ordered , '+orderItem.orderStatus.orderedDate}</Text>
          </View>
          <View style={styles.amount}>
          <Text style={{color:'#757575'}}>Total ({orderItem.items.length} items)</Text>
          <Text style={{marginLeft:'auto',marginRight:10,fontSize:16,fontWeight:'bold',marginTop:10}}>Rs. {orderItem.priceDetails.total}</Text>
          </View >

          </View>
          <View style={styles.item1}>
<Image source={{uri:itemsData[0].image}}
            resizeMode="stretch"
            style={styles.cardImg} />
            <Text numberOfLines={1} style={{marginLeft:10}}>{itemsData[0].title}</Text>
          </View>
          {orderItem.items.length>=2?<View style={styles.item2}>
          <Image source={{uri:itemsData[1].image}}
            resizeMode="stretch"
            style={styles.cardImg} />
            <Text numberOfLines={1}  style={{marginLeft:10}}>{itemsData[1].title}</Text>
          </View>:null}
          
         
          <View style={styles.items}>
            {orderItem.items.length>2?<Text>+{orderItem.items.length-2} more items</Text>:null}

</View>
<View style={{backgroundColor:'white',flexDirection:'row'}}>
            <Button  style={styles.filterButton1}>
            <Text style={{fontSize:17,color:'black'}}>Need Help</Text>
          </Button>
            <Button onPress={()=>this.props.navigation.navigate('OrderDetailsScreen',{orderItem:orderItem})} style={styles.filterButton2}>
            <Text style={{fontSize:17,color:'white'}}>View Details</Text>
          </Button>
            </View>
       </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(OrdersScreen);

const styles = StyleSheet.create({
  container: {

 
    alignSelf: 'center',
    backgroundColor:"#fff",
    marginTop:10   
  },
  card:{
    
    padding:10,
    borderBottomWidth:5,
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
width:'100%'

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
  horizontal: {
    flex:1,
    justifyContent: "center",
    alignItems:'center',
    padding: 10,
    paddingBottom:50,
    backgroundColor:'#fff'
  }


});
