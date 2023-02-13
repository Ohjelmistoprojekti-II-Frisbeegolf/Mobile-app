import 'react-native-gesture-handler';
import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import Firstpage from "./components/Firstpage";
import AppBar from "./components/AppBar";
import Menu from './components/Menu';
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

