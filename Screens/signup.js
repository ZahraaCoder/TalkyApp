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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      photourl: '',
    };
  }

  handleSignup = (email, password) => {
    console.log(email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        if (user) {
          const { name, photourl } = this.state;
          user
            .updateProfile({
              displayName: name,
              photoURL: photourl,
            })
            .then(() => {
              console.log('User name updated successfully');
            })
            .catch((error) => {
              console.log('Error updating user name:', error);
            });
        }
        Alert.alert('New User Created');
        db.collection('users').doc(user.uid).set({
          name: this.state.name,
          email: this.state.email,
          photourl: this.state.photourl,
          uid: user.uid,
        });
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  render() {
    //Object destructuring
    const { email, password } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/bg_img_talky.png')}
          style={styles.bgimg}>
          <View style={styles.upperContainer}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              We are so excited to see you again
            </Text>
            <Text style={styles.title}>Create Account</Text>
            <Image
              source={require('../assets/logo11.png')}
              style={{ marginTop: 10 }}
            />
          </View>

          <View style={styles.lowerContainer}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
              secureTextEntry
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
              secureTextEntry
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
              }}></View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.handleSignup(email, password);
              }}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text>Already a user? Login Here </Text>
            </TouchableOpacity>
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
    flex: 0.2,
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 0.8,
    marginLeft: 50,
    paddingTop: 50,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
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
  subtitle: {
    color: "lightgrey",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
});
