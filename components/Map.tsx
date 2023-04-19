import MapView, { Marker,Callout } from 'react-native-maps';
import React, {useState,useEffect} from 'react'
import { Text, View, Button, ChevronRightIcon} from 'native-base'
import { styles } from './StyleSheet';
import { Input,} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { courseurl } from './Url';

type Address = {
    courseId:number,
    courseName: string,
    courseStreetaddress:string,
    courseTown:string,
    coursePostalcode:string
    courseDifficulty:string,
    latitude: number;
    longitude: number;
    holes: {
        holeId: number;
        holePar: number;
        holeLength: number;
        holeNumber: number;
    }[];
}
type search = {
    name:string,
    locations: {
        latitude:number,
        longitude:number
    }
}
export default function Map(){

    const mapRef = React.useRef<MapView>(null);
    const [addresses, setAdresses] = useState<Address[]>([]);
    const [input, setInput] = useState('');
    const [searchResult, setSearchResult] = useState<search>({
        name:"",
        locations: {
            latitude:0,
            longitude:0
        }
    });
    const [Selected, setSelected] = useState<Address | null>(null)
    const [showInfo, setShowInfo] = useState(false);
    const [clickedSource, setClickedSourse] = useState<'marker' | 'map'>('map');
    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(`Bearer ${token}`)
        const response = await fetch(courseurl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setAdresses(data);
    }

    useEffect(() => {
        fetchData();
    }, [])


    
    const markers = () => {
        return addresses.map((address)=> {
            const lat = address.latitude;
            const lng = address.longitude;
            const title = address.courseName
            return ( 
                <Marker
                key={address.courseId}
                coordinate={{latitude:lat, longitude:lng}}
                onPress={(e)=> {
                    e.stopPropagation();
                    handleMarkerPress(address)}}
                >
                </Marker>
        )});
    };
    
    const etsiRata = async () => {
        
        return(
            <Marker
            coordinate={searchResult.locations}>
            </Marker>
        )
    }
    const handleMarkerPress = (address: Address) => {
        setSelected(address);
        setShowInfo(true);
        mapRef.current?.animateToRegion({
            latitude: address.latitude,
            longitude: address.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
        })
        setClickedSourse('marker');
    }

    const handleMapPress = () => {
        setClickedSourse('map')
        setSelected(null);
        setShowInfo(false);   
    };

    return(
        <View style={styles.view}>
            <MapView style={{height:'100%', width:'100%'}} showsCompass={false} ref={mapRef} onPress={()=> handleMapPress()}>
                {markers()}
            </MapView>
            <View style={styles.mapSearch} >
                    <Input
                    style={styles.mapInput}
                    placeholder="Etsi osoitteella..."
                    value={input}
                    onChangeText={(text)=>setInput(text)}
                    />
                    <Button style={styles.mapButton} onPress={() => etsiRata()}>
                        Etsi...
                    </Button>
            </View>
            {Selected && showInfo && (
                <View style={styles.informationContainer}>
                    <View style={styles.informationContainerHeader}>
                        <Text style={styles.informationTextHeader}>{Selected?.courseName}</Text>
                    </View>
                <View style={styles.informationContainerBody}>
                    <View>
                        <Text style={styles.informationText}>Vaikeustaso: {Selected?.courseDifficulty}</Text>
                        <Text style={styles.informationText}>Väylien määrä: {Selected?.holes.length}</Text>
                    </View>
                    <Button style={styles.informationButton} onPress={() => setSelected(null)}>
                        <Text style={styles.informationButtonText}>Lisää <ChevronRightIcon size={10} color='white'/></Text>
                    </Button>
                </View>
            </View>
            )}
        </View>
    );
}