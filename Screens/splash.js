import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground,TouchableOpacity,Image } from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bg_img_talky.png')}
          style={styles.bgimg}>

          <View style={{marginTop:100}}>
          <Image source={require('../assets/logo1.png')} styles={styles.logo}/>
          </View>

          <Text style={styles.text}>Unbounded Conversations, Infinite Rooms</Text>

          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('Login')}}>
          <Text style={styles.buttonText}> Get Started</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  bgimg: {
    flex: 1,
     alignItems:'center'
  },
   button: {
    width: '65%',
    backgroundColor: '#F8B388',
    height: 60,
    borderRadius: 8,
    marginTop:50,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
    borderColor:'grey'
  },
  buttonText:{
    fontSize:25,
    fontWeight:'bold',
    color:'#8c1aff'
  },
  logo:{
    width:20,
    height:20,
    borderWidth:2
  },
  text:{
    fontSize:18
  }
});
