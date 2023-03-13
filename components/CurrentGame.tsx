import {Text,View,Button} from 'native-base';
import React from 'react';
import { styles } from './StyleSheet';
import { TouchableOpacity } from 'react-native';

export default function CurrentGame({navigation}:  {navigation: any}) {

    return(
        <View style={styles.view}>
        <Text style={styles.header}> Heitot: </Text>
            <View style={styles.throwButtonView}>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>1</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>2</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>3</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>4</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>5</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>6</Text></Button>
            </View>
            <View style={styles.throwButtonView}>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>7</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>8</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>9</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>10</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>11</Text></Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.throwButton}><Text style={styles.text}>12</Text></Button>
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