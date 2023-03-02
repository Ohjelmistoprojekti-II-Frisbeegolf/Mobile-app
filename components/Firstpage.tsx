import React,{useState} from 'react';
import {Text,View,Button,Image} from 'native-base';
import { Avatar } from "native-base";
import { styles } from './StyleSheet';
import Weather from './Weather';

export default function Firstpage({navigation}:  {navigation: any}){
    return(
        <View style={styles.view}>
            <Button style={ styles.button}
            onPress= { () => navigation.navigate('Peli')}>
                <Text style={{fontSize:22, color:'white'}}>Aloita peli</Text>
            </Button>
            <Avatar marginTop={42} size={250} bg="cyan.500" source={{
                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            }}/>
        <Weather/>
        </View>
    );
}
