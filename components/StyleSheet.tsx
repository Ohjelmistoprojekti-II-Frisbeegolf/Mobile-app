import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

    const styles = StyleSheet.create({
        
        text: {
            fontSize:13,
            fontWeight: 'bold',
            color: 'white'
        },

        avatarView: {
          backgroundColor: 'green',
          height: '30%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },

        button: {
            marginTop: 50,
            color: 'white',
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
          marginLeft: '4%',
          marginTop: '4%',
          marginRight: '3%',
          borderColor: '#336600',
          borderWidth: 1,
          borderRadius: 50,
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
            marginTop:5,
            color: 'green',
            backgroundColor: 'green',
            borderColor: '#336600',
            borderWidth: 3,
            borderRadius: 20,
            position: 'relative',
        },
        mapInput: {
            backgroundColor:'white',
        },

        mapSearch: {
            top:20,
            position:'absolute',
            width:'95%',
        },

        header: {
          fontSize: 30,
          marginBottom: 10,
          lineHeight: 45,
          fontFamily: 'Helvetica'
        },

        informationContainer: {
            display:'flex',
            height:'35%',
            width:'100%',
            position:'absolute',
            bottom:-80,
            marginBottom:10,
            alignItems:'center',
        },
        informationContainerHeader: {
            padding:5,
            backgroundColor: 'green',
            borderColor: '#336600',
            borderRadius: 15,
            borderWidth:3,
            height:'25%',
            width:'97%',
            justifyContent:'center'
        },
        informationContainerBody: {
            display:'flex',
            flexDirection:'row',
            marginTop:5,
            backgroundColor: 'green',
            borderColor: '#336600',
            borderRadius: 15,
            borderWidth:3,
            height:'35%',
            width:'97%',
            justifyContent:'center',
            alignItems:'center'
        },

        informationText: {
            padding:7,
            fontSize:22,
            color:'white',
        },
        informationTextHeader: {
            paddingTop:5,
            fontSize:25,
            color:'white',
            textAlign:'center',
        },
        informationButton: {
            color: 'green',
            backgroundColor: 'green',
            borderColor: '#336600',
            borderWidth: 3,
            width: '40%',
            height:'80%',
            borderRadius: 20,
            paddingLeft:25,
            justifyContent: 'center',
            alignItems:'center'
        },
        informationButtonText: {
            padding: 10,
            fontSize:22,
            color:'white',
        },

        weatherView: {
          backgroundColor: 'green',
          height: '50%',
          width: '100%',
          alignItems: 'center',
          paddingTop: '5%'
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
            width: 150,
            height: 150,
            borderColor: '#336600',
            borderWidth: 3,
          },

    });

    export { styles }
