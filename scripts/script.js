

const apiKey = 'f6c3711024d25bbf7faf01870c0cf091';
let temperatureUnits = ["standard", "imperial", "metric"];
let city = 'Stockton'; // Replace with the city you want to get weather information for
let numberOfDays = 7;
let choice = 1;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${temperatureUnits[choice]}`;
let sevenDayApi = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${numberOfDays}&appid=${apiKey}&units=${temperatureUnits[choice]}`;
let next5HoursForecast = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}&units=${temperatureUnits[choice]}&cnt=5`;

let currentCityDisplay = document.getElementById("currentCityDisplay");
let currentTempDisplay = document.getElementById("currentTempDisplay");
let currentWeatherDisplay = document.getElementById("currentWeatherDisplay");
let todaysDate = document.getElementById("todaysDate");
let currentDay = document.getElementById("currentDay");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let feelsLikeTemp = document.getElementById("feelsLikeTemp");
let humidity = document.getElementById("humidity");
// Function to make API request and display weather information
async function getWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    // Display weather information
    const date = new Date(data.dt * 1000);
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    currentCityDisplay.innerHTML = data.name;
    currentTempDisplay.innerHTML = `${Math.round(data.main.temp)}&#8457;`;
    currentWeatherDisplay.innerHTML = data.weather[0].description;
    todaysDate.innerHTML = formattedDate;
    currentDay.innerHTML = dayOfWeek;
    maxTemp.innerHTML = `${Math.round(data.main.temp_max)}&#8457`;
    minTemp.innerHTML = `${Math.round(data.main.temp_min)}&#8457;`;
    feelsLikeTemp.innerHTML = `${Math.round(data.main.feels_like)}&#8457;`;
    humidity.innerHTML = `${data.main.humidity}%`
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(sevenDayApi);
    const data = await response.json();

    // Display 5-day forecast
    document.getElementById('dayOne').textContent = getDayOfWeek(data.list[1].dt);
    document.getElementById('dayOneDate').textContent = getFormattedDate(data.list[1].dt);
    document.getElementById('dayOneTemp').innerHTML = `${Math.round(data.list[1].temp.day)} &#8457;`;
    // updateWeatherImage('dayOneImg', data.list[1].weather[0].main);

    document.getElementById('dayTwo').textContent = getDayOfWeek(data.list[2].dt);
    document.getElementById('dayTwoDate').textContent = getFormattedDate(data.list[2].dt);
    document.getElementById('dayTwoTemp').innerHTML = `${Math.round(data.list[2].temp.day)} &#8457;`;
    // updateWeatherImage('dayTwoImg', data.list[2].weather[0].main);

    document.getElementById('dayThree').textContent = getDayOfWeek(data.list[3].dt);
    document.getElementById('dayThreeDate').textContent = getFormattedDate(data.list[3].dt);
    document.getElementById('dayThreeTemp').innerHTML = `${Math.round(data.list[3].temp.day)} &#8457;`;
    // updateWeatherImage('dayThreeImg', data.list[3].weather[0].main);

    document.getElementById('dayFour').textContent = getDayOfWeek(data.list[4].dt);
    document.getElementById('dayFourDate').textContent = getFormattedDate(data.list[4].dt);
    document.getElementById('dayFourTemp').innerHTML = `${Math.round(data.list[4].temp.day)} &#8457;`;
    // updateWeatherImage('dayFourImg', data.list[4].weather[0].main);

    document.getElementById('dayFive').textContent = getDayOfWeek(data.list[5].dt);
    document.getElementById('dayFiveDate').textContent = getFormattedDate(data.list[5].dt);
    document.getElementById('dayFiveTemp').innerHTML = `${Math.round(data.list[5].temp.day)} &#8457;`;
    // updateWeatherImage('dayFiveImg', data.list[5].weather[0].main);

  } catch (error) {
    console.error('Error fetching forecast data:', error);
  }
}


function getDayOfWeek(timestamp) {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}

function getFormattedDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
}



// Call the function to get 7-day forecast
getForecast();
// Call the function to get the current weather information
getWeather();



// Function to handle search button click
document.getElementById("searchButton").addEventListener("click", function() {
  const newCity = document.getElementById("cityInput").value.trim(); // Get the value from the input field and remove leading/trailing spaces
  if (newCity !== "") {
    city = newCity; // Update the city variable
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${temperatureUnits[choice]}`;
    sevenDayApi = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${numberOfDays}&appid=${apiKey}&units=${temperatureUnits[choice]}`;
    next5HoursForecast = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}&units=${temperatureUnits[choice]}&cnt=5`;
    getForecast(); // Refresh the forecast based on the new city
    getWeather(); // Refresh the weather based on the new city
    
  }
});


// function updateWeatherImage(weatherCondition) {
//   const weatherImageElement = document.getElementById('weatherImage');
  
//   // Set the appropriate image source based on the weather condition
//   if (weatherCondition === 'sunny') {
//     weatherImageElement.src = 'sunny.jpg'; // Replace 'sunny.jpg' with your sunny image path
//     weatherImageElement.alt = 'Sunny';
//   } else if (weatherCondition === 'rainy') {
//     weatherImageElement.src = 'rainy.jpg'; // Replace 'rainy.jpg' with your rainy image path
//     weatherImageElement.alt = 'Rainy';
//   } else {
//     weatherImageElement.src = ''; // Clear the image source if the weather condition is unknown or not provided
//     weatherImageElement.alt = 'Unknown';
//   }
// }