import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Firstpage from './Firstpage';
import Profile from './Profile';
import Settings from './Settings';
import CurrentGame from './CurrentGame';
import { useWindowDimensions, View, Text} from 'react-native';
import { styles } from './StyleSheet';
import Map from './Map';
import Weather from './Weather';
import { Avatar, Button } from "native-base";

const Drawer = createDrawerNavigator();

type CustomDrawerContentProps = {
  props: any;
};

function CustomDrawerContent({ props }: CustomDrawerContentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.avatarView}>
            <Avatar style={styles.avatarDrawer} source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            }}/>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.weatherView}>
        <Weather />
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
      <Drawer.Screen name="Etusivu" component={Firstpage} />
      <Drawer.Screen name="Profiili" component={Profile} />
      <Drawer.Screen name="Peli" component={CurrentGame} />
      <Drawer.Screen name="Kartta" component={Map} />
      <Drawer.Screen name="Asetukset" component={Settings} />
    </Drawer.Navigator>
  );
}