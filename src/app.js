//Date
function date(now) {
  let year = now.getFullYear();
  let date = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}, ${month} ${date}, ${year}`;
}

let dateElement = document.querySelector("#current-date");
let currentDate = new Date();
dateElement.innerHTML = date(currentDate);

//Time
function time(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let timeElement = document.querySelector("#current-time");
let currentTime = new Date();
timeElement.innerHTML = time(currentTime);

//Search City
function currentWeather(response) {
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#daily-high").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#daily-low").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
}

function searchingCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#searching");
  let cityName = citySearch.value;
  let apiKey = "43d48c14e180f75f558e0def6bf829b0";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentWeather);
  
}

let city = document.querySelector("#search-input");
city.addEventListener("submit", searchingCity);

//Current Location
function currentLocation(position) {
navigator.geolocation.getCurrentPosition(currentLocation);
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = "43d48c14e180f75f558e0def6bf829b0";
let units = "imperial";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(currentWeather);
}
 
let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", currentLocation);

//City on Open
function searchCity(city) {
  let apiKey = "43d48c14e180f75f558e0def6bf829b0";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentWeather);
}

searchCity("San Francisco");