import MyDrawer from "./Menu";
import {Text,View,Button,Image} from 'native-base';
import React from 'react';
import { styles } from './StyleSheet'

export default function Settings() {

    return(
        <View style={styles.view}>
            <Button style={styles.button}>Nollaa tilastot</Button>
            <Button style={styles.button}>Puhelimen asetukset</Button>
            <Button style={styles.button}>Poista tunnus</Button>
            <Button style={styles.button}>Kirjaudu ulos</Button>
        </View>
    );

}
