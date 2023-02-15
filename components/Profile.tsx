import React, {useState,useEffect} from 'react'
import { View,Avatar,Text,Box, FlatList} from 'native-base';
import { styles } from './StyleSheet';
import { ActivityIndicator } from 'react-native';

export default function Profile(){

    const [repository,setRepository] = useState({
        userId:0,
        username:"",
        password:"",
        role:""
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
                    <Avatar marginTop={42} size={250} bg="cyan.500" source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }}/>
                <ActivityIndicator 
                size="small"
                animating={loading}/>
                <Text style={styles.text}>{repository.username}</Text>
            </View>
        </View>
    );
}