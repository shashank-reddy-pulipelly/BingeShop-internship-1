import React,{useState,memo} from 'react';
import {
    FlatList,
    View,
    ActivityIndicator,
    TouchableOpacity,Text,TextInput,StyleSheet
  } from 'react-native'
import {useTheme, Avatar} from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import {theme} from '../../core/theme';
import {data} from '../../data/groceries';
import Card from '../../components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
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
        fullData: data
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
   
        <Searchbar
           placeholder='Search for Products ...'
          inputStyle={{fontSize:16}}
         
          onChangeText={this.handleSearch}
       
          value={this.state.searchtext}
          style={{flex:1,paddingLeft:10,fontSize:15}}
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
  <View > 
<FlatList
  data={this.state.data}
  renderItem={({ item }) => (
    <Card 
    itemData={item}
    onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData: item})}
/>
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
        borderRadius:5
      },
      search:{
          backgroundColor:theme.colors.primary,
          paddingHorizontal:15,
          paddingBottom:15,

      }
})
export default memo(Search);