import React,{Component} from 'react'
import {View,Text,TextInput,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,ImageBackground} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

export default class ChatRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      roomName:this.props.route.params.roomName,
      messages:[]
    }
  }
  
  render(){
    const {messages,roomName} = this.state
    return(
      <SafeAreaView style={styles.container}>
       <ImageBackground
          source={require('../assets/bg_img_talky.png')}
          style={styles.bgimg}>
      <Text style={{alignSelf:'center',marginTop:100,fontSize:25}}> {roomName}</Text>
      <GiftedChat messages={messages}/>
      </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ffff',
    paddingTop: StatusBar.currentHeight,
  },
  bgimg: {
    flex: 1
  }
})