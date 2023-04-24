import React, {useState,useEffect} from 'react'
import { View,Avatar,Text, Button } from 'native-base';
import { styles } from './StyleSheet';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userurl } from './Url';

interface User {
    userId: number,
    username:string,
    password:string,
    role:string,
    totalThrowsThrown: number,
    totalSteps: number,
    totalTimePlayed: number,
}
export default function Firstpage({navigation}: {navigation: any}){

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

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(`Bearer ${token}`)
        const response = await fetch(userurl, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        setRepository(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View>
            <View style={styles.view}>
                <Button
                    _pressed={{ opacity: 0.5 }}
                    style={styles.button}
                    onPress= { () => navigation.navigate('Peli')}>
                        <Text style={{fontSize:22, color:'white'}}>Aloita peli</Text>
                </Button>
                <Avatar style={styles.avatar} source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }}/>
                {loading ?
                <ActivityIndicator 
                size="small"
                animating={loading}/>
                :    (
                <View style={styles.statsView}>
                    <View style={styles.statsHeaderUsernameView}>
                        <Text style={styles.statsHeaderUsername}>{repository.username}</Text>
                    </View>
                    <View style={styles.singleStatView}>
                        <Text style={styles.statsHeader}>Heitot: </Text>
                        <Text style={styles.statsText}>{repository.totalThrowsThrown}</Text>
                    </View>
                    <View style={styles.singleStatView}>
                        <Text style={styles.statsHeader}>Askeleet: </Text>
                        <Text style={styles.statsText}>{repository.totalSteps}</Text>
                    </View>
                    <View style={styles.singleStatView}>
                        <Text style={styles.statsHeader}>Peliaika: </Text>
                        <Text style={styles.statsText}>{repository.totalTimePlayed}</Text>
                    </View>
                </View>
                )}
            </View>
        </View>
    );
}
