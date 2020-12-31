import React,{Component} from 'react';
import {View, Text , Image, StyleSheet,TouchableHighlight,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Button } from 'native-base';
const mapStateToProps = state => {
  return {

    carts: state.carts
  }
}

const mapDispatchToProps = dispatch => ({

})

class Card extends Component {
  countPrev=this.props.carts.filter((item)=> item.id ==this.props.itemData.id);
  constructor(props) {
    super(props)
    
    this.state = {
       count:this.countPrev[0].count
    }
 
  }
  countInc=()=>{
    this.setState({count:this.state.count+1});
    this.props.postCart(this.props.itemData.id)
  }
  countDec=()=>{
    if(this.state.count!=1){
    
     this.setState({count:this.state.count-1})
     this.props.decreaseCart(this.props.itemData.id)
 
    }
    else{
      this.props.deleteCart(this.props.itemData.id);
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
          source={itemData.image}
          resizeMode="cover"
          style={styles.cardImg}
        />
    
      </View>
      <View style={styles.cardInfo}>

        <Text style={styles.cardTitle}>{itemData.title}</Text>
        
     

          <View style={styles.row}>
          <Text style={{fontSize:18,padding:0,paddingVertical:0,margin:0,paddingTop:8,alignSelf:'center'}}>{'\u20B9'} </Text>
              <Text style={{ marginTop:6,marginLeft:2,fontSize:18,  fontWeight: 'bold',}}>{itemData.amount*this.state.count}</Text>
              <Text style={{textDecorationLine: 'line-through',fontSize: 13, color: '#444' ,marginTop:9,marginLeft:10}}>{itemData.amount+100} </Text>
              <Text style={{fontSize: 13, color: '#09af00' ,marginTop:9,marginLeft:10}}>33% off</Text>
          </View>
        
   
    
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
                <Text>{this.state.count}</Text>
            </View>
            <TouchableHighlight style={styles.countButton2} onPress={this.countInc}>
        
          <Icon name='plus' color='white' size={16}></Icon>
      
            </TouchableHighlight>
      </View>
    
            <Button onPress={deleteCart} style={styles.filterButton2}>
            <Text style={{fontSize:17,color:'white'}}>Delete</Text>
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
    backgroundColor:"#600EE6",
    borderRadius:5,
    marginHorizontal:10,
    marginVertical:10,
    paddingHorizontal:20,
    paddingVertical:0,
    marginLeft:'auto',
    height:42
  },
  cardImg: {
    height: 100,
    width: '80%',
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
    paddingVertical:20,
  
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
    backgroundColor:"#600EE6",
    borderBottomLeftRadius:3,
    borderTopLeftRadius:3,
},
  countButton2:{
      paddingHorizontal:15,
      paddingVertical:13,
      backgroundColor:"#600EE6",
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