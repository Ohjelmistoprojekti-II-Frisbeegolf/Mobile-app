import React from "react";
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppBar() {
    return <>
        <StatusBar barStyle="dark-content" />
        <Box safeAreaTop bg="black" />
        <HStack bg="black" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
          <HStack alignItems="center">
            <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
            <Text color="white" fontSize="20" fontWeight="bold">
              Home
            </Text>
          </HStack>
        </HStack>
      </>;
  }