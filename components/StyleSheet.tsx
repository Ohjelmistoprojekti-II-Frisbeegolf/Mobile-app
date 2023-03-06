import { StyleSheet } from 'react-native';


    const styles = StyleSheet.create({
        
        text: {
            fontSize:22,
        },

        button: {
            marginTop: 50,
            color: 'green',
            backgroundColor: 'green',
            width: '80%',
        },

        view: {
            alignItems: 'center',
        },

        weatherContainer: {
            alignItems: 'stretch',
            marginTop: 50,         
          },
          weatherIcon: {
            width: 50,
            height: 50,
          },
          weatherText: {
            color: 'white',
            fontWeight: 'bold',
          },
          
    });

    export { styles }