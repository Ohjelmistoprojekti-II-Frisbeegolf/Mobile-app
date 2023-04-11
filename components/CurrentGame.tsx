import { Text, View, Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import { styles } from './StyleSheet';
import { ActivityIndicator, GestureResponderEvent } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';

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

export default function CurrentGame({ navigation }: { navigation: any }) {

    const [repository, setRepository] = useState<Course>({
        courseId: 1,
        courseName: "",
        holes: []
    });
    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => fetchData(), []);

    useEffect(() => {
        setStrokes(repository.holes.map(hole => { return ({ hole: hole, gameId: 4, courseId: 1, score: 0 }) }))
    }, [repository]);

    const handleStroke = (index: number, operator: string) => {
        if (operator === '+') {
            const data = [...strokes];
            data[index].score = data[index].score + 1;
            setStrokes(data);
        } else {
            const data = [...strokes];
            data[index].score = data[index].score - 1;
            setStrokes(data);
        }
        console.log(strokes)
    }


    const fetchData = () => {
        fetch('https://dev-discgolf.herokuapp.com/courses/1')
            .then(res => res.json())
            .then(data => {
                setRepository(data)
            }
            )
            .catch(err => console.log(err))
    }

    return (
        strokes.length < 1 ?
            <View></View>
            :
            <View style={styles.view}>
                <View style={styles.throwButtonView}>
                    <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton} onPress={() => setIndex(index - 1)} >Edellinen väylä (#)</Button>
                    <Button _pressed={{ opacity: 0.5 }} style={styles.nextPreviousButton} onPress={() => setIndex(index + 1)} >Seuraava väylä (#)</Button>
                </View>
                <Text style={styles.header}>Väylä: {strokes[index].hole.holeNumber}</Text>
                <Text style={styles.header}>Par: {strokes[index].hole.holePar}</Text>
                <Text style={styles.header}>Pituus: {strokes[index].hole.holeLength}m</Text>
                <Text style={styles.header}> Heitot: </Text>
                <View style={{ marginBottom: '120%' }}>
                    <View style={styles.throwCounterView}>
                        <Button
                            _pressed={{ opacity: 0.5 }}
                            style={styles.throwButton}
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

            </View>
    );
}