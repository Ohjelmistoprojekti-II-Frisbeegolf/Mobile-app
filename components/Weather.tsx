import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'native-base';
import { styles } from './StyleSheet';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_API_URL } from './Url';


interface WeatherData {
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

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData>
    ({
      name: '', main: { temp: 0 },
      weather: [{ description: '', icon: '' }],
      wind: { speed: 0 }
    });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [incomingImageLink, setIncomingImageLink] = useState<string>('https://openweathermap.org/img/wn/11d@2x.png');
  const defaultImageLink = "https://openweathermap.org/img/wn/11d@2x.png"

  useEffect(() => {
    const fetchWeatherData = async () => {
      const token = await AsyncStorage.getItem('token')
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status != 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(`${MAIN_API_URL}weather?lat=${latitude}&lon=${longitude}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json();
        setIncomingImageLink(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        setWeatherData(data);
        console.log(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  const onImageLoaded = () => {
    setIsLoading(false);
  }

  return (
    <View style={styles.weatherView}>
      <Text style={styles.weatherText}>{weatherData.name}</Text>
      <Image
        onLoad={onImageLoaded}
        source={{ uri: isLoading ? defaultImageLink : incomingImageLink }}
        style={{ width: 50, height: 50 }}
        alt='weather icon'
      />
      <Text style={styles.weatherText}>Lämpötila: {weatherData.main.temp} °C</Text>
      <Text style={styles.weatherText}>Tuulen nopeus: {weatherData.wind.speed} m/s</Text>
    </View>
  );
}