import { Text, View, Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import { styles } from './StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Course {
    courseId: number,
    courseName: string,
    holes: Hole[]
}

interface Hole {
    holeId: number,
    holeLength: number,
    holeNumber: number,
    holePar: number
}

interface Stroke {
    hole: Hole
    gameId: number
    courseId: number
    score: number
}

export default function CurrentGame({ route, navigation }: any) {

    const [repository, setRepository] = useState<Course>({
        courseId: 1,
        courseName: "",
        holes: []
    });
    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        setStrokes(repository.holes.map(hole => { return ({ hole: hole, gameId: 4, courseId: route.params.courseId, score: 0 }) }))
    }, [repository]);

    const handleStroke = (index: number, operator: string) => {
        const data = [...strokes];
        data[index].score = operator === "-" ? data[index].score - 1 : data[index].score + 1
        setStrokes(data);
        console.log(strokes[index])
    }

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(`Bearer ${token}`)
        const response = await fetch(`https://dev-discgolf.herokuapp.com/courses/${route.params.courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setRepository(data);
    }

    useEffect(() => {
        fetchData();
    }, [])

      

    return (
        strokes.length < 1 ?
            <View></View>
            :
            <View style={styles.view}>
                <Text style={styles.header}>Väylä: {strokes[index].hole.holeNumber}</Text>
                <Text style={styles.header}>Par: {strokes[index].hole.holePar}</Text>
                <Text style={styles.header}>Pituus: {strokes[index].hole.holeLength}m</Text>
                <Text style={styles.header}> Heitot: </Text>
                <View style={{ marginBottom: '100%' }}>
                    <View style={styles.throwCounterView}>
                        <Button
                            _pressed={{ opacity: 0.5 }}
                            style={styles.throwButton}
                            isDisabled={strokes[index].score === 0}
                            onPress={() => handleStroke(index, '-')}
                        >
                            -
                        </Button>
                        <Text style={styles.throwCounterText}>{strokes[index].score}</Text>
                        <Button
                            _pressed={{ opacity: 0.5 }}
                            style={styles.throwButton}
                            onPress={() => handleStroke(index, '+')}
                        >
                            +
                        </Button>
                    </View>
                </View>
                    <View style={styles.throwButtonView}>
                        <Button
                            _pressed={{ opacity: 0.5 }}
                            isDisabled={index === 0}
                            style={styles.nextPreviousButton}
                            onPress={() => setIndex(index - 1)} >Edellinen väylä
                        </Button>
                        <Button
                            _pressed={{ opacity: 0.5 }}
                            isDisabled={index === strokes.length - 1}
                            style={styles.nextPreviousButton}
                            onPress={() => setIndex(index + 1)} >Seuraava väylä</Button>
                    </View>
            </View>
    );
}