import {Text,View,Button} from 'native-base';
import React, { useState, useEffect } from 'react';
import { styles } from './StyleSheet';
import { ActivityIndicator } from 'react-native'

interface Course {
    courseId: number,
    courseName: string,
    holes: {
        holeId: number,
        holeNumber: number,
        holePar: number,
    }
}

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

    const [repository, setRepository] = useState<Course>({
        courseId: 1,
        courseName: "",
        holes: {
            holeId: 1,
            holeNumber: 1,
            holePar: 1,
            }
    });
    

    useEffect(() => fetchData(),[]);

    const fetchData = () => {
        fetch('https://dev-discgolf.herokuapp.com/courses/1')
        .then(res => res.json())
        .then(data => {
            setRepository(data)
        }
        )
        .catch(err => console.log(err))
        console.log(repository.holes)
    }

    return(
        <View style={styles.view}>
            <Text style={styles.header}>Väylä: {repository.holeNumber}</Text>
            <Text style={styles.header}>Par: {repository.holePar}</Text>
            <Text style={styles.header}> Heitot: </Text>
        <View style={{marginBottom: '120%'}}>
            <ThrowCounter />
        </View>
        <View style={styles.throwButtonView}>
                <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton}>Edellinen väylä (#)</Button>
                <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton}>Seuraava väylä (#)</Button>
        </View>
        </View>
    );

}