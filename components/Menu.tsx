import { createDrawerNavigator } from '@react-navigation/drawer';
import Firstpage from './Firstpage';
import Profile from './Profile';
import Settings from './Settings';
import Weather from './Weather';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Etusivu" component={Firstpage} />
      <Drawer.Screen name="Profiili" component={Profile} />
      <Drawer.Screen name="Asetukset" component={Settings} />




    </Drawer.Navigator>
  );
}