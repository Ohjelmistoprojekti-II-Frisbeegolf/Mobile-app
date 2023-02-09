import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import Firstpage from "./components/Firstpage";
import AppBar from "./components/AppBar";

export default function App() {
  return (
    <NativeBaseProvider>
      <AppBar/>
      <Firstpage/>
    </NativeBaseProvider>
  );
}

