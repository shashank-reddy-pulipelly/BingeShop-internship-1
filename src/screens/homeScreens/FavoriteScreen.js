import React,{PureComponent} from 'react';
import { View, Text, FlatList, StyleSheet,Image,ActivityIndicator } from 'react-native';

import * as firebase from 'firebase';
import Card from '../../components/Card';
import {  Button } from 'native-base';
import {theme} from '../../core/theme';




class FavoriteScreen extends PureComponent{
constructor(props) {
  super(props)

  this.state = {
 

 
    newProducts: {isLoading:true,errMess:null,newProducts:[]},
   refreshing:false
  }
}

load= async ()=>{
  this.setState({refreshing:true})
  if(firebase.auth().currentUser){


  this.sub1 =  await firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).on('value',async snapShopt=>{

    const val=snapShopt.val();
    
    var array=[];
     
    const val2=val;
 
    for(const keys in val2){
    
    const obj=val2[keys];
    
    const query2 = firebase.database().ref(`ShopProducts/${obj.shop_id}/${obj.prod_id}`)
    await query2.once('value',  snap=>{
    array.push(snap.val())
    
    })
    }
    this.setState({newProducts:{isLoading:false,errMess:null,newProducts:array},refreshing:false})
     });
    }
}

async componentDidMount(){ 
if(firebase.auth().currentUser){


  this.sub1 =  await firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).on('value',async snapShopt=>{

    const val=snapShopt.val();
    
    var array=[];
     
    const val2=val;
 
    for(const keys in val2){
    
    const obj=val2[keys];
    
    const query2 = firebase.database().ref(`ShopProducts/${obj.shop_id}/${obj.prod_id}`)
    await query2.once('value',  snap=>{
    array.push(snap.val())
    
    })
    }
    this.setState({newProducts:{isLoading:false,errMess:null,newProducts:array}})
     });
 
    }
  }

componentWillUnmount(){
  if(firebase.auth().currentUser){
    firebase.database().ref(`Users/${firebase.auth().currentUser.phoneNumber}/Favorites`).off('value',this.sub1)
  }
  
}


  render(){
   
    if(this.state.newProducts.isLoading   ){
      return(
       <View style={[styles.container, styles.horizontal]}>
      
 
       <ActivityIndicator size="large" color="#600EE6" />
     </View>
      )
    }
 
    else if(this.state.newProducts.errMess  ){
      return(
       <View style={[styles.horizontal]} > 
       <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
       <Text style={{fontSize:18,fontWeight:'bold'}} >something went wrong !</Text>
   </View>
      )
    }
    else{

    const renderItem = ({item}) => {
     
 
      return (
          <Card 
              itemData={{
                ...item,id:item.prod_id
              }} shopId={item.shop_id}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:item.prod_id,shopId:item.shop_id})}
          />
      );
  };

  if(this.state.newProducts.newProducts.length==0){
    return(
      <View style={styles.container2}>
      <View style={{alignItems:'center'}}>
      <Image
      style={styles.cartLogo}
      source={require('../../assets/favourite-location.png')}
    />
    <Text style={{fontSize:20,fontWeight:'bold',marginBottom:20}}>Your Wishlist is empty !</Text>
    

     
    <Button onPress={()=>this.props.navigation.navigate('Home')} style={{backgroundColor:theme.colors.primary,alignSelf:'center',marginTop:10}}>
        <Text style={{fontSize:17,marginHorizontal:40,color:'white'}}>Shop Now</Text>
      </Button>
       </View>
    </View>
    )
  }
    return(
      <View style={styles.container}>
      <FlatList onRefresh={this.load} refreshing={this.state.refreshing}  style={styles.list}
               data={this.state.newProducts.newProducts}
               renderItem={renderItem}
               keyExtractor={item => Math.random().toString()}
           />
           
         </View>
    )
  }
}
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#fff",
    flexDirection:'row'
  },
  list:{
    flex:0.5
  },
  cartLogo:{
  
    resizeMode: 'stretch',
    width:300,
    height:300
  },
  container2:{

    alignItems:'center',
    flex:1,
    backgroundColor:'white',
    paddingTop:40
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
