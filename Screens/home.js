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
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      roomName: '',
      chatRooms: [],
    };
  }

  fetchUserDetails = async () => {
    console.log('fetching user details...');
    const user = firebase.auth().currentUser;
    console.log('user', user);
    if (user) {
      const { uid, displayName, photoURL, email } = user;
      this.setState({ displayName: displayName });
    }
  };

  fetchRooms = async () => {
    db.collection('chatRooms')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          this.setState({ chatRooms: [...this.state.chatRooms, doc.data()] });
        });
      });
  };

  handleJoinRoom = async () => {
    const { roomName } = this.state;
    console.log('handlejoinroom' + roomName);
    if (roomName) {
      const roomRef = db.collection('chatRooms').doc(roomName);
      const snapshot = await roomRef.get();
      if (!snapshot.exists) {
        await roomRef.set({
          name: roomName,
          created_by: this.state.displayName,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    }
    this.props.navigation.navigate('ChatRoom', { roomName });
  };

  componentDidMount = async () => {
    await this.fetchUserDetails();
    await this.fetchRooms();
  };

  renderItem = ({ item }) => {
    console.log("item",item.name)
    return (
      <View style={{marginTop:30}}>
      <TouchableOpacity >
        <Text style={{alignSelf:'center',fontSize:20}}>{item.name}</Text>
        </TouchableOpacity>
       
      </View>
    );
  };

  keyExtractor = (item, index) => {
    index.toString();
  };

  render() {
    const { email, password, roomName,chatRooms } = this.state;
    console.log("rooms",chatRooms)
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/bg_img_talky.png')}
          style={styles.bgimg}>
          <View style={styles.upperContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity style={{ marginLeft: 10, marginTop: 20 }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Welcome Zahraa</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder={'Enter the room name'}
              onChangeText={(text) => {
                this.setState({ roomName: text });
              }}
              value={this.state.roomName}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleJoinRoom()}>
              <Text style={styles.buttonText}>Create Room</Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                color: 'white',
                marginRight: 90,
                marginTop: 70,
              }}>          
              Join Rooms
            </Text>

            
          </View>
          <View style={styles.lowerContainer}>
          <FlatList
              data={this.state.chatRooms}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
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
    marginLeft: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 90,
    marginTop: 70,
  },
  input: {
    borderWidth: 0.5,
    width: '70%',
    height: 40,
    borderRadius: 20,
    alignSelf: 'center',
    paddingLeft: 20,
    marginTop: 30,
    marginBottom: 20,
    borderColor: 'white',
  },
  text: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    width: '60%',
    backgroundColor: '#F8B388',
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: '#8c1aff',
  },
  lowerContainer:{
    flex:0.7
  }
});
