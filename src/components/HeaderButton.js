import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
function Headerbutton(props) {
    return (
     <HeaderButton {...props} IconComponent={Icon} iconSize={23} color='white' />
    )
}

export default Headerbutton;
