import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Firstpage from './Firstpage';
import Profile from './Profile';
import Settings from './Settings';
import CurrentGame from './CurrentGame';
import { useWindowDimensions, View, Text } from 'react-native';
import { styles } from './StyleSheet';
import Map from './Map';
import Weather from './Weather';

const Drawer = createDrawerNavigator();

type CustomDrawerContentProps = {
  props: any;
};

function CustomDrawerContent({ props }: CustomDrawerContentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ backgroundColor: 'green', height: 100, justifyContent: 'space-between', alignItems: 'center' }}>
        <Weather />
      <View style={styles.weatherContainer}>
      </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent props={props} />} 
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
      <Drawer.Screen name="Kartta" component={Map} />
      <Drawer.Screen name="Asetukset" component={Settings} />
    </Drawer.Navigator>
  );
}