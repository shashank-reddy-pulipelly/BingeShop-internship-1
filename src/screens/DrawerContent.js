import React,{memo} from 'react';
import { View, StyleSheet,StatusBar } from 'react-native';
import { Avatar, Title,Caption,Paragraph,Drawer,Text,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../core/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

 function DrawerContent(props) {

    const { signOut} = React.useContext(AuthContext);
 
    

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <StatusBar translucent={true} backgroundColor={theme.colors.primary} />
                <View style={styles.drawerContent}>
                    
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,alignItems:'center'}}>
                          
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Hello, Shashank reddy</Title>
                              
                            </View>
                        </View>

                     
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            activeBackgroundColor={theme.colors.black}
                            labelStyle={{fontWeight:'bold'}}
                            onPress={() => {props.navigation.navigate('HomeDrawer')}}
                        />
                                   <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="brightness-percent" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="All Offers"
                            labelStyle={{fontWeight:'bold'}}
                            onPress={() => {}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="heart" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My WishList"
                            labelStyle={{fontWeight:'bold'}}
                            onPress={() => {props.navigation.navigate('FavoriteScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cart" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Cart"
                            activeBackgroundColor={theme.colors.black}
                            labelStyle={{fontWeight:'bold'}}
                            onPress={() => {props.navigation.navigate('CartDrawer',{screen:'CartScreen'})}}
                        />
                       <DrawerItem 
                            icon={({color, size}) => (
                                <FontAwesome
                                name="list" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Orders"
                            labelStyle={{fontWeight:'bold'}}
                            onPress={() => {props.navigation.navigate('OrderDrawer',{screen:'OrdersScreen'})}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Products"
                            labelStyle={{fontWeight:'bold',padding:0,margin:0}}
                            style={{margin:0,padding:0}}
                            onPress={() => {props.navigation.navigate('ProductsDrawer')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Vendor Orders"
                            labelStyle={{fontWeight:'bold',padding:0,margin:0}}
                            style={{margin:0,padding:0}}
                            onPress={() => {props.navigation.navigate('VendorOrdersDrawer')}}
                        />
                   
                      
                    </Drawer.Section>
                 
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={{fontWeight:'bold'}}
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
        paddingTop:0,
        marginTop:-4,
        
    },
    userInfoSection: {
      paddingLeft: 20,
      backgroundColor:theme.colors.primary
    },
    title: {
      fontSize: 18,
      marginTop: 10,
     marginBottom:30,
      color:'white'
    },
    caption: {
      fontSize: 14,
      lineHeight: 16,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {


      backgroundColor:'white'
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#ECEFF1',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    
    },
  });

  export default memo(DrawerContent);