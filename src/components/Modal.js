import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text, Dimensions,
  TouchableHighlight,TouchableWithoutFeedback,TouchableOpacity,Platform,ScrollView,
  View
} from "react-native";
import { Button, List, ListItem, Text as BaseText, Left,} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RadioButton, Checkbox  } from 'react-native-paper';
const { width, height } = Dimensions.get("window");
import FilterItems from './filterItems';
import {theme} from '../core/theme';
import {categories,price,brands,discount} from '../data/filterData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class Modals extends Component {
  state = {
    modalVisible: false,
    sortValue:'popularity',
    activeElement:1,
    category:[],
    brands:[],
    prices:[],
    discount:[]
  };
 
 sortByHandle=()=>{
   this.setState({activeElement:1})
 }
 categoryHandle=()=>{
  this.setState({activeElement:2})
}
brandHandle=()=>{
  this.setState({activeElement:3})
}
priceHandle=()=>{
  this.setState({activeElement:4})
}
discountHandle=()=>{
  this.setState({activeElement:5})
}
categoryItemHandler=(item)=>{
  if(this.state.category.some(e=>e==item)){
    const temp=this.state.category.filter(e=>e!=item);
    this.setState({category:temp})
  }
  else{
    this.setState({category:[...this.state.category,item]})
  }
}
brandItemHandler=(item)=>{
  if(this.state.brands.some(e=>e==item)){
    const temp=this.state.brands.filter(e=>e!=item);
    this.setState({brands:temp})
  }
  else{
    this.setState({brands:[...this.state.brands,item]})
  }
}
PricesItemHandler=(item)=>{
  if(this.state.prices.some(e=>e==item)){
    const temp=this.state.prices.filter(e=>e!=item);
    this.setState({prices:temp})
  }
  else{
    this.setState({prices:[...this.state.prices,item]})
  }
}
discountItemHandler=(item)=>{
  if(this.state.discount.some(e=>e==item)){
    const temp=this.state.discount.filter(e=>e!=item);
    this.setState({discount:temp})
  }
  else{
    this.setState({discount:[...this.state.discount,item]})
  }
}


  setModalVisible = () => {
    this.setState({ modalVisible:!this.state.modalVisible });
  }
  setValue = (visible) => {
    this.setState({ sortValue: visible });
  }

  clearState=()=>{
    this.setState({modalVisible: true,
      sortValue:'popularity',
      activeElement:this.state.activeElement,
      category:[],
      brands:[],
      prices:[],
      discount:[]})
  }
  render() {

const rightMenu=()=>{
  if(this.state.activeElement==1){
    return(
      
      <RadioButton.Group onValueChange={value => this.setValue(value)} value={this.state.sortValue}>
      <RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Cost : Low to High" value="costLowToHigh" />
      <RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Cost : High to Low" value="costHighToLow" />

      <RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Popularity" value="popularity" />
      <RadioButton.Item color={theme.colors.primary} labelStyle={{fontSize:16}} label="Rating : High to Low" value="ratingHighToLow" />
    </RadioButton.Group>
    )
  }
  else if(this.state.activeElement==2){
    return(
      <FilterItems ItemHandler={(item)=>this.categoryItemHandler(item)} filter={categories} Array1={this.state.category} />
     
    )
  }

  else if(this.state.activeElement==3){
    return(
      <FilterItems ItemHandler={(item)=>this.brandItemHandler(item)} filter={brands} Array1={this.state.brands} />
    )
  }
  else if(this.state.activeElement==4){
    return(
      <FilterItems ItemHandler={(item)=>this.PricesItemHandler(item)} filter={price} Array1={this.state.prices} />
    )
  }
  else{
    return(
      <FilterItems ItemHandler={(item)=>this.discountItemHandler(item)} filter={discount} Array1={this.state.discount} />
    )
  }
}
    const { modalVisible } = this.state;
    return (
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={{flexDirection:'row', borderBottomWidth:1,
   borderBottomColor:'#E0E0E0'}}>
                <Text style={styles.modalText}>Sort and Filters </Text>
                <MaterialIcons  onPress={() => {
                  this.setModalVisible();
                }} style={{paddingHorizontal:20}} name="cancel" size={29} color="black"/>
                </View>
       
    <View>
        <View style={{flexDirection:'row'}}>
            <View style={{flex:2,borderRightWidth:1,borderRightColor:'#EEEEEE'}}>
               
             
                <List>
            <ListItem noIndent onPress={()=>this.sortByHandle()}
              style={this.state.activeElement==1?{backgroundColor:'white'}:styles.filterTitle} >
              <Left>
              <BaseText>Sort By</BaseText>
              </Left>
              
            </ListItem >
            <ListItem noIndent onPress={()=>this.categoryHandle()} 
             style={this.state.activeElement==2?{backgroundColor:'white'}:styles.filterTitle} >
             <Left>
                <BaseText>Categories</BaseText>
              </Left>
             
            </ListItem>
            <ListItem noIndent onPress={()=>this.brandHandle()}
              style={this.state.activeElement==3?{backgroundColor:'white'}:styles.filterTitle}>
             <Left>
                <BaseText>Brands</BaseText>
              </Left>
              
            </ListItem>
            <ListItem noIndent onPress={()=>this.priceHandle()}  
            style={this.state.activeElement==4?{backgroundColor:'white'}:styles.filterTitle}>
             <Left>
                <BaseText>Prices</BaseText>
              </Left>
              
            </ListItem>
            <ListItem noIndent onPress={()=>this.discountHandle()} 
             style={this.state.activeElement==5?{backgroundColor:'white'}:styles.filterTitle}>
             <Left>
                <BaseText>Discount</BaseText>
              </Left>
             
            </ListItem>
            
            
       
          </List>
            </View>
            <View style={{flex:3.1,height:height*.62}}>
        
          
            {rightMenu()}
            

 
            </View>
        </View>
    </View>
             
            </View>
            <View style={{flex:1.1,backgroundColor:'white',flexDirection:'row'}}>
            <Button onPress={this.clearState} style={styles.filterButton1}>
            <Text style={{fontSize:17,color:'black'}}>Clear All</Text>
          </Button>
            <Button onPress={this.setModalVisible} style={styles.filterButton2}>
            <Text style={{fontSize:17,color:'white'}}>Apply</Text>
          </Button>
            </View>
          </View>
        </Modal>
        <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
     
        style={styles.chipsScrollView}
       
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
             <Button
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
            this.categoryHandle();
            }}>
                       
          <Text style={{marginRight:10}}> Catagory & Brands </Text>
          <FontAwesome   style={{}} 
             name="caret-down" size={25} color="black"/>
        </Button>
            <Button
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
            }}>
             <MaterialIcons   style={{}} 
             name="filter-list" size={20} color="black"/>            
          <Text style={{marginRight:10}}>  Sort  & Filters</Text>
          <FontAwesome   style={{}} 
             name="caret-down" size={25} color="black"/>
        </Button>
        
        <Button
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
            this.priceHandle();
            }}>
                       
          <Text style={{marginRight:10}}>Prices</Text>
          <FontAwesome   style={{}} 
             name="caret-down" size={25} color="black"/>
        </Button>
             <Button
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
            this.discountHandle();
            }}>
                       
          <Text style={{marginRight:10}}>Discount</Text>
          <FontAwesome   style={{}} 
             name="caret-down" size={25} color="black"/>
        </Button>
            
             </ScrollView>
    

                
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {  
  backgroundColor: "white",   
  paddingTop:18,  
  shadowColor: "#000",
  shadowOffset: {
  width: 0,
  height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,  
    width:width,
    flexDirection:'column',
    flex:9,
    marginTop:height*.15
  },
  openButton: {
    
    borderRadius: 3,
    paddingHorizontal: 10,
    elevation: 5,
    paddingVertical:1,
    marginRight:10,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:5,
    backgroundColor:'white',
    height:33,
    borderWidth:.2
  }, 
  modalText: {
  marginBottom: 15,
  fontSize:20,
  fontWeight:'bold',
  marginLeft:20,
  marginRight:'auto',
  
  },
  chipsScrollView: {
    paddingHorizontal:10,
    paddingVertical:5
  },
  filterTitle:{
  fontSize:16,
  paddingHorizontal:10,
  paddingVertical:10,
  backgroundColor:'#EEEEEE'
  },
  filterButton1:{
  backgroundColor:"white",
  borderRadius:5,
  marginVertical:10,
  paddingHorizontal:40,
  paddingVertical:0,
  marginRight:'auto',
  borderColor:'#BDBDBD',
  borderWidth:1,
  height:45,
  marginLeft:20
},
  filterButton2:{
  backgroundColor:"#FF3D00",
  borderRadius:5,
  marginHorizontal:10,
  marginVertical:10,
  paddingHorizontal:60,
  paddingVertical:0,
  marginLeft:'auto',
  height:45
}
});

export default Modals;