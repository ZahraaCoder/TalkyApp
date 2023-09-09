import Splash from '../Screens/splash'
import Login from '../Screens/login'
import Signup from '../Screens/signup'
import Home from '../Screens/home'
import ForgotPassword from '../Screens/forgotpassword'
import ChatStack from './AppNavigator'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack= ()=> {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={ChatStack} />
    </Stack.Navigator>
  );
}

export default AuthStack;