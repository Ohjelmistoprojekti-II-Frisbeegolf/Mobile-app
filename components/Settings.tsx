import MyDrawer from "./Menu";
import { Text, View, Button } from 'native-base';
import { Alert } from "react-native";
import React from 'react';
import { styles } from './StyleSheet'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userUrl } from "./Url";

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
  const kirjauduUlos = async () => {
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


  const poistaTunnus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
  
      const response = await fetch(userUrl, {
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
      console.log(currentUser);
  
      Alert.alert(
        'Haluatko varmasti poistaa tämän tunnuksen?',
        'Tämä toiminto poistaa käyttäjän sekä kaiken sen datan.',
        [
          {
            text: 'Kyllä',
            onPress: async () => {
              const deleteUrl = `https://dev-discgolf.herokuapp.com/users/${currentUser.userId}`;
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
            }
          },
          {
            text: 'Ei',
            style: 'cancel'
          },
        ]
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={styles.view}>
      <Button _pressed={{ opacity: 0.5 }} style={styles.button}>Nollaa tilastot</Button>
      <Button _pressed={{ opacity: 0.5 }} style={styles.button}>Puhelimen asetukset</Button>
  
      <Button _pressed={{ opacity: 0.5 }} style={styles.button} onPress={poistaTunnus}>Poista tunnus</Button>
      <Button _pressed={{ opacity: 0.5 }} style={styles.button} onPress={kirjauduUlos}>Kirjaudu ulos</Button>
    </View>
  );
  }  