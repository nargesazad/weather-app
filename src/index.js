//time section
function formatDate() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];
  let formattedDate = `${day} , ${hour}:${minute}`;
  return formattedDate;
}
let time = document.querySelector("div#time");
time.innerHTML = formatDate();
//end of time section

//api part
function showTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#h2Citys");
  cityName.innerHTML = response.data.name;
  let sky = document.querySelector("#sky-status");
  sky.innerHTML = response.data.weather[0].description;
  let feels = document.querySelector("#feels-like");
  feels.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = response.data.weather[0].description;
  //imag part
  let stat = "sun";
  switch (icon) {
    case `snow`:
      stat = "snow";
      break;
    case `few clouds`:
      stat = "cloud";
      break;
    case `scattered clouds`:
      stat = "cloud";
      break;
    case `broken clouds`:
      stat = "cloud";
      break;
    case `overcast clouds`:
      stat = "cloud";
      break;
    case `shower rain`:
      stat = "rain";
      break;
    case `rain`:
      stat = "rain";
      break;
    case `thunderstorm`:
      stat = "rain";
      break;
    default:
      stat = "sun";
  }
  let pic = document.querySelector("#pic");
  pic.setAttribute("src", `images/${stat}.svg`);
  //image part
}

function searchingCity(city) {
  let apiKey = "90752b41f27333ec27018bf17cc38b4c";
  let cityName = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
//api part
//search city part
function submiting(event) {
  event.preventDefault();
  let city = document.querySelector("#citys");
  searchingCity(city.value);
}

let search = document.querySelector("#search-city");
search.addEventListener("submit", submiting);
searchingCity("tehran");
//end of search city part
