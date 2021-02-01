
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback, TouchableOpacity,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import * as firebase from 'firebase';
import { Button } from 'native-base';
import React, { Component } from 'react';
import Toast from 'react-native-tiny-toast';
import { theme } from '../core/theme';
import { LogBox } from 'react-native';




 class Card extends Component {


   constructor(props) {
     super(props)
   
     this.state = {
        isFavorite:false,
        price:this.props.itemData.price,
        available:this.props.itemData.available,
        loading:false
     }
   }
postCart=(prod_id,shop_id)=>{
    this.setState({loading:true},()=>{
      if(firebase.auth().currentUser){


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
    }
    });


}
   toggleFavorite=()=>{
    LogBox.ignoreAllLogs();
    if(firebase.auth().currentUser){
     if(this.state.isFavorite){
      this.setState({isFavorite:!this.state.isFavorite},()=>{



        firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).orderByChild('prod_id').equalTo(this.props.itemData.id).once('value',snapShot=>{
         var key=null;
         var val=snapShot.val();
         for(const pro in val){
           key=pro;
         }

         
         console.log(key)
          var a=snapShot.exists();
      
          if(a){
           
            firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites/${key}`).remove();
          }
        })
   
      });
    
     }
     else{
      this.setState({isFavorite:!this.state.isFavorite},()=>{
        firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).push({prod_id:this.props.itemData.id,shop_id:this.props.shopId})
 
      });

     }
    }
   }
   componentDidMount(){
    LogBox.ignoreAllLogs();
    if(firebase.auth().currentUser){
      this.sub2=  firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).orderByChild('prod_id').equalTo(this.props.itemData.id).on('value',snapShot=>{
        var a=snapShot.exists();
        this.setState({isFavorite:a})
      })
    this.sub1=  firebase.database().ref(`ShopProducts/${this.props.shopId}/${this.props.itemData.id}`).on('value',snap=>{
       const val=snap.val();
       console.log('shah');
       this.setState({price:val.price,available:val.available})
         })
    }
 
   }
   componentWillUnmount(){
     if(firebase.auth().currentUser){
      firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).off('value',this.sub2);
      firebase.database().ref(`ShopProducts/${this.props.shopId}/${this.props.itemData.id}`).off('value',this.sub1);
     }
   
   }
  render() {
    const {itemData, onPress}=this.props;
    
    return (
      <TouchableOpacity activeOpacity={1} style={{backgroundColor:'#EEEEEE'}} onPress={onPress}>
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
                <Text style={{ marginTop:6,marginLeft:2,fontSize:19, fontWeight: 'bold',}}>{this.state.price}</Text>
                <Text style={{textDecorationLine: 'line-through',fontSize: 13, color: '#444' ,marginTop:9,marginLeft:10}}>{this.state.price+100} </Text>
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
        {this.state.available?<Button style={{marginVertical:10,marginLeft:'auto',paddingVertical:10,paddingHorizontal:15,backgroundColor:theme.colors.primary,flex:1,justifyContent:'center', borderRadius:5}}  
  onPress={()=>{

    this.postCart(itemData.id,this.props.shopId)}
  }
               >{this.state.loading?<View><ActivityIndicator  size="small" color="white" /></View>:<Text style={{fontSize:15,color:'white'}}>Add to Cart</Text>}</Button>:<View style={{paddingVertical:5}}><Text style={{color:'red',fontSize:18,paddingVertical:15,fontWeight:'bold'}}>Not Available</Text></View>}
     
            </View>
        
        </View>
      </View>
    </TouchableOpacity>
    )
  }
}

export default Card;


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