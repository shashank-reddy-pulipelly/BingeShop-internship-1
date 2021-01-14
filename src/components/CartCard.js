import React,{PureComponent} from 'react';
import {View, Text , Image, StyleSheet,TouchableHighlight,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { theme } from '../core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const mapStateToProps = state => {
  return {


  }
}

const mapDispatchToProps = dispatch => ({

})

class Card extends PureComponent {

  constructor(props) {
    super(props)
    
    this.state = {
    
    }
 
  }
  countInc=()=>{
    
    this.props.postCart()
  }
  countDec=()=>{
    if(this.props.itemData.count!=1){
    
    
     this.props.decreaseCart()
 
    }
    else{
      this.props.deleteCart();
    }
   
  }
  render(){
    const {itemData, onPress,deleteCart}=this.props;
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
              <Text style={{ marginTop:6,marginLeft:2,fontSize:18,  fontWeight: 'bold',}}>{itemData.price*this.props.itemData.count}</Text>
              <Text style={{textDecorationLine: 'line-through',fontSize: 13, color: '#444' ,marginTop:9,marginLeft:10}}>{itemData.price+100} </Text>
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
     
          <TouchableHighlight  style={styles.countButton} onPress={this.countDec}>
      <Icon name='minus' color='white' size={16}></Icon>
          </TouchableHighlight>
            
            <View style={{
                paddingHorizontal:15,
                backgroundColor:'#E0E0E0',
                paddingVertical:9,
                borderTopWidth:1,
                borderBottomWidth:1,
                borderColor:'#E0E0E0'
            }}>
                <Text>{this.props.itemData.count}</Text>
            </View>
            <TouchableHighlight style={styles.countButton2} onPress={this.countInc}>
        
          <Icon name='plus' color='white' size={16}></Icon>
      
            </TouchableHighlight>
      </View>
    
            <Button onPress={deleteCart} style={styles.filterButton2}>
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



export default connect(mapStateToProps,mapDispatchToProps)(Card);

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