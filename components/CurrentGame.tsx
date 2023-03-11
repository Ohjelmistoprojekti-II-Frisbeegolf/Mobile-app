import {Text,View,Button} from 'native-base';
import React from 'react';
import { styles } from './StyleSheet';
import { TouchableOpacity } from 'react-native';

export default function CurrentGame({navigation}:  {navigation: any}) {

    return(
        <View style={styles.view}>
        <Text style={styles.header}> Heitot: </Text>
            <View style={styles.throwButtonView}>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>1</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>2</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>3</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>4</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>5</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>6</Button>
            </View>
            <View style={styles.throwButtonView}>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>7</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>8</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>9</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>10</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>11</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}>12</Button>
            </View>
            <View style={{ height: 500  }}>

            </View>
            <View style={styles.throwButtonView}>
                <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton}>Edellinen väylä (#)</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton}>Seuraava väylä (#)</Button>
            </View>
        </View>
    );

}