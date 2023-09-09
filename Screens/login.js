import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = (email, password) => {
    console.log('handleLogin');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        this.props.navigation.navigate('Home');
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  render() {
    const {email,password}=this.state
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/bg_img_talky.png')}
          style={styles.bgimg}>
          <View style={styles.upperContainer}>
            <Text style={styles.title}>Login</Text>
            <Image
              source={require('../assets/logo11.png')}
              style={{ marginTop: 20 }}
            />
          </View>

          <View style={styles.lowerContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
              secureTextEntry
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
                marginRight: 50,
              }}>
              <Text>Remember Me</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ForgotPassword');
                }}>
                <Text>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                  this.handleLogin(email,password)
                }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 60,
                alignSelf: 'center',
                marginRight: 50,
              }}>
              <Text> Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
                <Text>Sign up </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffff',
    paddingTop: StatusBar.currentHeight,
  },
  bgimg: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 0.7,
    marginLeft: 50,
    paddingTop: 50,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
  },
  input: {
    width: '85%',
    height: 47,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#d8d8dd',
    paddingLeft: 17,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 15,
  },
  button: {
    width: '85%',
    backgroundColor: '#F8B388',
    height: 60,
    borderRadius: 8,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#8c1aff',
  },
});
