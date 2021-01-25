import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
function Headerbutton(props) {
    return (
     <HeaderButton iconSize={23} {...props} IconComponent={Icon}  color='white' />
    )
}

export default Headerbutton;
