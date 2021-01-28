import React,{Component} from 'react';
import { View, Text, StyleSheet,Image,ScrollView,Dimensions,ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get("window");

import {theme} from '../core/theme';
import * as firebase from 'firebase';

class OrderCard extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             items:{isLoading:true,errMess:null,items:[]}
        }
    }
    load= async ()=>{    
        var array=[];
        for(const keys in this.props.items){
        
        const query2 = firebase.database().ref(`ShopProducts/${this.props.shop_id}/${this.props.items[keys].prod_id}`)
        await query2.once('value',  snap=>{
        array.push({title:snap.val().title,image:snap.val().image})
        
        })
        }
        this.setState({items:{isLoading:false,errMess:null,items:array}})
        
    }
   async componentDidMount(){

await this.load();

    }
    render(){
        if(this.state.items.isLoading){
            return(
                <View style={ styles.horizontal}>
      
 
                <ActivityIndicator size="large" color="#600EE6" />
              </View>
            )
        }
        else if(this.state.items.errMess){
            return(
                <View style={[styles.horizontal]} > 
                <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
                <Text style={{fontSize:18,fontWeight:'bold'}} > something went wrong !</Text>
            </View>
            )
        }
        else{

                
                return(
                  <View >
              
                <View style={styles.item1}>
      <Image source={{uri:this.state.items.items[0].image}}
                  resizeMode="stretch"
                  style={styles.cardImg} />
                  <Text numberOfLines={1} style={{marginLeft:10}}>{this.state.items.items[0].title}</Text>
                </View>
                {this.state.items.items.length>=2?<View style={styles.item2}>
                <Image source={{uri:this.state.items.items[1].image}}
                  resizeMode="stretch"
                  style={styles.cardImg} />
                  <Text numberOfLines={1}  style={{marginLeft:10}}>{this.state.items.items[1].title}</Text>
                </View>:null}
                
               
                <View style={styles.items}>
                  {this.state.items.items.length>2?<Text>+{this.state.items.items.length-2} more items</Text>:null}
      
      </View>
 
             </View>
                )
            
                }
    }
    
}

export default OrderCard;
const styles = StyleSheet.create({
    container: {
  
   
      alignSelf: 'center',
      backgroundColor:"#fff",
         
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
      marginVertical:0,
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
      marginBottom:7,
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
  