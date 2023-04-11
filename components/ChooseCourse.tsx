import React, { useEffect, useState } from 'react';
import { View, Button, Text, Select, FormControl } from 'native-base';
import { styles } from './StyleSheet';


interface Course {
    courseId: number,
    courseName: string
}

export default function ChooseCourse({ navigation }: { navigation: any }) {
    const [repository, setRepository] = useState<Course[]>([]);
    const [courseId, setCourseId] = useState<number>(-1);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://dev-discgolf.herokuapp.com/courses')
            .then(res => res.json())
            .then(data => {
                setRepository(data)
            }
            )
            .catch(err => console.log(err))
    }

    console.log(courseId)


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

