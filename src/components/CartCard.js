import React,{Component} from 'react';
import {View, Text , Image, StyleSheet,TouchableHighlight,TouchableWithoutFeedback,Alert, TouchableOpacity,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'native-base';
import { theme } from '../core/theme';
import * as firebase from 'firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





class Card extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      loading:false
    }
 
  }
  countInc=(prod_id,shop_id)=>{
    
    
    this.setState({loading:true},()=>{
      if(firebase.auth().currentUser){

      
      firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}`).once('value',snapShot=>{
        if(snapShot.exists()){
          firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).once('value',snap=>{
            if(snap.exists()){
              firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(snap.val()+1),(error)=>{
                if(!error){
                  this.setState({loading:false})
           
                }
                else{
                  this.setState({loading:false})
                  console.log('cart adding error',error);
                }
              })
            }
            else{
              firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(1),(error)=>{
                if(!error){
                  this.setState({loading:false})
               
                
                }
                else{
                  this.setState({loading:false})
                  console.log('cart adding error',error);
                }
              })
            }
          })
        }
        else{
          firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(1),(error)=>{
            if(error){
              this.setState({loading:false})
              console.log('cart adding error',error);
            }
            else{
              this.setState({loading:false})
           
            }
          })
        }
      })
    }
    });
  }
  countDec=(prod_id,shop_id)=>{
    
      
    this.setState({loading:true},()=>{
      if(firebase.auth().currentUser){


      firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}`).once('value',snapShot=>{
        if(snapShot.exists()){
          firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).once('value',snap=>{
            if(snap.exists() && Number(snap.val())>1 ){
              firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(snap.val()-1),(error)=>{
                if(!error){
                  this.setState({loading:false})
           
                }
                else{
                  this.setState({loading:false})
                  console.log('cart adding error',error);
                }
              })
            }
            else if(snap.exists() && Number(snap.val())==1 ){
              Alert.alert(
                "Delete Item ?",
                "Are you sure to delete this Item ?",
                [
                  {
                    text: "Cancel",
                    onPress: () =>{
                      this.setState({loading:false})
                    },
                    style: "cancel"
                  },
                  { text: "DELETE", onPress: () => {
                    firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(null,(error)=>{
                      if(!error){
                        this.setState({loading:false})
                 
                      }
                      else{
                        this.setState({loading:false})
                        console.log('cart adding error',error);
                      }
                    })
                  } }
                ],
                { cancelable: false }
              );
          
            }
        
          })
        }
      
      })
    }
    });

  
    
  
  }
    
  
   delete=(prod_id,shop_id)=>{
    this.setState({loading:true},()=>{
     if(firebase.auth().currentUser){

 
            firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(null,(error)=>{
              if(!error){
                this.setState({loading:false})
         
              }
              else{
                this.setState({loading:false})
                console.log('cart adding error',error);
              }
            })
          }
    
    })
   }
  
  render(){
    const {itemData, onPress}=this.props;
    return(
      <TouchableWithoutFeedback >
      <View style={styles.screen}>

   
    <TouchableWithoutFeedback onPress={onPress} >
      <View style={styles.card}>
      <View style={styles.cardImgWrapper}>
       
        <Image
          source={{uri:itemData.image}}
          resizeMode="cover"
          style={styles.cardImg}
        />
    
      </View>
      <View style={styles.cardInfo}>

        <Text style={styles.cardTitle}>{itemData.title}</Text>
        
     

          <View style={styles.row}>
          <Text style={{fontSize:18,padding:0,paddingVertical:0,margin:0,paddingTop:8,alignSelf:'center'}}>{'\u20B9'} </Text>
              <Text style={{ marginTop:6,marginLeft:2,fontSize:18,  fontWeight: 'bold',}}>{(this.props.itemData.price*this.props.itemData.count).toFixed(1)}</Text>
              <Text style={{textDecorationLine: 'line-through',fontSize: 13, color: '#444' ,marginTop:9,marginLeft:10}}>{(this.props.itemData.price*this.props.itemData.count+100).toFixed(1)} </Text>
              <Text style={{fontSize: 13, color: '#09af00' ,marginTop:9,marginLeft:10}}>33% off</Text>
          </View>
        
          <Text style={{paddingVertical:10}} >Net Weight : {itemData.quantity} / <Text style={{fontSize:12}} >per piece</Text></Text>
    
      </View>
      </View>
    </TouchableWithoutFeedback >
    <View style={styles.row2}>
        <View>
            <Text> Quantity : </Text>
        </View>
      <View style={styles.count}>
     {this.props.itemData.available? <Button   style={styles.countButton} onPress={()=>{this.countDec(this.props.itemData.prod_id,this.props.shopId)}}>
      <Icon name='minus' color='white' size={16}></Icon>
          </Button>:null}
         
            
            <View style={{
                paddingHorizontal:15,
                backgroundColor:'#E0E0E0',
                paddingVertical:9.2,
                borderTopWidth:1,
                borderBottomWidth:1,
                borderColor:'#E0E0E0',width:40,
                height:45
            }}>{this.state.loading?<ActivityIndicator  size="small" color="black" />: <Text>{this.props.itemData.count}</Text>}
               
            </View>
            {this.props.itemData.available?<Button style={styles.countButton2} onPress={()=>{this.countInc(this.props.itemData.prod_id,this.props.shopId)}}>
        
        <Icon name='plus' color='white' size={16}></Icon>
    
          </Button>:null}
            
      </View>
    {!this.props.itemData.available?<View><View style={{}}>
          <Text style={{color:'red',fontSize:16,fontWeight:'bold'}}> Currently{'\n'}Unavailable</Text>
        </View></View>:null}
            <Button onPress={()=>{
                      Alert.alert(
                        "Delete Item ?",
                        "Are you sure to delete this Item ?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "DELETE", onPress: () => this.delete(this.props.itemData.prod_id,this.props.shopId) }
                        ],
                        { cancelable: false }
                      );
            }} style={styles.filterButton2}>
            <MaterialCommunityIcons
                        name="delete" 
                        color="black"
                        size={25}
                        />
          </Button>
   
    </View>
    </View>
  </TouchableWithoutFeedback>
    )
  }
}



export default Card;

const styles = StyleSheet.create({
    screen:{
        padding:10,
        backgroundColor:"white",
        borderBottomColor:"#E0E0E0",
    borderBottomWidth:1.5,      
    },
  card: {
   paddingBottom:0,
    flexDirection: 'row', 
  },
  cardImgWrapper: {
    flex: 1,
    alignSelf: 'center',
  },
  filterButton2:{
    backgroundColor:"#E0E0E0",
    borderRadius:5,
    marginRight:20,
    marginVertical:10,
    paddingHorizontal:15,
    paddingVertical:0,
    marginLeft:'auto',
    height:42
  },
  cardImg: {
    height: 90,
    width: '70%',
    resizeMode: 'stretch'
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    paddingBottom:1,
    paddingLeft:0,
    paddingTop:0,


    backgroundColor: '#fff',
  },
  cardTitle: {
  
    fontSize:16
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
  },
  row2:{
    flexDirection: 'row', 
    backgroundColor:"white",
    alignItems:"center",
    paddingVertical:10,
  
  },
  count:{ 
    flexDirection: 'row',
    alignItems:"center",
    marginLeft:10,
    marginRight:'auto'
  },
  countButton:{
    paddingHorizontal:15,
    paddingVertical:13, 
    backgroundColor:theme.colors.primary,
    borderBottomLeftRadius:3,
    borderTopLeftRadius:3,
 
},
  countButton2:{
      paddingHorizontal:15,
      paddingVertical:13,
      backgroundColor:theme.colors.primary,
      borderTopRightRadius:3,
      borderBottomRightRadius:3
   
  },
  delete:{
    alignItems:"center",
        paddingHorizontal:15,
        paddingVertical:9,
        borderWidth:0.7,
        backgroundColor:"#BDBDBD",
        borderRadius:3,
        borderColor:'#E0E0E0',
        marginRight:20
    
  }
  
});