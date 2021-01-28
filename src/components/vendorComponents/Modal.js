import {View, Text, StyleSheet, TextInput,Dimensions,
} from 'react-native';

import React, { Component } from 'react';

import { theme } from '../../core/theme';
import {Button as PaperButton,RadioButton } from 'react-native-paper';

const { width, height } = Dimensions.get("window");


class ModalCustom extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             price:String(this.props.price),
             globalStatus:this.props.globalStatus,
             input:String(this.props.price),
             localStatus:this.props.globalStatus
        }
    }
    
    render(){
        return(
        
         <View style={styles.viewWrapper}> 
             <View style={styles.modalView}> 
             <View style={{paddingTop:10,marginLeft:20,paddingBottom:5}}>
             <Text style={{fontSize:18,fontWeight:'bold'}} >Edit Product Price </Text>
             </View>
            
                 <TextInput placeholder="Enter Price"  keyboardType="phone-pad"
                            value={this.state.input} style={styles.textInput}  
                            onChangeText={(value) =>   this.setState({input:value})} /> 
<View style={{paddingTop:20,marginLeft:20,paddingBottom:10}}>
             <Text style={{fontSize:18,fontWeight:'bold'}} >Edit Product Status </Text>
             </View>
            
             <RadioButton.Group onValueChange={value => this.setState({localStatus:value})} value={this.state.localStatus}>
<RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Available" value={true} />
<RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Not Available" value={false} />


</RadioButton.Group>


   <View style={{flexDirection:'row',paddingTop:15,paddingBottom:10,marginLeft:'auto',marginRight:10}}>
   <PaperButton mode="text" labelStyle={{fontSize:16}} onPress={()=>{this.props.modalToggle()}}>Cancel </PaperButton>
   <PaperButton mode="text"labelStyle={{fontSize:16}} onPress={()=>{
console.log(this.state.localStatus)
this.props.EditProduct(this.state.input,this.state.localStatus)
}}> Confirm </PaperButton>


       </View>           

             </View> 
         </View> 
    
        )
    }
}

export default ModalCustom;
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