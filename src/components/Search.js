import React,{useState,memo} from 'react';
import {
    FlatList,
    View,
    ActivityIndicator,  Dimensions, 
    TouchableOpacity,Text,TextInput,StyleSheet
  } from 'react-native'
import {useTheme, Avatar} from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

import {data} from '../data/groceries';
import Card from '../components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get("screen");

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
            fullData: []
           
        };

      
    }

    componentDidMount() {
        this.makeRemoteRequest()
        }
       
        makeRemoteRequest = () => {
        
        
        this.setState({ loading: true });
       
     
        
        
        this.setState({
          data: data,
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
            const [search,setSearch]=useState('');
              return(
                <View>
    
                <View style={styles.search}>
                <View style={styles.searchBox}>
     <Ionicons name="ios-search" color="grey" size={22} />
        <TextInput 
          placeholder=" Search here for groceries .."
          placeholderTextColor="grey"
          onChangeText={this.handleSearch}
          autoCapitalize="none"
          style={{flex:1,paddingLeft:10,fontSize:17}}
        />
        
                </View>
 
      </View>
                </View>
              );
          }
    render(){
        return(
            <View style={{backgroundColor:"#fff"}} >

     
<FlatList
  data={this.state.data}
  renderItem={({ item }) => (
    <Card 
    itemData={item}
    onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData: item})}
/>
  )}
  keyExtractor={item => item.id}
  ListHeaderComponent={this.renderHeader}
  ListFooterComponent={this.renderFooter}
/>     
  </View>
        );
    }


}

const styles=StyleSheet.create({
    searchBox: {
        
       
        flexDirection:"row",
        backgroundColor: '#fff',
        
        alignSelf:'center',
        
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
     
        alignItems:'center',
        borderBottomColor:"#E0E0E0",
       
        borderRadius:5,
      },
      search:{
          backgroundColor:"#600EE6",
          paddingHorizontal:15,
          paddingBottom:15,
          width: width,
      }
})
export default memo(Search);