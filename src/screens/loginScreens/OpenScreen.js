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


const OpenScreen = ({navigation}) => {


    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#600EE6' barStyle="light-content"/>
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
            <Text style={styles.text}>Sign in with your account</Text>
          
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>  navigation.navigate('LoginScreen')}
                >
                <LinearGradient
                    colors={['#600EE6','#311B92']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}
                    style={[styles.signIn, {
                        borderColor: '#600EE6',
                        borderWidth: 1,
                        marginTop: 20,
                        backgroundColor:'#fff'
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#600EE6'
                    }]}>Sign Up</Text>
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
    backgroundColor: '#600EE6'
  },
  header: {
      flex: 1.5,
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
    borderRadius: 30
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},

});