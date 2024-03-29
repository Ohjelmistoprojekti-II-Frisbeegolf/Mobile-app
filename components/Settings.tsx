import { View, Button } from 'native-base';
import { Alert, Linking } from "react-native";
import React from 'react';
import { styles } from './StyleSheet'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAIN_API_URL, userUrl } from "./Url";

interface User {
  userId: number,
  username: string,
  password: string,
  role: string,
  totalThrowsThrown: number,
  totalSteps: number,
  totalTimePlayed: number,
  gamesPlayed: number,

}

export default function Settings(props: any) {
  const logOut = async () => {
    Alert.alert(
      'Haluatko varmasti kirjautua ulos?',
      '',
      [
        {
          text: 'Kyllä',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            props.setLoggedIn(false);
          },
        },
        {
          text: 'Ei',
          style: 'cancel',
        },
      ],
    );
  };

  const deleteUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch(MAIN_API_URL + 'users/current', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log('Error getting current user');
        return;
      }

      const currentUser: User = await response.json();

      Alert.alert(
        'Haluatko varmasti poistaa tämän tunnuksen?',
        'Tämä toiminto poistaa käyttäjän sekä kaiken sen datan.',
        [
          {
            text: 'Kyllä',
            onPress: async () => {
              const deleteUrl = `${MAIN_API_URL}users/${currentUser.userId}`;
              const deleteResponse = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (deleteResponse.ok) {
                await AsyncStorage.removeItem('token');
                props.setLoggedIn(false);
                console.log('User removed successfully');
              } else {
                console.log('Error removing user');
              }
            },
          },
          {
            text: 'Ei',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.view}>
      <Button _pressed={{ opacity: 0.5 }} style={styles.button} isDisabled>Nollaa tilastot</Button>
      <Button _pressed={{ opacity: 0.5 }} style={styles.button} onPress={() => {
        Linking.openSettings();
      }}>Puhelimen asetukset</Button>
      <Button _pressed={{ opacity: 0.5 }} style={styles.button} onPress={deleteUser}>Poista tunnus</Button>
      <Button _pressed={{ opacity: 0.5 }} style={styles.button} onPress={logOut}>Kirjaudu ulos</Button>
    </View>
  );
}  