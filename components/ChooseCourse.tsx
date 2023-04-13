import React, { useEffect, useState } from 'react';
import { View, Button, Text, Select, FormControl } from 'native-base';
import { styles } from './StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Course {
    courseId: number,
    courseName: string
}

export default function ChooseCourse({ navigation }: { navigation: any }) {
    const [repository, setRepository] = useState<Course[]>([]);
    const [courseId, setCourseId] = useState<number>(-1);

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(`Bearer ${token}`)
        const response = await fetch('https://dev-discgolf.herokuapp.com/courses', {
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
        <View style={styles.view}>
            <Text style={styles.header}>Valitse rata: </Text>
            <Select accessibilityLabel="Valitse rata" placeholder="Valitse rata" minWidth='200' onValueChange={value => setCourseId(parseInt(value))}>
                {repository.map(course => <Select.Item label={course.courseName} value={course.courseId.toString()} key={course.courseId} />)}
            </Select>
            <Button
                _pressed={{ opacity: 0.5 }}
                isDisabled={courseId < 0}
                style={styles.button}
                onPress={() => navigation.navigate(' ', { courseId: courseId })}>
                <Text style={{ fontSize: 22, color: 'white' }}>Aloita peli!</Text>
            </Button>
        </View>
    )
}

