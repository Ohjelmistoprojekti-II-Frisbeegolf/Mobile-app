import React,{useState,useEffect} from "react";
import {FormControl, View, Button, Input, VStack, AlertDialog} from 'native-base';
import { styles } from './StyleSheet';

export default function Registration({navigation}:  {navigation: any}) {
    const [data, setData] = useState({username:'', password:'', passwordCheck:''});
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const validate = () => {
        let valid = true;
        let errors = {username:'', password:'', passwordCheck:''};
        if (data.username.trim().length === 0) {
            errors.username= 'Käyttäjätunnus ei voi olla tyhjä';
            valid = false;
        } else if (data.username.length < 5) {
            errors.username = 'Käyttäjätunnus ei voi olla alle 5 merkkiä';
            valid = false;
        } else if ( data.username.length>20) {
            errors.username= 'Käyttäjätunnus ei voi olla yli 20 merkkiä';
            valid = false;
        } else {
            errors.username = '';
        }
        
        if (data.password.trim().length === 0) {
            errors.password = 'Salasana ei voi olla tyhjä';
            valid = false;
        } else if (data.password.length < 7) {
            errors.password= 'Salasana ei voi olla alle 7 merkkiä';
            valid = false;
        } else if ( data.password.length>32) {
            errors.password = 'Salasana ei voi olla yli 32 merkkiä';
            valid = false;
        } else {
            errors.password = '';
        }

        if (data.passwordCheck.trim().length === 0) {
            errors.passwordCheck ='Salasana ei voi olla tyhjä';
            valid = false;
        } else if (data.password !== data.passwordCheck) {
            errors.passwordCheck = 'Salasanat eivät täsmää';
            valid = false;
        } else {
            errors.passwordCheck = '';
        }
        setErrors(errors);
        return valid;
    }

    const onSubmit = async () => {
        const valid = validate();
        if(valid) {
            try {
                const res = await fetch('https://discgolf-security.herokuapp.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username:data.username, password:data.password, passwordCheck:data.passwordCheck})
                });
                if(res.ok) {
                    alert('Rekisteröinti onnistui');
                    navigation.navigate('Kirjaudu sisään');
                    
                } else if (res.status === 401) {
                    setMessage('Salasanat eivät täsmää');
                    alert("Salasanat eivät täsmää");
                } else if (res.status === 400) {
                    setMessage('Käyttänimi on jo käytössä');
                    alert("Käyttänimi on jo käytössä");
                } else {
                    setMessage('Rekisteröinti epäonnistui');
                    alert("Rekisteröinti epäonnistui");
                }
            } catch (error) {
                setMessage('Rekisteröinti epäonnistui');
                console.log(error);
            }
        } else {
            setMessage('');
        }
    };

    return (
        //https://docs.nativebase.io/form
            <View style={styles.registrationContainer}>
                    <VStack width={'90%'} maxW={300}>
                        <FormControl isRequired isInvalid={errors.hasOwnProperty('username')}>
                            <FormControl.Label _text={styles.regText}>Syötä käyttäjätunnus</FormControl.Label>
                            <Input style={styles.regInput} variant="underlined" p={4} placeholder="Käyttäjätunnus" onChangeText={value => setData({...data, username: value})}/>
                            {'username' in errors ? <FormControl.ErrorMessage>{errors.username}</FormControl.ErrorMessage> : 
                             <FormControl.HelperText _text={{fontSize:"xs"}}>Käyttäjätunnuksessa tulee olla vähintään 5 merkkiä ja maksimissaan 20 merkkiä.</FormControl.HelperText>}
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.hasOwnProperty('password')}>
                            <FormControl.Label _text={styles.regText}>Syötä Salasana</FormControl.Label>
                            <Input style={styles.regInput} variant="underlined" p={1} placeholder="Syötä salasana" onChangeText={value => setData({...data, password:value})}/>
                            {'password' in errors ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : 
                            <FormControl.HelperText _text={{fontSize:'xs'}}>Salasanassa tulee olla vähintään 7 merkkiä ja maksimissaan 32 merkkiä.</FormControl.HelperText>}
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.hasOwnProperty('passwordCheck')}>
                            <FormControl.Label _text={styles.regText}>Vahvista salasana</FormControl.Label>
                            <Input style={styles.regInput} variant="underlined" p={1} placeholder="Syötä salasana uudelleen" onChangeText={value => setData({...data, passwordCheck:value})}/>
                            {'passwordCheck' in errors ? <FormControl.ErrorMessage>{errors.passwordCheck}</FormControl.ErrorMessage> : 
                            <FormControl.HelperText _text={{fontSize:'xs'}}>Salasanojen tulee täsmätä.</FormControl.HelperText>}
                        </FormControl>
                        <View style={styles.regButtonView}>
                            <Button onPress={onSubmit} style={styles.regButton}>
                                Luo Käyttäjä
                            </Button>
                        </View>
                    </VStack>
            </View>

    );
}
