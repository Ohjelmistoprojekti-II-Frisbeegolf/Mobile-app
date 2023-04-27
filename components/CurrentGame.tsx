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
    score: number
}

interface Game {
    course: Course
    strokes: Stroke[]
    steps: number
}


export default function CurrentGame({ route, navigation }: any) {
    const [game, setGame] = useState<Game>();
    const [index, setIndex] = useState<number>(0);

    const handleStroke = (index: number, operator: string) => {
        const strokes = [...game!.strokes];
        strokes[index].score = operator === "-" ? strokes[index].score - 1 : strokes[index].score + 1;
        setGame({ ...game!, strokes: strokes });
    }

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`https://dev-discgolf.herokuapp.com/courses/${route.params.course.courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data: Course = await response.json();
        const initializedStrokes: Stroke[] = data.holes.map((hole: Hole) => { return { hole: hole, score: 0 } });
        setGame({ course: data, strokes: initializedStrokes, steps: 0 });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const config = {
                method: 'POST',
                body: JSON.stringify(game),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(`https://discgolf-security.herokuapp.com/games`, config);
            navigation.navigate('Profiili');
            // TODO
        } catch (error) {
            console.log(error);
        }
    }

    return (
        !game ?
            <View></View>
            :
            <View style={styles.view}>
                <View style={styles.throwButtonView}>
                    <Button
                        _pressed={{ opacity: 0.5 }}
                        isDisabled={index === 0}
                        style={styles.nextPreviousButton}
                        onPress={() => setIndex(index - 1)} >Edellinen väylä
                    </Button>
                    <Button
                        _pressed={{ opacity: 0.5 }}
                        isDisabled={index === game!.strokes.length - 1}
                        style={styles.nextPreviousButton}
                        onPress={() => setIndex(index + 1)} >Seuraava väylä</Button>
                </View>
                <Text style={styles.header}>Väylä: {game.strokes[index].hole.holeNumber}</Text>
                <Text style={styles.header}>Par: {game.strokes[index].hole.holePar}</Text>
                <Text style={styles.header}>Pituus: {game.strokes[index].hole.holeLength}m</Text>
                <Text style={styles.header}> Heitot: </Text>
                <View style={{ marginBottom: '100%' }}>
                    <View style={styles.throwCounterView}>
                        <Button
                            _pressed={{ opacity: 0.5 }}
                            style={styles.throwButton}
                            isDisabled={game!.strokes[index].score === 0}
                            onPress={() => handleStroke(index, '-')}
                        >
                            -
                        </Button>
                        <Text style={styles.throwCounterText}>{game.strokes[index].score}</Text>
                        <Button
                            _pressed={{ opacity: 0.5 }}
                            style={styles.throwButton}
                            onPress={() => handleStroke(index, '+')}
                        >
                            +
                        </Button>

                    </View>
                    <View style={styles.throwCounterView}>
                        {index === game.strokes.length - 1 && <Button
                            onPress={() => handleSubmit()}
                            style={styles.throwButton} >Lopeta peli</Button>}
                    </View>

                </View>

            </View>
    );
}