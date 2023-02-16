import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './components/Menu';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

