import React,{Component} from 'react';
import { View, Text, FlatList, StyleSheet,Image,ActivityIndicator } from 'react-native';
import Card from '../../components/Card';
import * as firebase from 'firebase';

class FavoriteScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
 
        data: {isLoading:true,errMess:null,data:[]},
        isRefreshing:false
    
      
       
    };

  
}
load=async ()=>{
  this.setState({isRefreshing:true},async ()=>{
  await firebase.database().ref('ShopProducts').on('value',snapShot=>{
      var Products=[];
      const val=snapShot.val();
      for(const key in val){
          const pros=val[key];
          for(const product in pros){
            Products.push({...pros[product],id:pros[product].prod_id});
  
          }
  
      }
      console.log(Products)
      const filterProducts=Products.filter(Prod=>{
        const prodTitle=Prod.title.toLowerCase();
        if(prodTitle.includes(this.props.route.params.title.toLowerCase())){
          return true;
        }
        else{
          return false;
        }
      })
      this.setState({
        data:{isLoading:false,errMess:null,data:filterProducts},isRefreshing:false
        },()=>{
          console.log(filterProducts)
        })
    })
  
  })

}
async componentDidMount(){ 



  this.unsubscribe = this.props.navigation.addListener('focus', () => {

  firebase.database().ref('ShopProducts').once('value',snapShot=>{
    var Products=[];
    const val=snapShot.val();
    for(const key in val){
        const pros=val[key];
        for(const product in pros){
          Products.push({...pros[product],id:pros[product].prod_id});

        }

    }
    const filterProducts=Products.filter(Prod=>{
      const prodTitle=Prod.title.toLowerCase();
      if(prodTitle.includes(this.props.route.params.title.toLowerCase())){
        return true;
      }
      else{
        return false;
      }
    })
    this.setState({
      data:{isLoading:false,errMess:null,data:filterProducts}
      })
  })

 
  })




    
}

componentWillUnmount() {
this.unsubscribe();
}
  render(){
   
    if(this.state.data.isLoading){
      return(
       <View style={[styles.container, styles.horizontal]}>
      
 
       <ActivityIndicator size="large" color="#600EE6" />
     </View>
      )
    }
 
    else if(this.state.data.errMess){
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
              itemData={item} shopId={item.shop_id}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData:item.id,shopId:item.shop_id})}
          />
      );
  };

 
    return(
      <View style={styles.container}>
      <FlatList onRefresh={this.load} refreshing={this.state.isRefreshing} style={styles.list}
               data={this.state.data.data}
               renderItem={renderItem}
               keyExtractor={(item,index) =>index.toString()}
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
