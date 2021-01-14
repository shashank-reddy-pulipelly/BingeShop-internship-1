import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,ScrollView,TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { postFavorite, deleteFavorite,postCart } from '../../redux/ActionCreators';
import Toast from 'react-native-tiny-toast';
import { Button } from 'native-base';

import {theme} from '../../core/theme';
const { width, height } = Dimensions.get("window");
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const MAX_HEIGHT = 350;



const mapStateToProps = state => {
  return {
 
    favorites: state.favorites,
    carts:state.carts,

  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (ItemId) => dispatch(postFavorite(ItemId)),
  deleteFavorite: (ItemId) => dispatch(deleteFavorite(ItemId)),
  postCart: (ItemId) => dispatch(postCart(ItemId)),
})
class  CardItemDetails extends Component {

   itemData = this.props.route.params.itemData;
   shopId=this.props.route.params.shopId;
 constructor(props) {
   super(props)
 
   this.state = {
    isFavorite:this.props.favorites.some(el => el.prod_id == this.itemData.id && el.shop_id==this.shopId)
 }
 }
 toggleFavorite=()=>{
  
  if(this.state.isFavorite){
   this.setState({isFavorite:!this.state.isFavorite},()=>{
     this.props.deleteFavorite({prod_id:this.itemData.id,shop_id:this.shopId});
   });
 
  }
  else{
   this.setState({isFavorite:!this.state.isFavorite},()=>{
     this.props.postFavorite({prod_id:this.itemData.id,shop_id:this.shopId});
   });

  }
}
  
  render(){
    return(
<SafeAreaView style={styles.container} >
    <ScrollView >
 
    <View  style={styles.favorite}>
  <Icon  name={this.state.isFavorite?'heart':'heart-o'} size={30}
                       color='red' onPress={() =>this.toggleFavorite()}/>
  </View>
  
  <View style={styles.section}>
  <Image style={styles.image}  source={{uri:this.itemData.image}} />
   <Text style={styles.title}>{this.itemData.title}</Text>

   <View style={styles.ratings}>
              <View style={styles.star}>
<Text style={{color:'white',paddingLeft:10}}>ff</Text>
<View style={{paddingRight:10,paddingLeft:5}}>
<Icon name="star"  size={14} color="#fff" />
</View>

              </View>
              <View style={styles.reviews}>
                <Text style={{ fontSize: 14,
    color: '#444',}}>({this.itemData.reviews}) </Text>
              </View>
             
            </View>


            <View style={styles.row}>
                <Text style={{fontSize:22,paddingVertical:0,marginTop:10}}>{'\u20B9'}</Text>
                
                <Text style={{ marginTop:6,marginLeft:5,fontSize:24,}}>{this.itemData.price}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 14, color: '#444' ,marginTop:5,marginLeft:15}}>{this.itemData.price+100} </Text>
                <Text style={{fontSize: 13, color: '#09af00' ,marginTop:5,marginLeft:15}}>33% off</Text>
            </View>

            <View style={{flexDirection:'row',paddingVertical:10,overflow:'hidden'}}>
              <Text style={{fontSize:18}} >Seller :  </Text>
              <View style={{padding:4,backgroundColor:'#E8EAF6',paddingHorizontal:8,borderRadius:5,borderColor:'#7986CB',borderWidth:.5}} >
              <Text numberOfLines={1} >{this.itemData.shop_name} </Text>
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
<Text style={styles.text}>{this.itemData.description}</Text>
                  </View>
 

    </ScrollView>
  
  <View style={{backgroundColor:'white',flexDirection:'row',borderTopColor:'#EEEEEE',borderTopWidth:2}}>
            <Button onPress={()=>{Toast.show('  Item Added to Cart  Successfully  ',{
      position:-70,
      containerStyle:{
        borderRadius:10,
        paddingHorizontal:10
      }
    });
    this.props.postCart({prod_id:this.itemData.id,shop_id:this.shopId});
    this.props.navigation.navigate('CartDrawer');}} style={styles.filterButton1}>
            <Text style={{fontSize:17,color:theme.colors.primary}}>Buy Now</Text>
          </Button>
            <Button onPress={()=>{Toast.show('  Item Added to Cart  Successfully  ',{
      position:-70,
      containerStyle:{
        borderRadius:10,
        paddingHorizontal:10
      }
    });
    this.props.postCart({prod_id:this.itemData.id,shop_id:this.shopId});}} style={styles.filterButton2}>
            <Text style={{fontSize:17,color:'white'}}>Add to Cart</Text>
          </Button>
            </View>
    </SafeAreaView>
    );
  }
} 

 




export default connect(mapStateToProps,mapDispatchToProps)(CardItemDetails)

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
   
  }

});