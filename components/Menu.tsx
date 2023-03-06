import { createDrawerNavigator } from '@react-navigation/drawer';
import Firstpage from './Firstpage';
import Profile from './Profile';
import Settings from './Settings';
import CurrentGame from './CurrentGame';
import { useWindowDimensions } from 'react-native';
import Map from './Map';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
    screenOptions={{
      headerStyle: 
        {backgroundColor: 'green'},
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
      },
      drawerStyle:{
        backgroundColor: 'green',
        width: 250,

      },
      drawerLabelStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
      drawerType: 
        dimensions.width >= 768 ? 'permanent' : 'front',
    
    }}>
      <Drawer.Screen name="Etusivu" component={Firstpage} />
      <Drawer.Screen name="Profiili" component={Profile} />
      <Drawer.Screen name="Peli" component={CurrentGame} />
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Asetukset" component={Settings} />
    </Drawer.Navigator>
  );
}