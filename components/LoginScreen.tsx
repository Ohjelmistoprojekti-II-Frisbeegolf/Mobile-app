import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { styles } from './StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, setLoggedIn }: { navigation: any, setLoggedIn: any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://discgolf-security.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        await AsyncStorage.setItem('token', token);
        console.log('Success!');
        setLoggedIn(true); // set loggedIn state to true
      } else {
        alert('Virheellinen käyttäjätunnus tai salasana');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Kirjaudu sisään</Text>
      <TextInput
        style={styles.input}
        placeholder='Käyttäjätunnus'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Salasana'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title='Kirjaudu' onPress={handleLogin} />
      <Button title='Rekisteröidy' onPress={() => navigation.navigate("Rekisteröidy")} />
    </View>
  );
}
