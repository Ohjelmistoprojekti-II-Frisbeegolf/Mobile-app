import { StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
        
        text: {
            fontSize:22,
        },

        button: {
            marginTop: 50,
            color: 'green',
            backgroundColor: 'green',
            borderColor: '#336600',
            borderWidth: 3,
            width: '80%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
      
        view: {
            alignItems: 'center',
        },

        throwButtonView: {
          alignItems: 'center',
          flexDirection: 'row',
        },

        throwButton: {
          alignItems: 'center',
          width: '10%',
          backgroundColor: 'green',
          marginLeft: 15,
          marginTop: 10,
          marginRight: 10,
          borderColor: '#336600',
          borderWidth: 1,
          borderRadius: 20,
        },

        nextPreviousButton: {
          width: '40%',
          backgroundColor: 'green',
          marginLeft: 20,
          marginRight: 20,
          borderColor: '#336600',
          borderWidth: 3,
          borderRadius: 20,
        },

        mapButton: {
          color: 'green',
          backgroundColor: 'green',
          borderColor: '#336600',
          borderWidth: 3,
          borderRadius: 20,
          position: 'relative',
        },

        header: {
          fontSize: 30,
          marginBottom: 10,
          lineHeight: 45,
          fontFamily: 'Helvetica'
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
            borderColor: '#336600',
            borderWidth: 3,
          },

          avatarDrawer: {
            marginTop: -60,
            marginLeft: 50,
            width: 150,
            height: 150,
            marginBottom: 0,
            borderColor: '#336600',
            borderWidth: 3,
          },

          drawer: {
            backgroundColor: 'green', 
            height: 100, 
            justifyContent: 'space-between', 
            alignItems: 'center',
          }

    });

    export { styles }
