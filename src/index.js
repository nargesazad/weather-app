//time section
function formatDate() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
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
let search = document.querySelector("form");
search.addEventListener("submit", searching);
//end of search city part

//api part
function getlocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(`${latitude} & ${longitude}`);
  let apiKey = "90752b41f27333ec27018bf17cc38b4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  let h2City = document.querySelector("#h2Citys");
  h2City.innerHTML = "Current Location";
}
function showTemp(response) {
  let mainTemp = document.querySelector("#current-temp");
  mainTemp.innerHTML = response.data.main.temp;
  console.log(mainTemp);
}
var currentBut = document.querySelector("#current-but");
currentBut.addEventListener("click", getlocation);
/*
var currentBut = document.querySelector("#current");
currentBut.addEventListener("submit", showCurrentLocation);
//end of api part
//unit part
function cel2far(event, mainTemp) {
  event.preventDefault();
  let unit = document.querySelector("#c2f");
  if (unit.innerHTML === "°C") {
    unit.innerHTML = "°F";
    mainTemp = Math.round(mainTemp - (32 * 5) / 9);
  } else {
    unit.innerHTML = "°C";
  }
  let currentUnit = unit.innerHTML;
  let newTemp = document.querySelector("#current-temp");
  newTemp.innerHTML = `${mainTemp}`;
  let newUnit = document.querySelector("#current-unit");
  newUnit.innerHTML = `${currentUnit}`;
}
var unit = document.querySelector("#c2f");
unit.addEventListener("click", cel2far);
//end of unit part*/
