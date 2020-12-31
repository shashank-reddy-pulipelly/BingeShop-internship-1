import React,{useState,Component} from 'react'
import { RadioButton, Checkbox  } from 'react-native-paper';
import {
    Alert,
    Modal,
    StyleSheet,
    Text, Dimensions,
    TouchableHighlight,TouchableOpacity,
    View,SafeAreaView,ScrollView
  } from "react-native";
  import {theme} from '../core/theme';
import { FlatList } from 'react-native-gesture-handler';

 

const FilterItems=(props)=>{
    return(
        <FlatList  
        data={props.filter}
        renderItem={({ item }) => {
        return(
            <TouchableOpacity onPress={()=>props.ItemHandler(item)} >
    
                
            <Checkbox.Item labelStyle={{color:'#616161'}} color={theme.colors.primary} label={item} status={props.Array1.some(e=>e==item)==true?'checked':'unchecked'}/>
            </TouchableOpacity>
        )
        }}
        keyExtractor={item => item}/>
    )
}

export default FilterItems;

