import {Text,View,Button,Image} from 'native-base';
import React from 'react';
import { styles } from './StyleSheet'

export default function CurrentGame({navigation}:  {navigation: any}) {

    return(
        <View style={styles.view}>
            <Text style={styles.text}>Nykyinen peli</Text>
        </View>
    );

}