

const apiKey = 'f6c3711024d25bbf7faf01870c0cf091';
let temperatureUnits = ["standard", "imperial", "metric"];
let city = 'Stockton'; // Replace with the city you want to get weather information for
let numberOfDays = 7;
let choice = 1;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${temperatureUnits[choice]}`;
const sevenDayApi = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${numberOfDays}&appid=${apiKey}&units=${temperatureUnits[choice]}`;
const next5HoursForecast = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}&units=${temperatureUnits[choice]}&cnt=5`;
    
// Function to make API request and display weather information
async function getWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    // Display weather information
    const weatherDataElement = document.getElementById('weatherData');
    weatherDataElement.innerHTML = `
      <p>City: ${data.name}</p>
      <p>Temperature: ${data.main.temp} &#8451;</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(sevenDayApi);
    const data = await response.json();

    // Display 7-day forecast
    const forecastDataElement = document.getElementById('forecastData');
    forecastDataElement.innerHTML = '';

    data.list.forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

      forecastDataElement.innerHTML += `
        <div>
          <p>City: ${city} </p>
          <p>${dayOfWeek}</p>
          <p>Temperature: ${day.temp.day} &#8451;</p>
          <p>Weather: ${day.weather[0].description}</p>
        </div>
      `;
    });
    console.log("Checking");
    console.log(data);
  } catch (error) {
    console.error('Error fetching forecast data:', error);
  }
}

async function getNext5HoursForecast() {
  try {
    const response = await fetch(next5HoursForecast);
    const data = await response.json();

    // Display forecast for the next 5 hours
    const hourlyData = document.getElementById('hourlyData');
    hourlyData.innerHTML = '';
    console.log(data);

    for (let i = 0; i < 5; i++) {
      const timestamp = data.hourly[i].dt * 1000;
      const date = new Date(timestamp);
      const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      hourlyData.innerHTML += `
        <div>
          <p>Time: ${time}</p>
          <p>Temperature: ${data.hourly[i].temp} °C</p>
          <p>Weather: ${data.hourly[i].weather[0].description}</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error);
  }
}

// Call the function to get 7-day forecast
getForecast();
// console.log("check");
// Call the function to get weather information
getWeather();

// getNext5HoursForecast();

function updateWeatherImage(weatherCondition) {
  const weatherImageElement = document.getElementById('weatherImage');
  
  // Set the appropriate image source based on the weather condition
  if (weatherCondition === 'sunny') {
    weatherImageElement.src = 'sunny.jpg'; // Replace 'sunny.jpg' with your sunny image path
    weatherImageElement.alt = 'Sunny';
  } else if (weatherCondition === 'rainy') {
    weatherImageElement.src = 'rainy.jpg'; // Replace 'rainy.jpg' with your rainy image path
    weatherImageElement.alt = 'Rainy';
  } else {
    weatherImageElement.src = ''; // Clear the image source if the weather condition is unknown or not provided
    weatherImageElement.alt = 'Unknown';
  }
}