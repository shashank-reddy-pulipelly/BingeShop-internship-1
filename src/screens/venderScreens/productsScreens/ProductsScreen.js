import React,{memo,useEffect,useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import Search from '../../../components/vendorComponents/Search';
import * as firebase from 'firebase';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LogBox } from 'react-native';



const ProductsScreen= (props) => {

  const [shopProducts,setShopProducts]=useState({isLoading:true,errMess:null,shopProducts:[]})
  const [pushToken,setPushToken]=useState('');

  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    var shopId=null;
firebase.database().ref(`Shops`).orderByChild('phone_num').equalTo(firebase.auth().currentUser.phoneNumber).once('value',snapShot=>{

  for(const key in snapShot.val()){
    shopId=key;
  }
  firebase.database().ref(`ShopProducts/${shopId}`).once('value',snap=>{
    var val=snap.val();
    const loadedProducts=[];
    for(const key in val){
  
      loadedProducts.push({...val[key],id:val[key].prod_id})
  
    }
    setShopProducts({isLoading:false,errMess:null,shopProducts:loadedProducts})
  })
})
   

    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then((statusObj) => {
      if (statusObj.status !== 'granted') {
        return Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
      return statusObj;
    })
    .then((statusObj) => {
      if (statusObj.status !== 'granted') {
        throw new Error('Permission not granted!');
      }
    })
    .then(() => {
      return Notifications.getExpoPushTokenAsync();
    })
    .then((response) => {
      const token = response.data;
      setPushToken(token)
      firebase.database().ref(`Shops/${shopId}`).update({pushToken:response.data})
      console.log(response)
    })
    .catch((err) => {
      console.log(err);
      return null;
    });


   const  backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
       
      }
    );
const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
     
      }
    );
    
return ()=>{
  backgroundSubscription();
  foregroundSubscription();
}
        
      }, []);

  if(shopProducts.isLoading){
    return(
     <View style={[styles.container, styles.horizontal]}>
    

     <ActivityIndicator size="large" color="#600EE6" />
   </View>
    )
  }

  else if(shopProducts.errMess ){
    return(
     <View style={[styles.horizontal]} > 
     <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
     <Text style={{fontSize:18,fontWeight:'bold'}} >{shopProducts.errMess} !</Text>
 </View>
    )
  }
  else{

  
    return (
      <View style={styles.container}>
      
        <Search  data={shopProducts.shopProducts}  navigation={props.navigation}/>
     
        
      </View>
    );
  }
};


export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#fff",
    flexDirection:'row'
  }
  ,
  horizontal: {
    flex:1,
    justifyContent: "center",
    alignItems:'center',
    padding: 10,
    paddingBottom:50,
    backgroundColor:'#fff'
  }
});
