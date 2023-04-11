import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyDrawer from './components/Menu';
import LoginScreen from './components/LoginScreen';
import Firstpage from './components/Firstpage';

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {loggedIn ? (
            <>
              <Stack.Screen name='MyDrawer' component={MyDrawer} options={{headerShown: false}} />
            </>
          ) : (
            <Stack.Screen name='Kirjaudu'>
              {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
