import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black'
  },

  avatarView: {
    backgroundColor: 'green',
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertText:{
    fontSize: 20,
    color: 'black'
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
    height: '100%',
    width: '100%',
  },  
  gameView: {
    marginTop:'30%',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  currentGameStats: {
    marginTop: '10%',
    alignItems: 'center',
    width: '80%',
    borderRadius: 20,
    borderColor: '#336600',
    borderWidth: 2,
    backgroundColor:'white',
    padding:5,
  },
  throwCounterView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',

  },
  throwCounterTextView: {
    alignItems:'center',
    marginTop:20
  },

  throwButtonView: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: '70%',
  },

  throwCounterText: {
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    fontSize: 30,
    marginTop: '5%',
    lineHeight: 30,

  },

  throwButton: {
    alignItems: 'center',
    width: '30%',
    height: '120%',
    backgroundColor: 'green',
    marginLeft: '10%',
    marginRight: '8%',
    borderColor: '#336600',
    borderWidth: 1,
    borderRadius: 50,
  },
  throwCounterButtonFont: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  throwCounterEndGame: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '38s%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 5,
    color: 'green',
    backgroundColor: 'green',
    borderColor: '#336600',
    borderWidth: 3,
    borderRadius: 20,
    position: 'relative',
  },
  mapInput: {
    backgroundColor: 'white',
  },

  mapSearch: {
    top: 20,
    position: 'absolute',
    width: '95%',
  },

  header: {
    fontSize: 30,
    marginBottom: 10,
    lineHeight: 45,
  },

  informationContainer: {
    display: 'flex',
    height: '55%',
    width: '100%',
    position: 'absolute',
    bottom: -140,
    marginBottom: 10,
    alignItems: 'center',
  },
  informationContainerHeader: {
    padding: 5,
    backgroundColor: 'green',
    borderColor: '#336600',
    borderRadius: 15,
    borderWidth: 3,
    height: '15%',
    width: '97%',
    justifyContent: 'center'
  },
  informationContainerBody: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: 'green',
    borderColor: '#336600',
    borderRadius: 15,
    borderWidth: 3,
    height: '45%',
    width: '97%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  informationText: {
    padding: 7,
    fontSize: 22,
    color: 'white',
  },
  informationWeatherView: {
    alignItems: 'center'
  },
  activityIndicator: {
    padding: '15.3%',
  },
  informationTextHeader: {
    paddingTop: 5,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  informationContainerButtons: {
    alignItems: 'center',
  },
  informationButton: {
    color: 'green',
    backgroundColor: 'green',
    borderColor: '#336600',
    borderWidth: 3,
    width: '75%',
    height: '35%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  informationButtonText: {
    fontSize: 22,
    color: 'white',
  },
  directionButton: {
    color: 'green',
    backgroundColor: 'green',
    borderColor: '#336600',
    borderWidth: 3,
    width: '50%',
    height: '35%',
    borderRadius: 20,
    marginBottom:5,
    justifyContent: 'center',
    alignItems: 'center'
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

  registrationContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  regInput: {
    backgroundColor: 'white',
    width: '80%',
    height: '90%',
    borderRadius: 10,
    borderColor: '#336600',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 20,
    marginBottom: 5,

  },
  regButton: {
    backgroundColor: 'green',
    width: '50%',
    height: '40%',
    borderRadius: 10,
    borderColor: '#336600',
    borderWidth: 1,
    marginTop: 5,
  
  },
  regButtonView: {
    width: '100%',
    height: '25%',
    marginTop: 10,
    alignItems: 'center',

  },
  regText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green'
 },

  input: {
    backgroundColor: 'white',
    height: 40,
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'green'
},

  loginContainer: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
},

  loginPageButton:{
    backgroundColor: 'green',
    width: '50%',
    height: '40%',
    borderRadius: 10,
    borderColor: '#336600',
    borderWidth: 1,
    marginTop: 5,
    justifyContent: 'center', 
    alignItems: 'center',
},
  searchResultContainer: {
    backgroundColor: 'white',
    display: 'flex',
    width: '95%',
    position: 'absolute',
    top:115,
    maxHeight:200,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  searchResultButton: {
    width:'100%',
    padding:5,
    backgroundColor:'#f2f2f2',
    borderRadius:0,
  },

  searchResultText:{
    fontSize:20,
    padding:5,
  },

  statsView: {
    width: '100%',
    height: '30%',
    paddingTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },

  singleStatView: {
    marginTop: 2,
    borderWidth: 2,
    borderColor: '#336600',
    borderRadius: 10,
    marginBottom: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    width: '45%',
    heigth: '40%',
  },

  singleStatViewFirst: {
    marginTop: 2,
    marginLeft: 15,
    marginRight: -8,
    borderWidth: 2,
    borderColor: '#336600',
    borderRadius: 10,
    marginBottom: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    width: '45%',
    heigth: '40%',
  },

  statsHeaderUsernameView: {
    alignItems: 'center',
  },

  statsHeaderUsername: {
    paddingTop: 5,
    fontSize: 28,
    paddingBottom: 5,
  },
  
  statsHeader: {
    fontSize: 20,
    paddingTop: 3,
    marginLeft: '5%',
    fontWeight: 'bold'
  },

  statsText: {
    fontSize: 20,
    paddingBottom: 3,
    marginLeft: '10%'
  
  },

  
});

export { styles }
