import MapView, { Marker,Callout } from 'react-native-maps';
import React, {useState,useEffect} from 'react'
import { Text, View, Button} from 'native-base'
import { styles } from './StyleSheet';
import { Input,} from 'native-base';

type Address = {
    courseId:number,
    courseName: string,
    courseStreetaddress:string,
    courseTown:string,
    coursePostalcode:string
    difficulty:string,
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

    const fetchData = () => {
       fetch('https://dev-discgolf.herokuapp.com/courses')
       .then(res => res.json())
       .then(data => setAdresses(data))
    }

    useEffect(() => {
        fetchData();
    },[])

    const handleMarkerPress = (address: Address) => {
        setSelected(address);
        mapRef.current?.animateToRegion({
            latitude: address.latitude,
            longitude: address.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
        })
    }

    const markers = () => {
        return addresses.map((address)=> {
            const lat = address.latitude;
            const lng = address.longitude;
            const title = address.courseName
            return ( 
                <Marker
                key={address.courseId}
                coordinate={{latitude:lat, longitude:lng}}
                onPress={()=> handleMarkerPress(address)}
                >
                </Marker>
        )});
    };

    const etsiRata = async () => {
        const locations:search = await new Promise((resolve,reject)=> {
        fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=hygsYyYwV63LComSV4XwfgYS0bSuGle6&location=${input}`)
        .then(res => res.json())
        .then(data => {
            const lat = data.results[0].locations[0].latLng.lat;
            const lng = data.results[0].locations[0].latLng.lng;
            const streetName = data.results[0].locations[0].street;
            resolve ({
                name: streetName,
                locations: {
                    latitude:lat,
                    longitude:lng
                }
            });
            })
            .catch(err => reject(err));
        });
        setSearchResult(locations);
        return(
            <Marker
            coordinate={searchResult.locations}>
            </Marker>
        )
    }

    const handleMapPress = () => {
        if (Selected) {
            setSelected(null)
        }
        
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
            {Selected && (
                <View style={styles.informationContainer}>
                    <View style={styles.informationContainerHeader}>
                        <Text style={styles.informationTextHeader}>{Selected?.courseName}</Text>
                    </View>
                <View style={styles.informationContainerBody}>
                    <View>
                        <Text style={styles.informationText}>Vaikeustaso: {Selected?.difficulty}</Text>
                        <Text style={styles.informationText}>Väylien määrä: {Selected?.holes.length}</Text>
                    </View>
                    <Button style={styles.informationButton} onPress={() => setSelected(null)}>
                        <Text style={styles.informationText}>Aloita</Text>
                    </Button>
                </View>
            </View>
            )}
        </View>
    );
}