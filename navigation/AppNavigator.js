import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/home'
import ChatRoom from '../Screens/ChatRoom'


const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
}

export default ChatStack
