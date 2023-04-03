import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { styles } from './StyleSheet';
import Firstpage from './Firstpage';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  console.log('loggedIn:', loggedIn); // Debug statement

  const handleLogin = async () => {
    try {
      const response = await fetch('https://discgolf-security.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setLoggedIn(true);
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
      </View>
    );
  }

