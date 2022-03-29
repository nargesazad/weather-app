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

//search city part
function searching(event) {
  event.preventDefault();
  let city = document.querySelector("#citys");
  city.innerHTML = `${city.value}`;
  let h2City = document.querySelector("#h2Citys");
  h2City.innerHTML = `${city.value}`;
}
let search = document.querySelector("#search-but");
search.addEventListener("click", searching);
//end of search city part

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
  let stat = "sun";
  if (icon === "snow") {
    stat = "snow";
  } else {
    if (icon === "few clouds" || "scattered clouds" || "broken clouds") {
      stat = "cloud";
    } else {
      if (icon === "shower rain" || "rain" || "thunderstorm") {
        stat = "rain";
      }
    }
  }
  let pic = document.querySelector("#pic");
  pic.setAttribute("src", `images/${stat}.svg`);
}

let apiKey = "90752b41f27333ec27018bf17cc38b4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(showTemp);
//api part
