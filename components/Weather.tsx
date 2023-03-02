import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'native-base';
import { styles } from './StyleSheet'
import { API_KEY } from "./Keys";

interface WeatherData {
  name?: string;
  main: {
    temp?: number;
  };
  weather: {
    description?: string;
    icon?: string;
  }[];
  wind: {
    speed?: number;
  };

}

export default function Weather(){
  const [weatherData, setWeatherData] = useState<WeatherData>({ name: '', main: { temp: 0 }, weather: [{ description: '', icon: '' }], wind: { speed: 0 } });

  useEffect(() => {
    const city = 'Helsinki';
    const units = 'metric';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.view}>
    <View style={styles.weatherContainer}>
    <Text>{weatherData.name}</Text> 
    <Image source={{ uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} style={{ width: 50, height: 50 }} alt='weather icon' />
    <Text>Lämpötila: {weatherData.main.temp} °C</Text>
    <Text>Tuulen nopeus: {weatherData.wind.speed} m/s</Text>
    </View>
    </View>
    )
}

