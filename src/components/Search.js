import React,{memo} from 'react';
import {
    FlatList,
    View,Dimensions, 
    StyleSheet,
  } from 'react-native'

import { Searchbar } from 'react-native-paper';

import { theme } from '../core/theme';
import Card from '../components/Card';
import Shop from '../components/Shop';
import Modal from '../components/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get("screen");

class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
           
            data: [],
            query: '',
            fullData: [],
            searchtext:''
           
        };

      
    }
    makeRemoteRequest = () => {
        
        
      
     
   
      
      
      this.setState({
        data: this.props.data,
      loading: false,
      fullData:this.props.data
      })
      
    
      }
     load=()=>{
      this.setState({
        data: this.props.data,
        searchtext:'',
      fullData:this.props.data
      })
     } 
    componentDidMount() {
      
        this.makeRemoteRequest()
        }
       
  

        renderFooter = () => {
            return (
              <View >
                
              </View>
            )
          }

          handleSearch = text => {
            this.setState({searchtext:text});

            const formattedQuery = text.toLowerCase();
            const data = this.props.data.filter( item => {
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
         const title=' Search for '+this.props.title+' ..'
              return(
                <View >
    
                <View style={styles.search}>
                <View style={styles.searchBox}>
  
     <Searchbar
           placeholder={title}
          inputStyle={{fontSize:16}}
         
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
      if(this.props.cardType=='shop'){
        return(
          <View style={{backgroundColor:"#fff",flexDirection:'column',flex:1}} >
        
            {ss}
         
          
     <View style={{flex:10}}>
     <FlatList onRefresh={()=>{
       this.load();
       this.props.load();}} refreshing={this.props.isRefreshing}
            data={this.state.data}
            renderItem={({ item }) => (
              <Shop 
              itemData={item}
              onPress={(shopId)=> this.props.navigation.navigate('CardListScreen', {title:this.props.shopType,shopId,shopType:this.props.shopType})}
          />
            )}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={()=><View></View>}
            ListFooterComponent={this.renderFooter}
          />
     </View>
         
            </View>
        )
      }
      else if(this.props.cardType=='card'){
return(
  <View style={{backgroundColor:"#fff",flexDirection:'column',flex:1}} >

{ss}


<View style={{flex:10}}>


            <FlatList onRefresh={()=>{
       this.load();
       this.props.load();}} refreshing={this.props.isRefreshing}
    data={this.state.data}
    renderItem={({ item }) => (
      <Card 
      itemData={item} shopId={this.props.shopId} 
      onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData: item,shopId:this.props.shopId})}
       />
    )}
    keyExtractor={item => item.id.toString()}
    ListHeaderComponent={()=><View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'grey'}}>
    
    <View ><Modal/></View>
              
  
              </View>}
    ListFooterComponent={this.renderFooter}
  />   

  
    </View>
    </View>
)
      }
     
    }


}

const styles=StyleSheet.create({
    searchBox: {
        
       
        flexDirection:"row",
        
      
       
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