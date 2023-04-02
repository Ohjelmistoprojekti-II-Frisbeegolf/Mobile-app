import React,{useState} from "react";
import {FormControl, View, Button, Input, VStack} from 'native-base';
import { styles } from './StyleSheet';

export default function Registration() {
    const [data, setData] = useState({username:'', password:'', passwordCheck:''});
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const validate = () => {
        let valid = true;
        if (data.username.trim().length === 0) {
            setErrors({...errors, username: 'Käyttäjätunnus ei voi olla tyhjä'});
            valid = false;
        } else if (data.username.length < 5) {
            setErrors({...errors, username: 'Käyttäjätunnus ei voi olla alle 5 merkkiä'});
            valid = false;
        } else if ( data.username.length>20) {
            setErrors({...errors, username: 'Käyttäjätunnus ei voi olla yli 20 merkkiä'});
            valid = false;
        } else {
            setErrors({...errors, username:''});
        }
        
        if (data.password.trim().length === 0) {
            setErrors({...errors, password: 'Salasana ei voi olla tyhjä'});
            valid = false;
        } else if (data.password.length < 7) {
            setErrors({...errors, password: 'Salasana ei voi olla alle 7 merkkiä'});
            valid = false;
        } else if ( data.password.length>32) {
            setErrors({...errors, password: 'Salasana ei voi olla yli 32 merkkiä'});
            valid = false;
        } else {
            setErrors({...errors, password:''});
        }

        if (data.passwordCheck.trim().length === 0) {
            setErrors({...errors, passwordCheck: 'Salasana ei voi olla tyhjä'});
            valid = false;
        } else if (data.password !== data.passwordCheck) {
            setErrors({...errors, passwordCheck: 'Salasanat eivät täsmää'});
            valid = false;
        } else {
            setErrors({...errors, passwordCheck:''});
        }
        return valid;
    }

    const onSubmit = () => {
        const valid = validate();
        setMessage(valid ? 'Rekisteröinti Onnistui': 'Rekisteröinti epäonnistui');
    };
    return (
        //https://docs.nativebase.io/form
        <View style={styles.registrationView}>
            <View style={styles.registrationContainer}>
                    <VStack width={'90%'} mx='3' maxW={300}>
                        <FormControl>
                        <FormControl isRequired isInvalid={'username' in errors}>
                            <FormControl.Label _text={styles.regText}>Syötä käyttäjätunnus</FormControl.Label>
                            <Input style={styles.regInput} variant="underlined" p={1} placeholder="Käyttäjätunnus" onChangeText={value => setData({...data, username: value})}/>
                            {'username' in errors ? <FormControl.ErrorMessage>{errors.username}</FormControl.ErrorMessage> : 
                             <FormControl.HelperText _text={{fontSize:"xs"}}>Käyttäjätunnuksessa tulee olla vähintään 5 merkkiä ja maksimissaan 20 merkkiä.</FormControl.HelperText>}
                        </FormControl>
                        <FormControl isRequired isInvalid={'password' in errors}>
                            <FormControl.Label _text={styles.regText}>Syötä Salasana</FormControl.Label>
                            <Input style={styles.regInput} variant="underlined" p={1} placeholder="Salasana" onChangeText={value => setData({...data, password:value})}/>
                            {'password' in errors ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : 
                            <FormControl.HelperText _text={{fontSize:'xs'}}>Salasanassa tulee olla vähintään 7 merkkiä ja maksimissaan 32 merkkiä.</FormControl.HelperText>}
                        </FormControl>
                        <FormControl isRequired isInvalid={'passwordCheck' in errors}>
                            <FormControl.Label _text={styles.regText}>Vahvista salasana</FormControl.Label>
                            <Input style={styles.regInput} variant="underlined" p={1} placeholder="Salasana" onChangeText={value => setData({...data, passwordCheck:value})}/>
                            {'passwordCheck' in errors ? <FormControl.ErrorMessage>{errors.passwordCheck}</FormControl.ErrorMessage> : 
                            <FormControl.HelperText _text={{fontSize:'xs'}}>Salasanojen tulee täsmätä.</FormControl.HelperText>}
                        </FormControl>
                        <View style={styles.regButtonView}>
                            <Button onPress={onSubmit} style={styles.regButton}>
                                Luo käyttäjä
                            </Button>
                        </View>
                        </FormControl>
                    </VStack>
            </View>
        </View>
    );
}
