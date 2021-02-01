import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,ScrollView,TouchableOpacity,
  Platform,ActivityIndicator,LogBox
} from 'react-native';
import * as firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Toast from 'react-native-tiny-toast';
import { Button } from 'native-base';

import {theme} from '../../core/theme';
const { width, height } = Dimensions.get("window");
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const MAX_HEIGHT = 350;

class  CardItemDetails extends Component {


 
 constructor(props) {
   super(props)
 
   this.state = {
    isFavorite:false,
    item:{isLoading:true,errMess:null,item:null}
 }
 }
 postCart=(prod_id,shop_id)=>{
if(firebase.auth().currentUser){


  firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}`).once('value',snapShot=>{
    if(snapShot.exists()){
      firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).once('value',snap=>{
        if(snap.exists()){
          firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(snap.val()+1),(error)=>{
            if(!error){
              Toast.show('  Item Added to Cart  Successfully  ',{
                position:-72,
                containerStyle:{
                  borderRadius:0,
                  paddingHorizontal:0,
                  width:'100%'
                }
              })
            }
            else{
       
              console.log('cart adding error',error);
            }
          })
        }
        else{
          firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(1),(error)=>{
            if(!error){
              Toast.show('  Item Added to Cart  Successfully  ',{
                position:-70,
                containerStyle:{
                  borderRadius:0,
                  paddingHorizontal:0,
                  width:'100%'
                }
              })
            
            }
            else{
              console.log('cart adding error',error);
            }
          })
        }
      })
    }
    else{
      firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(1),(error)=>{
        if(error){
          console.log('cart adding error',error);
        }
        else{
          Toast.show('  Item Added to Cart  Successfully  ',{
            position:-70,
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
}
   toggleFavorite=()=>{
    LogBox.ignoreAllLogs();
    if(firebase.auth().currentUser){

  
     if(this.state.isFavorite){
      this.setState({isFavorite:!this.state.isFavorite},()=>{

        firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).orderByChild('prod_id').equalTo(this.props.route.params.itemData).once('value',snapShot=>{
         var key=null;
         var val=snapShot.val();
         for(const pro in val){
           key=pro;
         }

         
        
          var a=snapShot.exists();
      
          if(a){
           
            firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites/${key}`).remove();
          }
        })
      });
    
     }
     else{
      this.setState({isFavorite:!this.state.isFavorite},()=>{
        firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).push({prod_id:this.props.route.params.itemData,shop_id:this.props.route.params.shopId})
 
      });

     }
    }
   }
   componentDidMount(){
    LogBox.ignoreAllLogs();
    if(firebase.auth().currentUser){


     firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).orderByChild('prod_id').equalTo(this.props.route.params.itemData).once('value',snapShot=>{
       var a=snapShot.exists();
       this.setState({isFavorite:a})
     })
   this.sub1=  firebase.database().ref(`ShopProducts/${this.props.route.params.shopId}/${this.props.route.params.itemData}`).on('value',snap=>{
      const val=snap.val();
     
    this.setState({item:{isLoading:false,errMess:null,item:val}})
        })
      }
   }
   componentWillUnmount(){
    firebase.database().ref(`ShopProducts/${this.props.route.params.shopId}/${this.props.route.params.itemData}`).off('value',this.sub1)
   }
  
  render(){
    
      if(this.state.item.isLoading){
return(
  <View style={[styles.container2, styles.horizontal]}>
          
     
           <ActivityIndicator size="large" color="#600EE6" />
         </View>
)
      }
      else if(this.state.item.errMess){
return(
  <View style={[styles.horizontal]} > 
           <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
           <Text style={{fontSize:18,fontWeight:'bold'}} >something went wrong !</Text>
       </View>
)
      }
      else{
return(
<SafeAreaView style={styles.container} >
    <ScrollView >
 
    <View  style={styles.favorite}>
  <Icon  name={this.state.isFavorite?'heart':'heart-o'} size={30}
                       color='red' onPress={() =>this.toggleFavorite()}/>
  </View>
  
  <View style={styles.section}>
  <Image style={styles.image}  source={{uri:this.state.item.item.image}} />
   <Text style={styles.title}>{this.state.item.item.title}</Text>

   <View style={styles.ratings}>
              <View style={styles.star}>
<Text style={{color:'white',paddingLeft:10}}>5</Text>
<View style={{paddingRight:10,paddingLeft:5}}>
<Icon name="star"  size={14} color="#fff" />
</View>

              </View>
             
             
            </View>


            <View style={styles.row}>
                <Text style={{fontSize:22,paddingVertical:0,marginTop:10}}>{'\u20B9'}</Text>
                
                <Text style={{ marginTop:6,marginLeft:5,fontSize:24,fontWeight:'bold'}}>{this.state.item.item.price}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 14, color: '#444' ,marginTop:5,marginLeft:15}}>{this.state.item.item.price+100} </Text>
                <Text style={{fontSize: 13, color: '#09af00' ,marginTop:5,marginLeft:15}}>33% off</Text>
            </View>

            <View style={{flexDirection:'row',paddingVertical:10,overflow:'hidden'}}>
              <Text style={{fontSize:18}} >Seller :  </Text>
              <View style={{padding:4,backgroundColor:'#E8EAF6',paddingHorizontal:8,borderRadius:5,borderColor:'#7986CB',borderWidth:.5}} >
              <Text numberOfLines={1} >{this.state.item.item.shop_name} </Text>
              </View>
       
            </View>
    </View>   
              <View style={[styles.section,styles.heading]}>
<Text style={[styles.heading,styles.title]}>Available Offers</Text>
<TouchableOpacity>
<View style={{ flexDirection: 'row',alignItems:"center"}}>
  <Text style={[styles.text,{flex:19,paddingRight:0}]}>10% off on Federal Bank Debit Cards, up to ₹1000. On orders of ₹1500 and above</Text>
<FontAwesome style={{flex:1,paddingLeft:20}} name="angle-right"  size={25} />
</View>
</TouchableOpacity>
<TouchableOpacity>
<View style={{ flexDirection: 'row',alignItems:"center"}}>
  <Text style={[styles.text,{flex:19,paddingRight:0}]}>Bank Offer Flat 5000 Instant Discount with American Express Cards</Text>
<FontAwesome style={{flex:1,paddingLeft:20}} name="angle-right"  size={25} />
</View>
</TouchableOpacity>

<TouchableOpacity>
<View style={{ flexDirection: 'row',alignItems:"center"}}>
  <Text style={[styles.text,{flex:19,paddingRight:0}]}>10% off* with Axis Bank Buzz Credit Card</Text>
<FontAwesome style={{flex:1,paddingLeft:20}} name="angle-right"  size={25} />
</View>
</TouchableOpacity>


       </View>
      <View style={styles.section}>
<Text style={styles.title}>Description</Text>
<Text style={styles.text}>{this.state.item.item.description}</Text>
                  </View>
 

    </ScrollView>
  
    {this.state.item.item.available?<View style={{backgroundColor:'white',borderTopColor:'#EEEEEE',borderTopWidth:2,flexDirection:'row'}}>
  <Button onPress={()=>{
    this.postCart(this.props.route.params.itemData,this.props.route.params.shopId);
    this.props.navigation.navigate('CartDrawer');}} style={styles.filterButton1}>
            <Text style={{fontSize:17,color:theme.colors.primary}}>Buy Now</Text>
          </Button>
            <Button onPress={()=>{

    this.postCart(this.props.route.params.itemData,this.props.route.params.shopId);}} style={styles.filterButton2}>
            <Text style={{fontSize:17,color:'white'}}>Add to Cart</Text>
          </Button>
    
         
            </View>:<View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Text style={{paddingVertical:10,fontSize:19,fontWeight:'bold',color:'red'}}>Currently UnAvailable </Text>
            </View>}
  
    </SafeAreaView>
)
      }

   
  }
} 


export default CardItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
   flexDirection:'column',
   
  },
  image: {
    height: height*.5,
    width: Dimensions.get('window').width*.7,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginVertical:20
  },
  section:{
    paddingHorizontal:20,
    paddingVertical:20,
    borderBottomWidth:1,
    borderBottomColor:"#E0E0E0"
  },
  title: {
    fontSize: 17,
  },
  ratings:{
    flexDirection: 'row',
    marginTop:10
  },
  star:{
    
    backgroundColor:"#09af00",
    marginRight:20,
   height:26,
  
    justifyContent:'center',
    alignItems:"center",
    flexDirection: 'row',
    borderRadius:3,
    paddingHorizontal:2,
   
   
  
  },
  heading:{
    paddingBottom:10,
   
  },
  row:{
    flexDirection: 'row',
    marginTop:4,
    alignItems:"center",
  
  },
  reviews: {
    
   
  },
  name: {
    fontWeight: 'bold',
  },
  text:{
  fontSize:15,
  paddingVertical:5
  },
  favorite:{
    backgroundColor:"#E0E0E0",
    width:50,
    height:50,
    position:'absolute',
    right:20,
    top:10,
    zIndex:5,

    alignItems:'center',
    borderRadius:50,
    justifyContent:'center'
  },
  filterButton1:{
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:10,
    paddingHorizontal:30,
    paddingVertical:0,
    marginRight:'auto',
    borderColor:theme.colors.primary,
    borderWidth:1,
    height:50,
    marginLeft:20
  },
    filterButton2:{
    backgroundColor:theme.colors.primary,
    borderRadius:5,
    marginRight:20,
    marginVertical:10,
    paddingHorizontal:30,
    paddingVertical:0,
    marginLeft:'auto',
    height:50,
   
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