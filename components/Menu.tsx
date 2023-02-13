import { createDrawerNavigator } from '@react-navigation/drawer';
import Firstpage from './Firstpage';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Firstpage} />
      <Drawer.Screen name="Article" component={Firstpage} />
    </Drawer.Navigator>
  );
}