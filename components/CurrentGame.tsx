import {Text,View,Button} from 'native-base';
import React, { useState } from 'react';
import { styles } from './StyleSheet';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ThrowCounter = () => {
    const [throwCount, setThrowCount] = useState(0);
    if (throwCount < 0 ) {
        setThrowCount(0)
    }
    return (
        <View style={styles.throwCounterView}>
            <Button
                _pressed={{ opacity: 0.5 }}
                style={styles.throwButton}
                onPress={() => setThrowCount(throwCount - 1)}>
            -
            </Button>
            <Text style={styles.throwCounterText}>{throwCount}</Text>
            <Button 
                _pressed={{ opacity: 0.5 }}
                style={styles.throwButton}
                onPress={() => setThrowCount(throwCount + 1)}>
            +
            </Button>
        </View>
    )

}

export default function CurrentGame({navigation}:  {navigation: any}) {

    return(
        <View style={styles.view}>
        <Text style={styles.header}> Heitot: </Text>
        <View style={{marginBottom: '130%'}}>
            <ThrowCounter />
        </View>
        <View style={styles.throwButtonView}>
                <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton}>Edellinen väylä (#)</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton}>Seuraava väylä (#)</Button>
        </View>
        </View>
    );

}