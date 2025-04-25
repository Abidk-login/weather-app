// OpenWeatherMap API Key
const apiKey = "c2f5791002dd6ef74d2350e5b04c5cce";

function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      // Update UI with weather data
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("temperature").textContent = `${data.main.temp}°C`;
      document.getElementById("description").textContent = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      document.getElementById("weatherIcon").innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon"/>`;

      // Change card background color based on weather
      updateCardColor(data.weather[0].main);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("Something went wrong. Please try again later.");
    });
}

// Function to update center card color
function updateCardColor(condition) {
  const card = document.getElementById("weatherCard");

  let color = "";

  switch (condition) {
    case "Clear":
      color = "#ffeb99"; // Light sunny yellow
      break;
    case "Clouds":
      color = "#dcdcdc"; // Gray
      break;
    case "Rain":
    case "Drizzle":
      color = "#a1c4fd"; // Light rainy blue
      break;
    case "Thunderstorm":
      color = "#8899a6"; // Stormy gray-blue
      break;
    case "Snow":
      color = "#e0f7fa"; // Icy light blue
      break;
    case "Mist":
    case "Fog":
      color = "#f0f0f0"; // Foggy light gray
      break;
    default:
      color = "#ffffff"; // Default white
  }

  card.style.backgroundColor = color;
}
