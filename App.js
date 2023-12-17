import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import { View, ActivityIndicator } from 'react-native';
import {onAuthStateChanged} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react';
import Chat from './screens/Chat';
import { auth } from './config/firebase';

const Stack = createStackNavigator();
const AuthUserContext = createContext();

const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthUserContext.Provider>
  )
}

const ChatStack = () => {
   return(
    <Stack.Navigator defaultScreenOptions={Home}>
       <Stack.Screen name="Home" component={Home}/>
       <Stack.Screen name="Chat" component={Chat}/>
    </Stack.Navigator>
   )
}
const AuthStack = () => {
  return(
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
       <Stack.Screen name="Login" component={Login}/>
       <Stack.Screen name="SignUp" component={SignUp}/>
    </Stack.Navigator>
   )
}

const RootNavigator = () => {
  const {user, setUser} = useContext(AuthUserContext);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      authUser ? setUser(authUser) : setUser(null)
      setLoading(false)
    } )

    return () => unsubscribe()
  }, [user])

  if(loading){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }
  return(
    <NavigationContainer>
     {user? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default function App() {
   return(
    <AuthUserProvider>
      <RootNavigator/>
    </AuthUserProvider>
   ) 
}

