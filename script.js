const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".pressure").innerHTML = `Pressure: ${data.main.pressure} hPa`;
    document.querySelector(".updated-time").innerHTML = `Updated: ${new Date().toLocaleTimeString()}`;

    const weatherType = data.weather[0].main;
    updateBackground(weatherType);

    // Use online icons from Flaticon
    switch (weatherType) {
      case "Clouds":
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        break;
      case "Clear":
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        break;
      case "Rain":
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
        break;
      case "Drizzle":
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        break;
      case "Mist":
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005817.png";
        break;
      default:
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/6974/6974833.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

function updateBackground(weatherType) {
  const card = document.querySelector(".card");
  switch (weatherType) {
    case "Clouds":
      card.style.background = "linear-gradient(135deg, #d7d2cc, #304352)";
      break;
    case "Clear":
      card.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
      break;
    case "Rain":
      card.style.background = "linear-gradient(135deg, #00c6fb, #005bea)";
      break;
    case "Drizzle":
      card.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
      break;
    case "Mist":
      card.style.background = "linear-gradient(135deg, #d3cce3, #e9e4f0)";
      break;
    default:
      card.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
