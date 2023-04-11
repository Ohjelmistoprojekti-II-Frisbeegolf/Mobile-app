import React, { useEffect, useState } from 'react';
import { View, Button, Text, Select } from 'native-base';
import { styles } from './StyleSheet';


interface Course {
    courseId: number,
    courseName: string
}

export default function ChooseCourse({navigation}: {navigation:any}) {
    const [repository, setRepository] = useState<Course>({
        courseId: 1,
        courseName: "",
    })

    useEffect(() => fetchData(),[]);

    const fetchData = () => {
        fetch('https://dev-discgolf.herokuapp.com/courses/1')
        .then(res => res.json())
        .then(data => {
            setRepository(data)}
        )
        .catch(err => console.log(err))
        console.log(repository)
    }
    
    
    return(
        <View style={styles.view}>
            <Text style={styles.header}>Valitse rata: </Text>
            <Select accessibilityLabel="Valitse rata" placeholder="Valitse rata" minWidth='200'>
                <Select.Item label={repository.courseName} value={repository.courseName} />
            </Select>
            <Button
                _pressed={{ opacity: 0.5 }}
                style={styles.button}
                onPress= { () => navigation.navigate(' ')}>
                <Text style={{fontSize:22, color:'white'}}>Aloita peli!</Text>
            </Button>
        </View>
    )
}

