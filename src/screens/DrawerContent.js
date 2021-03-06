import React,{memo} from 'react';
import { View, StyleSheet,StatusBar } from 'react-native';
import { Title,Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../core/theme';
import { AuthContext } from '../components/context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

 function DrawerContent(props) {


    const { skipOff } = React.useContext(AuthContext);
    

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <StatusBar translucent={true} backgroundColor={theme.colors.primary} />
                
                <View style={styles.drawerContent}>
                    
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,alignItems:'center'}}>
                          
                            <View style={{ flexDirection:'column'}}>
                                <Title style={styles.title}>Welcome to BingeShop</Title>
                              
                            </View>
                        </View>

                     
                    </View>
                    {firebase.auth().currentUser?null:  <Drawer.Section style={[styles.bottomDrawerSection,{paddingTop:10}]}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="login-variant" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Login"
                    labelStyle={{fontWeight:'bold'}}
                    onPress={() => {
                    skipOff();}}
                />
            </Drawer.Section>}
                
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
                            onPress={() => {props.navigation.navigate('OfferDrawer')}}
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
                     
                   
                      
                    </Drawer.Section>
                 
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="logout" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="log Out"
                    labelStyle={{fontWeight:'bold'}}
                    onPress={async() => {
                        if(firebase.auth().currentUser){
                            await firebase.auth().signOut();
                            skipOff();
                        }
                        else{
                            skipOff();  
                        }
                    }}
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


      backgroundColor:'white',
      paddingTop:10
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