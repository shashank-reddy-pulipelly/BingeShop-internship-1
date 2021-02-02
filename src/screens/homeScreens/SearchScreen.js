import React,{useState,memo} from 'react';
import {
    FlatList,
    View,
    ActivityIndicator,
    TouchableOpacity,Text,TextInput,StyleSheet,Platform,StatusBar,Keyboard,ScrollView
  } from 'react-native'
import {useTheme, Avatar} from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import {theme} from '../../core/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchArray} from '../../data/searchArray'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
           
        
            query: '',
            fullData: [],
            searchtext:''
           
        };

      
    }

    componentDidMount() {
        this.makeRemoteRequest()
        }
       
        makeRemoteRequest = () => {
        
        
        this.setState({ loading: true });
       
     
        
        
        this.setState({
        
        loading: false,
        fullData: SearchArray
        })
        
      
        }

        renderFooter = () => {
            if (!this.state.loading) return null
          
            return (
              <View
                style={{
                  paddingVertical: 20,
                  borderTopWidth: 1,
                  borderColor: '#CED0CE'
                }}>
                <ActivityIndicator animating size='large' />
              </View>
            )
          }

          handleSearch = text => {
            this.setState({searchtext:text});
            const formattedQuery = text.toLowerCase();
            const data = this.state.fullData.filter( item => {
              return this.contains(item, formattedQuery)
            })
            this.setState({ data, query: text })
          }

          contains = ({title}, query) => {
            const Title = title.toLowerCase();
          if(query==''){
            return false
          }
            if (Title.includes(query)) {
              return true
            }
            return false
          }
          
          renderHeader=()=>{
       
              return(
              
    
                <View style={styles.search}>
                <View style={styles.searchBox}>
   
                <Searchbar autoFocus onSubmitEditing={()=>this.props.navigation.navigate('SearchContentScreen',{title:this.state.searchtext})}
           placeholder='Search for products . . . . '
          inputStyle={{fontSize:17}}
        icon={()=>(<MaterialIcons name='arrow-back' style={{
          paddingLeft:2
         }} size={25}   />)}
          onChangeText={this.handleSearch}
       onIconPress={()=>this.props.navigation.navigate('Home')}
          value={this.state.searchtext}
          style={{flex:1,paddingLeft:5,fontSize:17,paddingVertical:2,borderRadius:0}}
        />
        
                </View>
 
      </View>
               
              );
          }
    render(){
      const ss=this.renderHeader();
        return(
            <View style={{backgroundColor:"#fff"}} >
  {ss}
  <View  > 
<FlatList
  data={this.state.data}
  renderItem={({ item }) => (
      <TouchableOpacity activeOpacity={.5} onPress={()=>{this.props.navigation.navigate('SearchContentScreen',{title:item.title})}}>
 <View style={{flexDirection:'row',padding:20,alignItems:'center' ,borderBottomColor:'#EEEEEE',
 borderBottomWidth:1.5,}} >
       <Ionicons name="ios-search" size={20}  />
     <Text style={{marginRight:'auto',marginLeft:20}}>{item.title}</Text>
     <MaterialCommunityIcons name="arrow-top-left" size={20} />

 </View>
 </TouchableOpacity>
  )}
  keyExtractor={item => item.id}

  ListFooterComponent={this.renderFooter}
/>     
</View>
  </View>
        );
    }


}

const styles=StyleSheet.create({
    searchBox: {
        flexDirection:"row",
        elevation:10,
     
       
      },
      search:{
         
     
         
          marginTop:Platform.OS === 'ios' ? 40:StatusBar.currentHeight,
         
        
          paddingTop:0,
          backgroundColor:theme.colors.primary,
          borderRadius:0

      }
})
export default memo(Search);