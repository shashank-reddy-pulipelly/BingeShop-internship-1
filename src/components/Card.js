
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { postCart, postFavorite, deleteFavorite, } from '../redux/ActionCreators';
import React, { Component } from 'react';
import Toast from 'react-native-tiny-toast';
import { theme } from '../core/theme';
const mapStateToProps = state => {
  return {
 
    favorites: state.favorites,
    carts:state.carts,
    
  }
}

const mapDispatchToProps = dispatch => ({

  postCart: (Item) => dispatch(postCart(Item)),
  postFavorite: (ItemId) => dispatch(postFavorite(ItemId)),
  deleteFavorite: (ItemId) => dispatch(deleteFavorite(ItemId)),
})
 class Card extends Component {


   constructor(props) {
     super(props)
   
     this.state = {
        isFavorite:this.props.favorites.some(el => el.prod_id == this.props.itemData.id && el.shop_id==this.props.shopId)
     }
   }

   toggleFavorite=()=>{
  
     if(this.state.isFavorite){
      this.setState({isFavorite:!this.state.isFavorite},()=>{
        this.props.deleteFavorite({prod_id:this.props.itemData.id,shop_id:this.props.shopId});
      });
    
     }
     else{
      this.setState({isFavorite:!this.state.isFavorite},()=>{
        this.props.postFavorite({prod_id:this.props.itemData.id,shop_id:this.props.shopId});
      });

     }
   }
   
  render() {
    const {itemData, onPress}=this.props;
    
    return (
      <TouchableOpacity activeOpacity={.8} style={{backgroundColor:'#EEEEEE'}} onPress={onPress}>
      <View style={styles.card}>
      <View  style={styles.favorite}>
  <Icon  name={this.state.isFavorite?'heart':'heart-o'} size={27}
                       color='red' onPress={() =>this.toggleFavorite()}/>
  </View>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{uri:itemData.image}}
            resizeMode="stretch"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>

          <Text style={styles.cardTitle}>{itemData.title}</Text>
          
       

            <View style={styles.row}>
                <Text style={{fontSize:18,padding:0,paddingVertical:0,margin:0,paddingTop:8,alignSelf:'center'}}>{'\u20B9'} </Text>
                <Text style={{ marginTop:6,marginLeft:2,fontSize:19, fontWeight: 'bold',}}>{itemData.price}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 13, color: '#444' ,marginTop:9,marginLeft:10}}>{itemData.price+100} </Text>
                <Text style={{fontSize: 13, color: '#09af00' ,marginTop:9,marginLeft:10}}>33% off</Text>
            </View>
            <View style={{flexDirection:'row',paddingVertical:5,overflow:'hidden'}}>
              <Text style={{fontSize:15}} >Shop :  </Text>
              <View style={{padding:4,backgroundColor:'#E8EAF6',paddingHorizontal:8,borderRadius:5,borderColor:'#7986CB',borderWidth:.5}} >
              <Text numberOfLines={1} >{itemData.shop_name} </Text>
              </View>
       
            </View>
           
         

            <View style={{flexDirection:'row',alignItems:'center',paddingVertical:0}}>
         
              <View style={styles.ratings}>
              <View style={styles.star}>
<Text style={{color:'white',paddingLeft:10}}>5</Text>
<View style={{paddingRight:10,paddingLeft:5}}>
<Icon name="star"  size={12} color="#fff" />
</View>

              </View>
             
           
            </View>
        
            <Button buttonStyle={{marginVertical:10,marginLeft:'auto',paddingVertical:10,paddingHorizontal:15,backgroundColor:theme.colors.primary,flex:1}}  
  titleStyle={{fontSize:15}} onPress={()=>{
    Toast.show('  Item Added to Cart  Successfully  ',{
      position:-20,
      containerStyle:{
        borderRadius:5,
        paddingHorizontal:10
      }
    });
    this.props.postCart({prod_id:itemData.id,shop_id:this.props.shopId})}
  }
                title="Add to Cart"/>
            </View>
        
        </View>
      </View>
    </TouchableOpacity>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);


const styles = StyleSheet.create({
  card: {
 
   padding:10,
   paddingBottom:0,
    flexDirection: 'row',
 borderBottomColor:"#E0E0E0",
borderBottomWidth:2,
backgroundColor:"#fff",
marginBottom:10

   
  },
  cardImgWrapper: {
    flex: 1,
    alignSelf: 'center',
  },
  cardImg: {
    height: 160,
    width: 110,
resizeMode:'stretch'

  },
  cardInfo: {
    flex: 2,
    padding: 15,
    paddingBottom:1,


    backgroundColor: '#fff',
  },
  cardTitle: {
   
    fontSize:16
  },

  ratings:{
    flexDirection: 'row',
    marginTop:0,
    flex:1
  },
  star:{
   
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
    flex:2,
   
  },
  row:{
    flexDirection: 'row',
   alignItems:'center',
   paddingBottom:5
  },
  favorite:{
    backgroundColor:"#E0E0E0",
    width:45,
    height:45,
    position:'absolute',
    right:20,
    top:10,
    zIndex:5,

    alignItems:'center',
    borderRadius:50,
    justifyContent:'center'
  }
});