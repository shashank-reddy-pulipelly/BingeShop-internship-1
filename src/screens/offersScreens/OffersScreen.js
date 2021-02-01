import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,ActivityIndicator,ScrollView,Image,SafeAreaView } from 'react-native';

import * as firebase from 'firebase';

const OffersScreen = (props) => {

 const [offers,setOffers]=useState({isLoading:true,errMess:null,offers:[]})

       
  React.useEffect(() => {
   
    firebase.database().ref('Offers').on('value',snapShot=>{
        const offers=snapShot.val();
        const array=[];
        for(const key in offers){
            array.push(offers[key])
        }
   
        setOffers({isLoading:false,errMess:null,offers:array})
    })
   

    
  }, []);

    
         if(offers.isLoading ){
          return(
           <View style={[styles.container, styles.horizontal]}>
          
     
           <ActivityIndicator size="large" color="#600EE6" />
         </View>
          )
        }
     
        else if(offers.errMess ){
          return(
           <View style={[styles.horizontal]} > 
           <Text style={{fontSize:30,fontWeight:'bold'}} >OOPS ...!!</Text>
           <Text style={{fontSize:18,fontWeight:'bold'}} >Something went wrong !</Text>
       </View>
          )
        }
      
         else{
             return(
<SafeAreaView style={styles.container}>
                <ScrollView >
                
                    {offers.offers.map(image=>{

                        return(
                            <View key={image}>
                              
  <Image
            source={{uri:image}}
            resizeMode="stretch"
            style={{width:'100%',height:210}}
          />
                            </View>
                        )
                    })}
                </ScrollView>
                </SafeAreaView>
             )
           
        
         }
};

export default OffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#fff",
    flexDirection:'row'
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
