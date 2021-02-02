import React,{memo} from 'react';
import {
    FlatList,
    View,
    ActivityIndicator,  Dimensions, 
    TouchableOpacity,Text,TextInput,StyleSheet,ScrollView,SafeAreaView
  } from 'react-native'

import { Searchbar } from 'react-native-paper';

import { theme } from '../../core/theme';
import Modal from '../../components/Modal';
import ProductCard from './ProductCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get("screen");

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
    makeRemoteRequest = () => {
        
        
      this.setState({ loading: true });
     
   
      
      
      this.setState({
        data: this.props.data,
      loading: false,
      fullData:this.props.data
      })
      
    
      }
      
    componentDidMount() {
        this.makeRemoteRequest()
        }
       
       

        renderFooter = () => {
            if (!this.state.loading) return null
          
            return (
              <View >
                
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
            if (Title.includes(query)) {
              return true
            }
            return false
          }
          
          renderHeader=()=>{
    
              return(
                <View >
    
                <View style={styles.search}>
                <View style={styles.searchBox}>
  
     <Searchbar
           placeholder='Search for Products ...'
          inputStyle={{fontSize:15}}
         
          onChangeText={this.handleSearch}
       
          value={this.state.searchtext}
          style={{flex:1,paddingLeft:10,fontSize:15}}
        />
        
                </View>
 
      </View>
                </View>
              );
          }
    render(){
     const ss=this.renderHeader();
   

return(
  <View style={{backgroundColor:"#fff",flexDirection:'column',flex:1}} >

{ss}


<View style={{flex:10}}>


            <FlatList
    data={this.state.data}
    renderItem={({ item }) => (
      <ProductCard
      itemData={item} navigation={this.props.navigation}
      
       />
    )}
    keyExtractor={item => Math.random().toString()}
    ListHeaderComponent={()=><View >
    
 
              
  
              </View>}
    ListFooterComponent={this.renderFooter}
  />   

  
    </View>
    </View>
)
    
     
    }


}

const styles=StyleSheet.create({
    searchBox: {
        
       
        flexDirection:"row",
        
        height:45,
       
        borderRadius:5,
      },
      search:{
          backgroundColor:theme.colors.primary,
          paddingHorizontal:15,
          paddingBottom:15,
          width: width,
         
      }
})
export default memo(Search);