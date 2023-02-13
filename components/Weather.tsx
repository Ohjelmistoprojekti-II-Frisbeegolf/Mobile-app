import { API_KEY } from "./Keys";
const city = 'Helsinki';
const units = 'metric';

const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
