import MapView, { Marker,Callout } from 'react-native-maps';
import React, {useState,useEffect} from 'react'
import { ScrollView, Text, View, Button, ChevronRightIcon} from 'native-base'
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
}

export default function Map(){

    const mapRef = React.useRef<MapView>(null);
    const [addresses, setAdresses] = useState<Address[]>([]);
    const [input, setInput] = useState('');
    const [Selected, setSelected] = useState<Address | null>(null)
    const [showInfo, setShowInfo] = useState(false);
    const [searchResult, setSearchResult] = useState<search>({
        name:"",
    });
    
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
            return ( 
                <Marker
                key={address.courseId}
                coordinate={{latitude:lat, longitude:lng}}
                onPress={(e)=> {
                    e.stopPropagation();
                    handleMarkerPress(address)
                }}
                >
                </Marker>
        )});
    };

    const checkSearch = (input:string, filter: (address:Address) => boolean) => {
        const result: Address[] = addresses.filter((address) => filter(address));
        let filterResult: boolean = false;
        if (result.length > 0) {
            if(result.length === 1) {
                setSelected(result[0]);
                setShowInfo(true);
                mapRef.current?.animateToRegion({
                    latitude: result[0].latitude,
                    longitude: result[0].longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
                filterResult = true;
            } else {
                setSearchResult({
                    name: input,
                  });
                  filterResult = true;
            }
        } 
        return filterResult;
    }
    
    const findAddress = async (searchInput:string) => {
        if (searchInput.length >=   3) {
            if (checkSearch(searchInput, (address) => address.courseName.toLowerCase().includes(searchInput.toLowerCase()))) {
                return
            } else if (checkSearch(searchInput, (address) => address.courseTown.toLowerCase().includes(searchInput.toLowerCase()))) {
                return
            } else {
                alert('Osoitetta ei löytynyt')
            }

        } else {
            alert('Anna tarkempi osoite')
        }
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
    }

    const handleMapPress = () => {
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
                    <Button style={styles.mapButton} onPress={() => findAddress(input)}>
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
            {searchResult.name !== '' && (
                <View style={styles.searchResultContainer}>
                    <Text style={styles.searchResultText}>Haulla löytyi useampi osoite:</Text>
                    <ScrollView style={{width:'100%'}}>
                    {addresses.filter((address) => 
                        address.courseTown.toLowerCase().includes(searchResult.name.toLowerCase()) ||
                        address.courseName.toLowerCase().includes(searchResult.name.toLowerCase())
                    ).map((address) => (
                        <View style={{width:'100%'}} key={address.courseId}>
                        <Button 
                        _pressed={{ opacity: 0.5 }}
                        style={styles.searchResultButton}
                        onPress={() => 
                        {
                            setSelected(address);
                            setShowInfo(true);
                            mapRef.current?.animateToRegion({
                                latitude: address.latitude,
                                longitude: address.longitude,
                                latitudeDelta: 0.02,
                                longitudeDelta: 0.02,
                            })
                            setSearchResult({
                                name: '',
                            });
                        }}><Text>{address.courseName}</Text>
                        </Button>
                        <View style={{height:1}}></View>
                        </View>
                        
            ))}</ScrollView>
            </View>)}
        </View>
    );
}