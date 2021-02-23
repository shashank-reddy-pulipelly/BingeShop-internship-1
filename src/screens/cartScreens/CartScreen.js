import React,{Component} from 'react';
import { View, Text, FlatList,Image, StyleSheet,SafeAreaView,
  Alert,TouchableWithoutFeedback,ActivityIndicator,LogBox,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Card from '../../components/CartCard';
import Amount from '../../components/Amount';
import TotalPrice from '../../components/TotalPrice';
import { LinearGradient } from 'expo-linear-gradient';
import {  Button,Content } from 'native-base';
import {theme} from '../../core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = state => {
    return {
      address:state.address.address,
    }
  }

  const mapDispatchToProps = dispatch => ({
    
   

})

class CartScreen extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
      carts:{isLoading:true,errMess:null,carts:[]},
      productsAvaialable:true
    }
  }
  



 async componentDidMount(){   
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']); 
  
    this.sub1=this.props.navigation.addListener('focus',async ()=>{
      if(firebase.auth().currentUser){

    
      this.quer=firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts`).on('value',async snap=>{
        if(snap.exists()){
          this.setState({productsAvaialable:true})
        }
        var val=snap.val();
        var array=[];
        for(var shop in val){
          const products=val[shop];
          var shop_name=null;
          var arr=[];
        for(var product in products){
                  
        var count=products[product];
        const query2 =   firebase.database().ref(`ShopProducts/${shop}/${product}`);
        await query2.once('value',snapShot=>{
        const value=snapShot.val();
        if(!value.available){
          this.setState({productsAvaialable:false})
        }
        shop_name=value.shop_name;
        arr.push({title:value.title,image:value.image,
          price:value.price,available:value.available,
          quantity:value.quantity,prod_id:value.prod_id,count:count})
                  })
                }
                array.push({products:arr,shop_id:shop,shop_name:shop_name})
        }
        this.setState({carts:{isLoading:false,errMess:null,carts:array}},()=>{
         
        })
        })
      }
    })
   

  


  }
  
  componentWillUnmount() {
    this.sub1();
    if(firebase.auth().currentUser){
      firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts`).off('value',this.quer);

    }
   
  }
  placeOrder=()=>{
    if(!this.props.address.number){
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
  if(!this.state.productsAvaialable){
        Alert.alert(
          "Some of Your Cart Items are Currently Unavailable",
          "Please Remove them from your Cart ",
          [
            {
              text: "Ok",
              onPress: () => {},
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }

      else{
        this.props.navigation.navigate('CartSummaryScreen')
      }
      
    
    }
  
  }

  address=()=>{
    return(
      <View>
        {this.props.address.number?      <View style={[{backgroundColor:"white",marginBottom:10,paddingVertical:14,borderBottomWidth: 1,
 borderColor:'#E0E0E0',paddingHorizontal:10}]} >
      <View style={{marginHorizontal:20}}>
      <Text style={{fontWeight:'bold',fontSize:18,}}>Delivery Address</Text>
        <Text style={{padding:3}}>{this.props.address.name}</Text>
      <Text numberOfLines={1} style={{padding:3}}>{this.props.address.roadNo} , {this.props.address.houseNo} </Text>
      <Text style={{padding:3}}>{this.props.address.city} , {this.props.address.state} - {this.props.address.pinCode} </Text>
      <Text style={{padding:3}}>Phone Number : {this.props.address.number}</Text>
      </View>
      <View style={{paddingTop:10}}>
      <TouchableOpacity activeOpacity={.9}
  style={styles.signIn}
  onPress={() => {this.props.navigation.navigate('AddressScreen')}}
>
<LinearGradient
  colors={['#448AFF','#0000d6']}
  style={styles.signIn}
>
  <Text style={[styles.textSign, {
      color:'#fff'
  }]}>Change Address</Text>
</LinearGradient>
</TouchableOpacity>
      
    </View>
    </View>:

 <View style={[{backgroundColor:"white",marginBottom:10,paddingVertical:14,borderBottomWidth: 1,
 borderColor:'#E0E0E0',paddingHorizontal:10}]}>
     <TouchableOpacity activeOpacity={.9}
  style={styles.signIn}
  onPress={() => {this.props.navigation.navigate('AddressScreen')}}
>
<LinearGradient
  colors={['#448AFF','#0000d6']}
  style={styles.signIn}
>
  <Text style={[styles.textSign, {
      color:'#fff'
  }]}>Add Address</Text>
</LinearGradient>
</TouchableOpacity>

        </View>}
       
  
   
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
        <Text style={{marginRight:'auto'}}> Price ( {shopList.products.length} items)</Text>
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


    if(this.state.carts.isLoading ){
      return(
       <View style={[styles.container, styles.horizontal]}>
      
 
       <ActivityIndicator size="large" color="#600EE6" />
     </View>
      )
    }
 
    else if(this.state.carts.errMess ){
      return(
       <View style={[styles.horizontal]} > 
       <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
       <Text style={{fontSize:18,fontWeight:'bold'}} >something went wrong !</Text>
   </View>
      )
    }
    else{
    if(!this.state.carts.isLoading && this.state.carts.carts.length==0){
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
   else{
    return(
      <SafeAreaView style={styles.container} >
   <ScrollView  >
    {this.address()}
    {this.state.carts.carts.map((item2,index)=>{

 


 const renderItem=({item})=>{
 
 
 
   return(
     <Card 
               itemData={item} shopId={item2.shop_id}
               onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:item.prod_id,shopId:item2.shop_id})}
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
      <Text style={{fontSize:16,fontWeight:'bold'}}>Shop Name : {item2.shop_name}</Text></View>}
      ListFooterComponent={()=>this.priceDetail(item2)}
  />
        </View>
      )
    })}
  
   
     
        
     </ScrollView>
         <View style={{flexDirection:'row',backgroundColor:"white",bottom:0,  borderTopColor:"#E0E0E0",
    borderTopWidth:1.5,
        }}>
  <View style={{flex:1.1,justifyContent:'center'}}>
  <View >
               <Text style={{fontSize:20,paddingLeft:15 ,fontWeight: 'bold',}}>Total : {'\u20B9'} <TotalPrice carts={this.state.carts.carts} /> </Text>
               <Text style={{color:'#09af00',fontSize:12,paddingLeft:20}}>      {'\u20B9'} 100   Savings  </Text>
             </View>
    </View>

    <View style={{flex:1,paddingVertical:5}}>
          <Button onPress={()=>{
        
            this.placeOrder();
            }} style={{backgroundColor:"#FF3D00",borderRadius:0,marginHorizontal:10,marginVertical:5,paddingHorizontal:0,paddingVertical:3,marginLeft:'auto'}}>
            <Text style={{padding:0,margin:0,fontSize:17,marginHorizontal:35,color:'white'}}>Place Order</Text>
          </Button>
      
    </View>
 
  </View>

    </SafeAreaView>

    )
  }
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
  },
  signIn: {
    width: '100%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal:10,
  
  
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
 
});
