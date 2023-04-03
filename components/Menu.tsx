import { createDrawerNavigator } from '@react-navigation/drawer';
import Firstpage from './Firstpage';
import Profile from './Profile';
import Settings from './Settings';
<<<<<<< Updated upstream
=======
import CurrentGame from './CurrentGame';
import { useWindowDimensions, View, Text} from 'react-native';
import { styles } from './StyleSheet';
import Map from './Map';
import Weather from './Weather';
import LoginScreen from './LoginScreen';
import { Avatar, Button } from "native-base";
import { Feather } from '@expo/vector-icons';
import { Login } from '@mui/icons-material';
>>>>>>> Stashed changes

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
<<<<<<< Updated upstream
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Etusivu" component={Firstpage} />
      <Drawer.Screen name="Profiili" component={Profile} />
      <Drawer.Screen name="Asetukset" component={Settings} />
=======
  const dimensions = useWindowDimensions();
  
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent props={props} />}
    screenOptions={{
      headerStyle: 
        {backgroundColor: 'green',
        borderBottomColor: '#336600',
        borderBottomWidth: 2,},
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      drawerStyle:{
        backgroundColor: 'green',
        width: 250,
        marginRight: 0,
        borderRightWidth: 2,
        borderRightColor: '#336600',
      },

      drawerActiveBackgroundColor: '#03C03C',

      drawerLabelStyle: {
        fontWeight: 'bold',
        color: 'white'
      },

      drawerType: 
        dimensions.width >= 768 ? 'permanent' : 'front',
    
    }}>
      <Drawer.Screen
      name='Etusivu' 
      component={Firstpage} 
      options={{
      drawerIcon: ({ color, size }) => (
      <Feather name='home' size={size} color='black' />
  ),
  }} />
      <Drawer.Screen 
      name='Profiili' 
      component={Profile} 
      options={{
      drawerIcon: ({ color, size }) => (
      <Feather name='user' size={size} color='black' />
  ),
  }} />
      <Drawer.Screen name='Peli' 
      component={CurrentGame} 
      options={{
      drawerIcon: ({ color, size }) => (
      <Feather name='play' size={24} color='black' />      
  ),
  }}/>
      <Drawer.Screen name='Kartta' 
      component={Map}
      options={{
      drawerIcon: ({ color, size }) => (
      <Feather name='map-pin' size={size} color='black' />
   ),
  }}/>
      <Drawer.Screen name='Asetukset' 
      component={Settings}
      options={{
      drawerIcon: ({ color, size }) => (
      <Feather name='settings' size={size} color='black' />
  ),
  }}/>
      <Drawer.Screen name='Kirjautuminen' 
      component={LoginScreen}
      options={{
      drawerIcon: ({ color, size }) => (
      <Feather name='settings' size={size} color='black' />
  ),
  }}/>

>>>>>>> Stashed changes
    </Drawer.Navigator>
  );
}