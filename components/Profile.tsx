import React, {useState,useEffect} from 'react'
import { View,Avatar,Text,Box, FlatList} from 'native-base';
import { styles } from './StyleSheet';
import { ActivityIndicator } from 'react-native';

interface User {
    userId: number,
    username:string,
    password:string,
    role:string,
    totalThrowsThrown: number,
    totalSteps: number,
    totalTimePlayed: number,
}
export default function Profile(){

    const [repository,setRepository] = useState<User>({
        userId: 1,
        username:"",
        password:"",
        role:"",
        totalThrowsThrown: 0,
        totalSteps: 0,
        totalTimePlayed: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(()=>fetchData(),[]);

    const fetchData = () => {
        fetch('https://dev-discgolf.herokuapp.com/users/1')
        .then(res => res.json())
        .then(data =>{ 
            setRepository(data)
            setLoading(false)}
        )
        .catch(err => console.log(err))
        console.log(repository)
    }
    return (
        <View>
            <View style={styles.view}>
                    <Avatar style={styles.avatar} source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }}/>
                <ActivityIndicator 
                size="small"
                animating={loading}/>
                <Text style={styles.text}>{repository.username}</Text>
                <Text style={styles.text}>Heitot: {repository.totalThrowsThrown}</Text>
                <Text style={styles.text}>Askeleet: {repository.totalSteps}</Text>
                <Text style={styles.text}>Peliaika: {repository.totalTimePlayed}</Text>

            </View>
        </View>
    );
}