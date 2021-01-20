import React, { Component, } from 'react'
import { TouchableOpacity, StyleSheet, Text, 
    View,SafeAreaView,ScrollView} from 'react-native';
    import {theme} from '../../core/theme';
import TextInput from '../../components/TextInput';
import {
    nameValidator,numberValidator,dataValidator,pinValidator
  } from '../../core/address';
  import {  Button } from 'native-base';
  import {addAddress,deleteAddress } from '../../redux/ActionCreators';
  import { fetchAddress,editAddress} from '../../redux/actions/addressActions';
  import { connect } from 'react-redux';
  const mapStateToProps = state => {
    return {

    
      address:state.address.address,

    }
  }

  const mapDispatchToProps = dispatch => ({
    
    addAddress:(object)=>dispatch(addAddress(object)),
    deleteAddress:()=>dispatch(deleteAddress()),
    editAddress:(object)=>dispatch(editAddress(object)),



})

 class AddressScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      name:{value:this.props.address.name,
      error:''},
      number:{value:this.props.address.number,
      error:''},
      pinCode:{value:this.props.address.pinCode,error:''},
      city:{value:this.props.address.city,error:''},
      state:{value:this.props.address.state,error:''},
      houseNo:{value:this.props.address.houseNo,error:''},
      roadNo:{value:this.props.address.roadNo,error:''},
      landmark:{value:this.props.address.landmark,error:''}
    }
  }
 

  _onSignUpPressed = () => {
  
    const nameError = nameValidator(this.state.name.value);
    const numberError = numberValidator(this.state.number.value);
     const pinError = pinValidator(this.state.pinCode.value);
     const cityError = dataValidator(this.state.city.value);
     const stateError = dataValidator(this.state.state.value);
     const houseNoError = dataValidator(this.state.houseNo.value);
     const roadNoError = dataValidator(this.state.roadNo.value);
     
   

 
   if (nameError || numberError || pinError || cityError || stateError || houseNoError || roadNoError ) {
  
     this.setState({name:{...this.state.name,error:nameError}})
   
     this.setState({number:{...this.state.number,error:numberError }})
   
     this.setState({pinCode:{...this.state.pinCode,error:pinError }})
   
     this.setState({city:{...this.state.city,error:cityError }})
   
     this.setState({state:{...this.state.state,error:stateError }})
    
     this.setState({houseNo:{...this.state.houseNo,error:houseNoError }})
    
     this.setState({roadNo:{...this.state.roadNo,error:roadNoError }})
     return;
   }
   else{
     const obj={
       name:this.state.name.value,
       number:this.state.number.value,
       pinCode:this.state.pinCode.value,
       city:this.state.city.value,
       state:this.state.state.value,
       houseNo:this.state.houseNo.value,
       roadNo:this.state.roadNo.value,
       landmark:this.state.landmark.value
     }
      this.props.editAddress(obj);
     this.props.navigation.goBack();
   }


 }
 
  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" >
      <View >
      <TextInput
          label="Full Name (Required)*"
          returnKeyType="next"
          value={this.state.name.value}
          onChangeText={text =>  this.setState({name:{...this.state.name,value:text}})}
       
          errorText={this.state.name.error}
        
        />
  
  <TextInput
          label="Phone Number (Required)*"
          returnKeyType="done"
          value={this.state.number.value}
          onChangeText={text =>  this.setState({number:{...this.state.number,value:text}})}
       
          errorText={this.state.number.error}
        
          keyboardType="numeric"
         
        />
        <TextInput
          label="PinCode (Required)*"
          returnKeyType="done"
          value={this.state.pinCode.value}
          onChangeText={text =>  this.setState({pinCode:{...this.state.pinCode,value:text}})}
      
          errorText={this.state.pinCode.error}
        
          keyboardType="numeric"
         
        />
  <View style={{flexDirection:'row'}}>
  <View  style={{flex:1,marginRight:0}}>
  <TextInput
          label="City (Required)*"
          returnKeyType="next"
          value={this.state.city.value}
          onChangeText={text =>  this.setState({city:{...this.state.city,value:text}})}
        
          errorText={this.state.city.error}
        
      
         
        />
  </View>
  <View style={{flex:1,marginLeft:10}}>
  <TextInput
          label="State (Required)*"
          returnKeyType="next"
          value={this.state.state.value}
          onChangeText={text =>  this.setState({state:{...this.state.state,value:text}})}
          
          errorText={this.state.state.error}
        
        
         
        />
  </View>
  </View>
  <TextInput
          label="House No. , Building Name (Required)*"
          returnKeyType="next"
          value={this.state.houseNo.value}
          onChangeText={text =>  this.setState({houseNo:{...this.state.houseNo,value:text}})}
      
          errorText={this.state.houseNo.error}
        
         
         
        />
        <TextInput
          label=" Area Colony , Road No. (Required)*"
          returnKeyType="next"
          value={this.state.roadNo.value}
          onChangeText={text =>  this.setState({roadNo:{...this.state.roadNo,value:text}})}
          
          errorText={this.state.roadNo.error}
        
          
         
        />
          <TextInput
          label="Add Nearby Landmark"
          returnKeyType="next"
          value={this.state.landmark.value}
          onChangeText={text =>  this.setState({landmark:{...this.state.landmark,value:text}})}
       
          errorText={this.state.landmark.error}
        
       
         
        />
      <View style={{flex:1,paddingVertical:5}}>
            <Button block onPress={()=>{
                this._onSignUpPressed();
              }} style={{backgroundColor:"#FF3D00",borderRadius:0,
              marginHorizontal:10,marginVertical:10,paddingHorizontal:'auto',paddingVertical:3}}>
              <Text style={{padding:0,margin:0,fontSize:17,color:'white'}}>Save Address</Text>
            </Button>
        
      </View>
            </View></ScrollView>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddressScreen);








const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
  
  
    
     
      paddingHorizontal:15,
      paddingTop:10
    },
 
  });