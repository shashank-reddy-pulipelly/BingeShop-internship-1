import React,{memo} from 'react';
import {
    FlatList,
    View,
    ActivityIndicator,  Dimensions, 
    TouchableOpacity,Text,TextInput,StyleSheet,ScrollView,SafeAreaView
  } from 'react-native'
import {useTheme, Avatar} from 'react-native-paper';
import { Searchbar } from 'react-native-paper';


import Card from '../components/Card';
import Shop from '../components/Shop';
import Modal from '../components/Modal';
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
          data: this.props.data,
        loading: false,
        fullData:this.props.data
        })
        
      
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
         const title=' Search for '+this.props.title+' ..'
              return(
                <View >
    
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
     <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Shop 
              itemData={item}
              onPress={()=> this.props.navigation.navigate('CardListScreen', {title: 'Groceries'})}
          />
            )}
            keyExtractor={item => item.id}
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


            <FlatList
    data={this.state.data}
    renderItem={({ item }) => (
      <Card 
      itemData={item}
      onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData: item})}
       />
    )}
    keyExtractor={item => item.id}
    ListHeaderComponent={()=><View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'grey'}}>
    
    <View style={{marginLeft:'auto'}}><Modal/></View>
              
  
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
          backgroundColor:"#600EE6",
          paddingHorizontal:15,
          paddingBottom:15,
          width: width,
      }
})
export default memo(Search);