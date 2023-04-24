import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyDrawer from './components/Menu';
import LoginScreen from './components/LoginScreen';
import CurrentGame from './components/CurrentGame';
import ChooseCourse from './components/ChooseCourse';
import Registration from './components/Registration';

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {loggedIn ? (
            <>
              <Stack.Screen 
                name='Poistu'   
                options={{ headerShown: false }}>
                {(props) => <MyDrawer {...props} setLoggedIn={setLoggedIn} />}
                </Stack.Screen>
              <Stack.Screen
                name=" "
                component={CurrentGame}
                options={{headerStyle:{
                backgroundColor: 'green',
              },headerTintColor: 'white',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
              }
          }}/>
              
            </>
          ) : (
            <>
            <Stack.Screen name='Kirjaudu sisään'
              options={{headerStyle:{
              backgroundColor: 'green',
              },headerTintColor: 'white',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
              }
            }}>
              {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
                name="Rekisteröidy"
                component={Registration}
                options={{headerStyle:{
                backgroundColor: 'green',
              },headerTintColor: 'white',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
              }, headerBackTitle: 'Takaisin'
            }}/>
          </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


// <MyDrawer/>
