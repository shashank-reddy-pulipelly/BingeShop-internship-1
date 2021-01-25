
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback,Modal, TextInput,TouchableHighlight, TouchableOpacity,Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Button } from 'native-base';

import { postCart,editProduct } from '../../redux/ActionCreators';
import React, { Component } from 'react';
import ModalCustom from './Modal';
import { theme } from '../../core/theme';
import {  TouchableRipple,Button as PaperButton,RadioButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get("window");
const mapStateToProps = state => {
  return {
 
    favorites: state.favorites,
    carts:state.carts,

  }
}

const mapDispatchToProps = dispatch => ({

  postCart: (ItemId) => dispatch(postCart(ItemId)),
  editProduct:(shopProductListId,productId,price,available)=>dispatch(editProduct(shopProductListId,productId,price,available))

})
 class Card extends Component {
   
     constructor(props) {
         super(props)
     
         this.state = {
           
            modalVisible:false,
            input:String(this.props.itemData.price),
            price:String(this.props.itemData.price),
            globalStatus:this.props.itemData.available,
            localStatus:this.props.itemData.available,
         }
     }
     
     modalToggle=()=>{
       this.setState({modalVisible:!this.state.modalVisible})
     }
     EditProduct=(input,status)=>{
      this.setState({globalStatus:status,
        price:input},()=>{
          this.props.editProduct('ShopListing_1',this.props.itemData.id,input,status)
        });
        this.setState({modalVisible:false})
     }
  render() {
    const {itemData, onPress}=this.props;
    return (
      <TouchableWithoutFeedback  onPress={onPress} >
          <View style={styles.product}>
      <View style={styles.cardData}>
        <View style={styles.cardImgWrapper} >
          <Image
            source={{uri:itemData.image}}
            resizeMode="stretch"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo} >
<View style={{flexDirection:'row'}}>
  <View style={{flex:1,overflow:'hidden',marginRight:10}}>
  <Text numberOfLines={1} style={styles.cardTitle}>{itemData.title}</Text>
  </View>

<Button onPress={()=>{this.setState({modalVisible:true})}} style={styles.filterButton2}>
<FontAwesome5 name='edit' color='white' size={18} /> 
            <Text style={{fontSize:14,color:'white',paddingLeft:10}}>Edit </Text>
          </Button>
</View>
        
          
       

            <View style={{flexDirection:'row',paddingVertical:10}}>
              <View style={{alignItems:'center',flex:.8}}>
<Text style={{fontWeight:'bold',fontSize:14}} >Quantity </Text>
<Text>{itemData.quantity} </Text>
              </View>
              <View style={{alignItems:'center',flex:1.5}} >
<Text style={{fontWeight:'bold',fontSize:14}} >Status </Text>
{this.state.globalStatus==true?<View style={{backgroundColor:'#09af00',paddingHorizontal:10,paddingVertical:2,borderRadius:40}}>
<Text style={{color:'#fff',fontSize:13}}>Available</Text>
</View>:<View style={{backgroundColor:'red',paddingHorizontal:10,paddingVertical:2,borderRadius:40}}>
<Text style={{color:'#fff',fontSize:13,textAlign:'center'}}>Not Available</Text>
</View>}


          </View> 
              <View style={{alignItems:'center',flex:1}}>
                <Text style={{fontWeight:'bold',fontSize:14}}>Price</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:16,paddingTop:2,alignSelf:'center'}}>{'\u20B9'} </Text>
                <Text style={{ marginTop:0,marginLeft:0,fontSize:17, fontWeight: 'bold',}}>{this.state.price}</Text>
                </View>
                
              </View>
       
                

            </View>
          
         
         
        </View>
        
     
      </View>

            <Modal animationType="fade" 
                   transparent visible={this.state.modalVisible}  
                   presentationStyle="overFullScreen"
                   onRequestClose={() => {
                    this.setState({modalVisible:false});
                  }} 
               > 
               <ModalCustom price={this.state.price} globalStatus={this.state.globalStatus} modalToggle={this.modalToggle} EditProduct={this.EditProduct} />
            </Modal> 
        
            
      </View>

      
    </TouchableWithoutFeedback>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card);


const styles = StyleSheet.create({
  cardData: {
 
   padding:10,
   paddingBottom:10,
    flexDirection: 'row',
    paddingTop:5,
flex:1,

marginHorizontal:0,
  overflow:'hidden',
  backgroundColor:'white',
  borderBottomWidth:1,
  borderBottomColor:'#E0E0E0'
  },
  cardImgWrapper: {
    flex: 1,
    alignSelf: 'center',

   
  },
  cardImg: {
 
    width: width*.11,
 height:70,
resizeMode:'stretch'

  },
  cardInfo: {
    flex: 8,
    padding: 10,
    paddingBottom:1,
paddingLeft:20


  },
  cardTitle: {
   
    fontSize:16,
    fontWeight:'bold'
  },
  row:{
    flexDirection: 'row',
   alignItems:'center',
  
  },

    filterButton2:{
    backgroundColor:theme.colors.primary,
    borderRadius:5,
    marginRight:0,
    marginVertical:0,
    paddingHorizontal:10,
 
    marginLeft:'auto',
    height:32,
    
  },
  product:{

      borderRadius:0,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 0, y: 2 },
      elevation:10,
      backgroundColor:'white',
      overflow:'hidden',
   marginBottom:1
  },

 
viewWrapper: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
}, 
modalView: { 
 
  margin: 0,
  backgroundColor: "white",
  borderRadius: 10,
  padding: 10,
  width:width*.9


}, 
textInput: { 
    width: "80%", 
    borderRadius: 5, 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderBottomColor:theme.colors.primary, 
    borderBottomWidth: 2, 
    marginBottom: 20, 
    fontSize:18,
    marginLeft:20
}, 
});