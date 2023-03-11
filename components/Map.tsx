import MapView, { Marker,Callout } from 'react-native-maps';
import React, {useState,useEffect} from 'react'
import { Text, View, Button} from 'native-base'
import { styles } from './StyleSheet';
import { Input,} from 'native-base';

type Address = {
    id: number;
    courseId:number,
    holes: {
        holeId: number;
        holePar: number;
        holeLength: number;
        holeNumber: number;
    }[];
    location: {
        latitude: number;
        longitude: number;
    };
    courseName: string,
    courseStreetaddress:string,
    courseTown:string,
    coursePostalcode:string
}
type Hole = {
    holeId: number,
    holePar:number,
    holeLength:number,
    holeNumber:number
}
type search = {
    name:string,
    locations: {
        latitude:number,
        longitude:number
    }
}
export default function Map(){

    const [addresses, setAdresses] = useState<Address[]>([]);
    const [input, setInput] = useState('');
    const [searchResult, setSearchResult] = useState<search>({
        name:"",
        locations: {
            latitude:0,
            longitude:0
        }
    });

    const fetchData = async () => {
       const res = await fetch('https://disc-golf-database.herokuapp.com/courses')
       const data = await res.json();

       const addressLocation = await Promise.all(data.map(async (address: Address)=> {
        const { courseId, holes, courseName, courseStreetaddress, courseTown, coursePostalcode } = address;
        const uribuilder = `${courseStreetaddress}, ${courseTown}, ${coursePostalcode}`;
        const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=hygsYyYwV63LComSV4XwfgYS0bSuGle6&location=${encodeURIComponent(uribuilder)}`)
        const data = await response.json();
        const {lat, lng} = data.results[0].locations[0].latLng;
        return{
            id: courseId,
            courseName:courseName,
            location: {
                latitude: lat,
                longitude: lng,
            },
            courseStreetaddress: courseStreetaddress,
            courseTown:courseTown,
            holes:holes
       };
        }));
        setAdresses(addressLocation);
    }

    useEffect(() => {
        fetchData();
    },[])

    const handleMarkerPress = (address: Address) => {
        console.log("testitesti")
    }

    const markers = () => {
        return addresses.map((address)=> (
            <Marker
            key={address.id}
            coordinate={address.location}
            onPress={()=> handleMarkerPress(address)}
            >
                <Callout>
                    <View>
                        <Text>{address.courseName}</Text>
                    </View>
                </Callout>
            </Marker>
        ));
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
    return(
        <View style={{flex:1}}>
            <MapView style={{height:'100%', width:'100%'}}>
                {markers()}
            </MapView>
            <View style={{position: 'absolute', top: 20, left: 10, right: 10}} >
                <Input
                style={{}}
                placeholder="Etsi osoitteella..."
                value={input}
                onChangeText={(text)=>setInput(text)}
                />
                <Button style={styles.mapButton} onPress={() => etsiRata()}>Etsi</Button>
            </View>
        </View>
    );
}