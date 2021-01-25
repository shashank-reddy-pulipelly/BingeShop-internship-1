import React,{ memo } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../core/theme';

const OpenScreen = ({navigation}) => {


    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: "#fff"
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: "black"
            }]}>The Best Online Grocery store in India</Text>
            <Text style={styles.text}>Sign in with mobile Number</Text>
          
            <View style={styles.button}>
                <TouchableOpacity activeOpacity={.8}
                    style={styles.signIn}
                    onPress={() =>   navigation.navigate('LoginScreen')}
                >
                <LinearGradient
                    colors={['#448AFF','#0000d6']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Get Started</Text>
                </LinearGradient>
                </TouchableOpacity>

            </View>
          
        </Animatable.View>
      </View>
    );
};

export default memo(OpenScreen);

const {height} = Dimensions.get("screen");
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:theme.colors.primary
  },
  header: {
      flex: 2.5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1.3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 40,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 25,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:10
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
    width:'100%'
},
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},

});