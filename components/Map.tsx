import MapView, { Marker, Callout } from 'react-native-maps';
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Button, ChevronRightIcon, Image, } from 'native-base'
import { styles } from './StyleSheet';
import { Input, } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_API_URL } from './Url';
import { ActivityIndicator, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Address = {
    courseId: number,
    courseName: string,
    courseStreetaddress: string,
    courseTown: string,
    coursePostalcode: string
    courseDifficulty: string,
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
    name: string,
}
type WeatherData = {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
}

export default function Map({ navigation }: { navigation: any }) {

    const mapRef = React.useRef<MapView>(null);
    const [addresses, setAdresses] = useState<Address[]>([]);
    const [input, setInput] = useState('');
    const [Selected, setSelected] = useState<Address | null>(null)
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<search>({
        name: "",
    });

    //Weather.tsx variables
    const [incomingImageLink, setIncomingImageLink] = useState<string>('https://openweathermap.org/img/wn/11d@2x.png');
    const [weatherData, setWeatherData] = useState<WeatherData>
        ({
            name: '', main: { temp: 0 },
            weather: [{ description: '', icon: '' }],
            wind: { speed: 0 }
        });
    const defaultImageLink = "https://openweathermap.org/img/wn/11d@2x.png";
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log(`Bearer ${token}`)
        const response = await fetch(MAIN_API_URL + 'courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setAdresses(data);
    }
    //Weather fething based on Weather.tsx
    const fetchWeatherData = async (address: Address) => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token')
        try {
            const response = await fetch(`${MAIN_API_URL}weather?lat=${address.latitude}&lon=${address.longitude}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();
            setIncomingImageLink(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            setWeatherData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const onImageLoaded = () => {
        setIsLoading(false);
    }


    const markers = () => {
        return addresses.map((address) => {
            const lat = address.latitude;
            const lng = address.longitude;
            return (
                <Marker
                    key={address.courseId}
                    coordinate={{ latitude: lat, longitude: lng }}
                    onPress={(e) => {
                        e.stopPropagation();
                        handleMarkerPress(address)
                    }}
                >
                </Marker>
            )
        });
    };

    const checkSearch = (input: string, filter: (address: Address) => boolean) => {
        const result: Address[] = addresses.filter((address) => filter(address));
        let filterResult: boolean = false;
        if (result.length > 0) {
            if (result.length === 1) {
                setSelected(result[0]);
                setShowInfo(true);
                fetchWeatherData(result[0]);
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

    const findAddress = async (searchInput: string) => {
        if (searchInput.length >= 3) {
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
    const handleMarkerPress = async (address: Address) => {
        setSelected(address);
        setShowInfo(true);
        fetchWeatherData(address);
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
        setWeatherData({
            name: '', main: { temp: 0 },
            weather: [{ description: '', icon: '' }],
            wind: { speed: 0 }
        });
        setIncomingImageLink(defaultImageLink);

    };
    const handleOpenUrl = () => {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${Selected?.latitude},${Selected?.longitude}+&travelmode=driving`);
    };

    return (
        <View style={styles.view}>
            <MapView style={{ height: '100%', width: '100%' }} showsCompass={false} ref={mapRef} onPress={() => handleMapPress()}>
                {markers()}
            </MapView>
            <View style={styles.mapSearch} >
                <Input
                    style={styles.mapInput}
                    placeholder="Etsi osoitteella..."
                    value={input}
                    onChangeText={(text) => setInput(text)}
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
                            {isLoading ? (
                                <ActivityIndicator size='large' color="#1cff5a" style={styles.activityIndicator} />
                            ) : (
                                <View style={styles.informationWeatherView}>
                                    <Image
                                        source={{ uri: incomingImageLink }}
                                        fallbackSource={{ uri: defaultImageLink }}
                                        onLoad={onImageLoaded}
                                        style={{ width: 50, height: 50 }}
                                        alt='weather icon'
                                    />
                                    <Text style={styles.weatherText}>Lämpötila: {weatherData.main.temp} °C</Text>
                                    <Text style={styles.weatherText}>Tuulen nopeus: {weatherData.wind.speed} m/s</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.informationContainerButtons}>
                            <Button style={styles.directionButton} onPress={() => handleOpenUrl()}><AntDesign name="car" size={24} color="white" /></Button>
                            <Button style={styles.informationButton} onPress={() => navigation.navigate(' ', { course: Selected})}>
                                <Text style={styles.informationButtonText}>Aloita</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            )}
            {searchResult.name !== '' && (
                <View style={styles.searchResultContainer}>
                    <Text style={styles.searchResultText}>Haulla löytyi useampi osoite:</Text>
                    <ScrollView style={{ width: '100%' }}>
                        {addresses.filter((address) =>
                            address.courseTown.toLowerCase().includes(searchResult.name.toLowerCase()) ||
                            address.courseName.toLowerCase().includes(searchResult.name.toLowerCase())
                        ).map((address) => (
                            <View style={{ width: '100%' }} key={address.courseId}>
                                <Button
                                    _pressed={{ opacity: 0.5 }}
                                    style={styles.searchResultButton}
                                    onPress={() => {
                                        setSelected(address);
                                        setShowInfo(true);
                                        fetchWeatherData(address)
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
                                <View style={{ height: 1 }}></View>
                            </View>

                        ))}</ScrollView>
                </View>)}
        </View>
    );
}