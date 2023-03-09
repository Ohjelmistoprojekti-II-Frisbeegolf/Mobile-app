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
            alignItems: 'center',
            marginTop: 20,
          },

          weatherIcon: {
            width: 50,
            height: 50,
          },

          weatherText: {
            color: 'white',
            fontWeight: 'bold',
          },

          avatar: {
            marginTop: 42,
            height: 250,
            width: 250,
          },

          avatarDrawer: {
            marginTop: -60,
            marginLeft: 50,
            width: 150,
            height: 150,
            marginBottom: 10,
          },

          drawer: {
            backgroundColor: 'green', 
            height: 100, 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }

    });

    export { styles }
