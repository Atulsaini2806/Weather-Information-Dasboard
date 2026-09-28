const API_KEY = "e5aaf4c1847d9b1ce7993f9712339f91";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");


// Search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        error.textContent = "Please enter a city name";
        weatherCard.style.display = "none";
        return;
    }

    // Prevent city input containing a comma
    if (city.includes(",")) {
        error.textContent = "Please enter only the city name.";
        weatherCard.style.display = "none";
        return;
    }

    getWeather(city);
});

// Press Enter to search
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});


// Get weather data
async function getWeather(city) {

     loading.textContent = "Fetching weather information......";
    error.textContent = "";
  
    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

       if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
}
        const data = await response.json();

        // Display city name
        cityName.textContent = data.name;

        // Display temperature
        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        // Display weather condition
        condition.textContent = data.weather[0].description;

        // Display humidity
        humidity.textContent = data.main.humidity;

        // Convert wind speed from m/s to km/h
        windSpeed.textContent = (data.wind.speed * 3.6).toFixed(1);

        // Display weather icon
        const weather = data.weather[0].main.toLowerCase();

if (weather.includes("clear")) {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
} else if (weather.includes("cloud")) {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
} else if (weather.includes("rain")) {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
} else if (weather.includes("thunder")) {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
} else {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
}

weatherIcon.alt = data.weather[0].description;
        // Show weather card
        weatherCard.style.display = "block";

    } catch (err) {
    weatherCard.style.display = "none";

    if (err.message === "city not found") {
        error.textContent =
            "City not found. Please check the city name and try again.";
    } else {
        error.textContent =
            "Unable to fetch weather information. Please try again.";
    }

    console.log(err);
   }finally {

        loading.textContent = "";

    }
}