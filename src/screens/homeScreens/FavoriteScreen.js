import React,{memo,Component} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {data} from '../../data/groceries';
import Card from '../../components/Card';
const mapStateToProps = state => {
    return {

      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class FavoriteScreen extends Component{
  render(){
    const renderItem = ({item}) => {
      return (
          <Card 
              itemData={item}
              onPress={()=> this.props.navigation.navigate('CardItemDetails', {itemData: item})}
          />
      );
  };
    return(
      <View style={styles.container}>
      <FlatList style={styles.list}
               data={data.filter(item => this.props.favorites.some(el => el === item.id))}
               renderItem={renderItem}
               keyExtractor={item => item.id}
           />
           
         </View>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FavoriteScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor:"#fff",
    flexDirection:'row'
  },
  list:{
    flex:0.5
  }
});
