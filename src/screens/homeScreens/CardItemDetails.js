import React, {useRef,memo,Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,ScrollView,TouchableWithoutFeedback,TouchableOpacity,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { postFavorite, deleteFavorite } from '../../redux/ActionCreators';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const MAX_HEIGHT = 350;



const mapStateToProps = state => {
  return {
 
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (ItemId) => dispatch(postFavorite(ItemId)),
  deleteFavorite: (ItemId) => dispatch(deleteFavorite(ItemId))
})
class  CardItemDetails extends Component {

   itemData = this.props.route.params.itemData;
 
  
  render(){
    return(
<SafeAreaView style={styles.container} >
    <ScrollView >
   <View style={styles.favorite}>
   <Icon  name={this.props.favorites.some(el => el === this.itemData.id)?'heart':'heart-o'} size={25}
                        color='red' onPress={() => this.props.favorites.some(el => el === this.itemData.id)?
                          this.props.deleteFavorite(this.itemData.id): this.props.postFavorite(this.itemData.id)}/>
   </View>
  
  <View style={styles.section}>
  <Image style={styles.image}  source={this.itemData.image} />
   <Text style={styles.title}>{this.itemData.title}</Text>

   <View style={styles.ratings}>
              <View style={styles.star}>
<Text style={{color:'white',paddingLeft:10}}>{this.itemData.rating}</Text>
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
                <Text style={{fontSize:30,padding:0,paddingVertical:0,margin:0}}>{'\u20B9'}</Text>
                
                <Text style={{ marginTop:6,marginLeft:5,fontSize:24,}}>{this.itemData.amount}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 14, color: '#444' ,marginTop:5,marginLeft:15}}>{this.itemData.amount+100} </Text>
                <Text style={{fontSize: 13, color: '#09af00' ,marginTop:5,marginLeft:15}}>33% off</Text>
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
    <View style={{flexDirection:'row',bottom:0}}>
  <View style={{flex:1}}>
    <Button  buttonStyle={{backgroundColor:"#E0E0E0",borderRadius:0,paddingVertical:13,}}
  titleStyle={{fontSize:17,color:"black"}}
  title="Buy Now"/>    
    </View>

    <View style={{flex:1}}>
    <Button buttonStyle={{backgroundColor:"#600EE6",borderRadius:0,paddingVertical:13}}
  titleStyle={{fontSize:17}}
  title="Add to Cart"/>          
    </View>
 
  </View>
    </SafeAreaView>
    );
  }
} 

 


const {height} = Dimensions.get("screen");
const {weight} = Dimensions.get("screen");

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
  }

});