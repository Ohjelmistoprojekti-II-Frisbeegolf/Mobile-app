import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'native-base';
import { styles } from './StyleSheet';
import { API_KEY } from './Keys';
import * as Location from 'expo-location';

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

export default function Weather(){
  const [weatherData, setWeatherData] = useState<WeatherData>
  ({ name: '', main: { temp: 0 },
  weather: [{ description: '', icon: '' }],
  wind: { speed: 0 } });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status != 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const units = 'metric';

        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`);
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);
  
  return (
    <View style={styles.view}>
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>{weatherData.name}</Text> 
        <Image source={{ uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} style={{ width: 50, height: 50 }} alt='weather icon' />
        <Text style={styles.weatherText}>Lämpötila: {weatherData.main.temp} °C</Text>
        <Text style={styles.weatherText}>Tuulen nopeus: {weatherData.wind.speed} m/s</Text>
      </View>
    </View>
  );
}
