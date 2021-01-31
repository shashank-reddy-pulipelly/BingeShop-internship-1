import {View, Text, Image, StyleSheet,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import React, { Component } from 'react';
import { Button } from 'native-base';
import Toast from 'react-native-tiny-toast';
import { theme } from '../core/theme';
import * as firebase from 'firebase';




 class Card extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
            showToast: false,
            loading:false
          };
     }
     postCart=(prod_id,shop_id)=>{
      this.setState({loading:true},()=>{
        firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}`).once('value',snapShot=>{
          if(snapShot.exists()){
            firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).once('value',snap=>{
              if(snap.exists()){
                firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Carts/${shop_id}/${prod_id}`).set(Number(snap.val()+1),(error)=>{
                  if(!error){
                    this.setState({loading:false})
                    Toast.show('  Item Added to Cart  Successfully  ',{
                      position:-.00001,
                      containerStyle:{
                        borderRadius:0,
                        paddingHorizontal:0,
                        width:'100%'
                      }
                    })
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
                    Toast.show('  Item Added to Cart  Successfully  ',{
                      position:-.00001,
                      containerStyle:{
                        borderRadius:0,
                        paddingHorizontal:0,
                        width:'100%'
                      }
                    })
                  
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
                Toast.show('  Item Added to Cart  Successfully  ',{
                  position:-.00001,
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
      });
  
  
  } 
  render() {
    const {itemData, onPress}=this.props;
    return (
      <View style={styles.container} onPress={onPress}>
      <View >
      <View style={styles.cardImgWrapper}>
      <View style={{position:'absolute',backgroundColor:theme.colors.primary,
      top:0,zIndex:5,left:0,borderBottomRightRadius:10,
      paddingVertical:2,borderTopLeftRadius:10}}>
        <Text style={{color:'white',fontSize:10}}>   30% OFF   </Text>
        </View>
                   
          <Image
            source={{uri:itemData.image}}
            resizeMode="stretch"
            style={styles.cardImg}
          />
        </View>
        <View>
            <Text style={styles.cardTitle} numberOfLines={2}>{itemData.title}</Text>
        </View>
        <View style={styles.ratings}>
              <View style={styles.star}>
<Text style={{color:'white',paddingLeft:4,fontSize:12}}>5</Text>
<View style={{paddingRight:5,paddingLeft:5}}>
<Icon name="star"  size={10} color="#fff" />
</View>

              </View>
              <View style={styles.reviews}>
                <Text style={{ fontSize: 10,
    color: 'grey',}}>134 Ratings  </Text>
              </View>
             
            </View>
            <View style={styles.quantity}>
                <Text style={{fontSize:12,color:'grey'}}>{itemData.quantity}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{fontSize:15,padding:0,paddingVertical:0,margin:0,paddingTop:8,alignSelf:'center',paddingLeft:20}}>{'\u20B9'} </Text>
                <Text style={{ marginTop:6,marginLeft:0,fontSize:15, fontWeight: 'bold',}}>{this.props.itemData.price}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 11, color: '#444' ,marginTop:6,marginLeft:10}}>{this.props.itemData.price+100} </Text>
               
            </View>
           
            <View style={{flex:1,marginBottom:10,justifyContent:'flex-end'}}>
            <View style={{backgroundColor:'#F1F8E9',marginHorizontal:25,alignItems:'center',paddingVertical:1,justifyContent:'flex-end',
            borderRadius:3,borderWidth:0.3,borderColor:'green',overflow:'hidden',marginBottom:15}}>
              <Text numberOfLines={1} style={{color:'green',fontSize:10}}>{itemData.shop_name}</Text>
            </View>
            <Button onPress={()=> {
                    Toast.show('  Item Added to Cart  Successfully ',{
                      position:-.00001,
                      containerStyle:{
                        borderRadius:0,
                        paddingHorizontal:0,
                        width:'100%'
                      }
                    });
            this.postCart(this.props.itemData.prod_id,this.props.itemData.shop_id)
            }  
            } style={styles.filterButton2}>{this.state.loading?<ActivityIndicator size="small" color="white" />:<Text style={{fontSize:14,color:'white',fontWeight:'bold'}}>Add</Text>}
            
          </Button>
            </View>
        
      </View>
    </View>
    )
  }
}

export default Card;


const styles = StyleSheet.create({
    container:{
        width:160,
        height:380,
        backgroundColor:'white',
     
        marginHorizontal:10,
        borderRadius:10,
        alignItems:'center',
        marginTop:20
   
    },
  card: {
 
   padding:10,
   paddingBottom:0,
    flexDirection: 'column',
 borderBottomColor:"#E0E0E0",
borderBottomWidth:1,
backgroundColor:"#fff",
width:400,

   
  },
  cardImgWrapper: {

    backgroundColor:'white',
    padding:10,
    margin:10,
    borderRadius:10,
    paddingHorizontal:10,
    elevation:10,
    alignItems:'center'
  },
  cardImg: {
    height: 110,
    width:90,

  },

  cardTitle: { 
    fontSize:15,
    fontWeight:'bold',
    marginHorizontal:10,
    letterSpacing: 0.2
  },

  ratings:{
    flexDirection: 'row',
    marginTop:9
  },
  star:{
    flex:1,
    backgroundColor:"#388E3C",
    marginRight:10,
   height:18, 
    justifyContent:'center',
    alignItems:"center",
    flexDirection: 'row',
    borderRadius:10,
    paddingHorizontal:8,
    marginLeft:10
  },
  reviews: {
    flex:4,
   
  },
  row:{
    flexDirection: 'row',
   alignItems:'center',
   paddingBottom:5
  },
  quantity:{
      marginTop:12,
      marginHorizontal:10,
      paddingLeft:6,
      backgroundColor:'#EEEEEE',
      borderRadius:5,
      paddingVertical:3
  },
  filterButton2:{
    backgroundColor:"#E65100",
    borderRadius:5,
  paddingHorizontal:55, 
  alignSelf:'center',
    height:35,
    justifyContent:'center'
  }
});