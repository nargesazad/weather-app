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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
//end of time section

//forcastApi part

function forcasting(response) {
  let forcasts = response.data.daily;

  let forcastElement = document.querySelector("#forcasts");

  let forcastHtml = `<div class="row">`;

  forcasts.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHtml =
        forcastHtml +
        `<div class="col-2">
                   <div class="card" >
  <div class="card-body">
    <p class="card-text">${formatDay(forcastDay.dt)}</p>
    <h5 class="card-title"><img src="http://openweathermap.org/img/wn/${
      forcastDay.weather[0].icon
    }@2x.png" width="30px" /></h5>
    <h6 class="card-subtitle mb-2 text-muted" >${Math.round(
      forcastDay.temp.day
    )}<span class = "currentUnit">°C</span></h6>
  </div>
</div>
</div>
`;
    }
  });
  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
}

function getForcastApi(coordinat) {
  let lat = coordinat.lat;
  let lon = coordinat.lon;
  let apiKey = "90752b41f27333ec27018bf17cc38b4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forcasting);
}
//end of forcastApi part

//currenttApi part
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
  getForcastApi(response.data.coord);
  let icon = response.data.weather[0].icon;
  //imag part
  let stat = "sun";
  switch (icon) {
    case `13d`:
      stat = "snow";
      break;
    case `13n`:
      stat = "snow";
      break;
    case `03d`:
      stat = "cloud";
      break;
    case `03n`:
      stat = "cloud";
      break;
    case `04n`:
      stat = "cloud";
      break;
    case `04d`:
      stat = "cloud";
      break;
    case `09d`:
      stat = "rain";
      break;
    case `10d`:
      stat = "rain";
      break;
    case `11d`:
      stat = "rain";
      break;
    case `09n`:
      stat = "rain";
      break;
    case `10n`:
      stat = "rain";
      break;
    case `11n`:
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
//endofcurrentApi part
