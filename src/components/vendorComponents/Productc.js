
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback,Modal, TextInput,TouchableHighlight, TouchableOpacity,Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Button } from 'native-base';

import { postCart } from '../../redux/ActionCreators';
import React, { Component } from 'react';
import Toast from 'react-native-tiny-toast';
import { theme } from '../../core/theme';
import {  TouchableRipple,Button as PaperButton,RadioButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get("window");
const mapStateToProps = state => {
  return {
 
    favorites: state.favorites,
    carts:state.carts
  }
}

const mapDispatchToProps = dispatch => ({

  postCart: (ItemId) => dispatch(postCart(ItemId)),
})
 class Card extends Component {
   globalStatus=true;
     constructor(props) {
         super(props)
     
         this.state = {
            EditStatusModalVisible:false,
            EditPriceModalVisible:false,
            input:String(this.props.itemData.amount),
         
      
            localStatus:this.globalStatus,
         }
     }
     
  render() {
    const {itemData, onPress}=this.props;
    return (
      <TouchableWithoutFeedback  onPress={onPress}>
          <View style={styles.product}>
      <View style={styles.cardData}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={itemData.image}
            resizeMode="stretch"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>

          <Text style={styles.cardTitle}>{itemData.title}</Text>
          
       

            <View style={styles.row}>
                <Text style={{fontSize:18,padding:0,paddingVertical:0,margin:0,paddingTop:8,alignSelf:'center'}}>{'\u20B9'} </Text>
                <Text style={{ marginTop:6,marginLeft:2,fontSize:20, fontWeight: 'bold',}}>{itemData.amount}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 13, color: '#444' ,marginTop:9,marginLeft:10}}>{itemData.amount+100} </Text>
                <Text style={{fontSize: 13, color: '#09af00' ,marginTop:9,marginLeft:10}}>33% off</Text>
            </View>
          
          <View style={styles.row}>
<Text>Quantity : {itemData.quantity} </Text>
          </View>
          <View style={[styles.row,{paddingVertical:5}]}>
<Text style={{fontSize:16}}>Status :  </Text>
{this.globalStatus==true?<View style={{backgroundColor:'#09af00',paddingHorizontal:15,paddingVertical:2,borderRadius:5}}>
<Text style={{color:'#fff'}}>Available</Text>
</View>:<View style={{backgroundColor:'red',paddingHorizontal:15,paddingVertical:2,borderRadius:5}}>
<Text style={{color:'#fff'}}>Not-Available</Text>
</View>}


          </View>
         
        </View>
        
     
      </View>
      <View style={{flexDirection:'row',padding:5}}>
            <Button onPress={()=>{this.setState({EditStatusModalVisible:true})}} style={styles.filterButton1}>
            <Text style={{fontSize:17,color:theme.colors.primary}}>Edit Status</Text>
          </Button>
            <Button onPress={()=>{this.setState({EditPriceModalVisible:true})}} style={styles.filterButton2}>
            <Text style={{fontSize:17,color:'white'}}>Edit Price</Text>
          </Button>
            </View>
            <Modal animationType="fade" 
                   transparent visible={this.state.EditPriceModalVisible}  
                   presentationStyle="overFullScreen"
                   onRequestClose={() => {
                    this.setState({EditPriceModalVisible:false});
                  }} 
               > 
                <View style={styles.viewWrapper}> 
                    <View style={styles.modalView}> 
                    <View style={{paddingVertical:20,marginLeft:20}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}} >Edit Product Price </Text>
                    </View>
                   
                        <TextInput placeholder="Enter Price" keyboardType='numeric'
                                   value={this.state.input} style={styles.textInput}  
                                   onChangeText={(value) =>   this.setState({input:value})} /> 
  
          <View style={{flexDirection:'row',paddingTop:15,paddingBottom:10,marginLeft:'auto',marginRight:10}}>
          <PaperButton mode="text" labelStyle={{fontSize:16}} onPress={()=>{this.setState({EditPriceModalVisible:false})}}>Cancel </PaperButton>
          <PaperButton mode="text"labelStyle={{fontSize:16}} onPress={()=>{this.setState({EditPriceModalVisible:false})}}> Confirm </PaperButton>
              </View>           
  
                    </View> 
                </View> 
            </Modal> 
            <Modal animationType="fade" 
                   transparent visible={this.state.EditStatusModalVisible}  
                   presentationStyle="overFullScreen" 
                   onRequestClose={() => {
                    this.setState({EditStatusModalVisible:false})
                  }}
               > 
                <View style={styles.viewWrapper}> 
                    <View style={styles.modalView}> 
                    <View style={{paddingTop:20,marginLeft:20,paddingBottom:10}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}} >Edit Product Status </Text>
                    </View>
                   
                    <RadioButton.Group onValueChange={value => this.setState({localStatus:value})} value={this.state.localStatus}>
      <RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Available" value={true} />
      <RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Not Available" value={false} />

      
    </RadioButton.Group>
  
          <View style={{flexDirection:'row',paddingTop:15,paddingBottom:20,marginLeft:'auto',marginRight:10}}>
          <PaperButton mode="text" labelStyle={{fontSize:16}} onPress={()=>{this.setState({EditStatusModalVisible:false})}}>Cancel </PaperButton>
          <PaperButton mode="text"labelStyle={{fontSize:16}} onPress={()=>{this.setState({EditStatusModalVisible:false})}}> Confirm </PaperButton>
              </View>           
  
                    </View> 
                </View> 
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
 
    width: width*.27,
 height:140,
resizeMode:'stretch'

  },
  cardInfo: {
    flex: 2,
    padding: 10,
    paddingBottom:1,
paddingLeft:20


  },
  cardTitle: {
   
    fontSize:16
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
   paddingBottom:5
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
    height:44,
    marginLeft:20
  },
    filterButton2:{
    backgroundColor:theme.colors.primary,
    borderRadius:5,
    marginRight:20,
    marginVertical:10,
    paddingHorizontal:20,
    paddingVertical:0,
    marginLeft:'auto',
    height:45
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
   marginBottom:15
  },

  screen: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#fff", 
}, 
viewWrapper: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
}, 
modalView: { 
 
    justifyContent: "center", 
    position: "absolute", 
    top: "50%", 
    left: "50%", 
    elevation: 5, 
    transform: [{ translateX: -(width * 0.4) },  
                { translateY: -(height* 0.15) }], 
    height: 230, 
    width: width * 0.8, 
    backgroundColor: "#fff", 
    borderRadius: 7, 
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