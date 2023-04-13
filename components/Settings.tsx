import MyDrawer from "./Menu";
import {Text,View,Button,Image} from 'native-base';
import React from 'react';
import { styles } from './StyleSheet'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings(props:any) {
    const kirjauduUlos = async () => {
        await AsyncStorage.removeItem('token');
        props.setLoggedIn(false);
    }
    return(
        <View style={styles.view}>
            <Button _pressed={{ opacity: 0.5 }} style={styles.button}>Nollaa tilastot</Button>
            <Button _pressed={{ opacity: 0.5 }} style={styles.button}>Puhelimen asetukset</Button>
            <Button _pressed={{ opacity: 0.5 }} style={styles.button}>Poista tunnus</Button>
            <Button _pressed={{ opacity: 0.5 }} style={styles.button} onPress={kirjauduUlos}>Kirjaudu ulos</Button>
        </View>
    );

}
