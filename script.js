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

// Forecast elements
const forecastContainer = document.getElementById("forecastContainer");
const forecastCards = document.getElementById("forecastCards");

// =========================
// DARK MODE
// =========================

const darkModeBtn =
    document.getElementById("darkModeBtn");

//     // Dark mode is ON by default
// document.body.classList.add("dark-mode");

// darkModeBtn.textContent = "☀️ Light Mode";

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        darkModeBtn.textContent = "☀️ Light Mode";

    } else {

        darkModeBtn.textContent = "🌙 Dark Mode";
    }

});




// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        error.textContent = "Please enter a city name";
        //`weatherCard.style.display = "none";
        forecastContainer.style.display = "none";
        return;
    }

    // Prevent city input containing a comma
    if (city.includes(",")) {
        error.textContent = "Please enter only the city name.";
        //weatherCard.style.display = "none";
        forecastContainer.style.display = "none";
        return;
    }

    getWeather(city);
});


// =========================
// PRESS ENTER TO SEARCH
// =========================

cityInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


// =========================
// GET CURRENT WEATHER
// =========================

async function getWeather(city) {

    loading.textContent = "Fetching weather information......";
    error.textContent = "";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {

            const errorData = await response.json();

            throw new Error(errorData.message);
        }

        const data = await response.json();


        // =========================
        // REMOVE INITIAL CENTERED MODE
        // =========================

        document.body.classList.add("searched");


        // =========================
        // DISPLAY CITY NAME
        // =========================

        cityName.textContent = data.name;


        // =========================
        // DISPLAY TEMPERATURE
        // =========================

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;


        // =========================
        // DISPLAY WEATHER CONDITION
        // =========================

        condition.textContent =
            data.weather[0].description;


        // =========================
        // DISPLAY HUMIDITY
        // =========================

        humidity.textContent =
            data.main.humidity;


        // =========================
        // CONVERT WIND SPEED
        // m/s → km/h
        // =========================

        windSpeed.textContent =
            (data.wind.speed * 3.6).toFixed(1);


        // =========================
        // DISPLAY WEATHER ICON
        // =========================

        const weather =
            data.weather[0].main.toLowerCase();


        if (weather.includes("clear")) {

            weatherIcon.src =
                "https://cdn-icons-png.flaticon.com/512/869/869869.png";

        } else if (weather.includes("cloud")) {

            weatherIcon.src =
                "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";

        } else if (weather.includes("rain")) {

            weatherIcon.src =
                "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";

        } else if (weather.includes("thunder")) {

            weatherIcon.src =
                "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";

        } else {

            weatherIcon.src =
                "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
        }


        weatherIcon.alt =
            data.weather[0].description;


        // =========================
        // SHOW CURRENT WEATHER CARD
        // =========================

        weatherCard.style.display = "block";


        // =========================
        // GET 5-DAY FORECAST
        // =========================

        getForecast(
            data.coord.lat,
            data.coord.lon
        );


    } catch (err) {

        weatherCard.style.display = "none";
        forecastContainer.style.display = "none";

        if (err.message === "city not found") {

            error.textContent =
                "City not found. Please check the city name and try again.";

        } else {

            error.textContent =
                "Unable to fetch weather information. Please try again.";
        }

        console.log(err);

    } finally {

        loading.textContent = "";
    }
}


// =========================
// GET 5-DAY FORECAST
// =========================

async function getForecast(lat, lon) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch forecast");
        }

        const data = await response.json();

        displayForecast(data);

    } catch (err) {

        console.log(err);

        forecastContainer.style.display = "none";
    }
}


// =========================
// DISPLAY FORECAST
// =========================

function displayForecast(data) {

    // Clear previous forecast
    forecastCards.innerHTML = "";


    // Select 12:00 PM forecast from each day
    const dailyForecast = data.list.filter((item) => {

        return item.dt_txt.includes("12:00:00");

    });


    // Display first 5 days
    dailyForecast.slice(0, 5).forEach((item) => {

        const date =
            new Date(item.dt * 1000);


        // Get day name
        const day =
            date.toLocaleDateString("en-US", {
                weekday: "short"
            });


        // Get temperature
        const temp =
            Math.round(item.main.temp);


        // Get weather description
        const description =
            item.weather[0].description;


        // Get OpenWeather icon
        const icon =
            item.weather[0].icon;


        // Create forecast card
        const card =
            document.createElement("div");


        card.classList.add("forecast-card");


        card.innerHTML = `
            <h3>${day}</h3>

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
            >

            <p>${temp}°C</p>

            <p>${description}</p>
        `;


        forecastCards.appendChild(card);

    });


    // Show forecast
    forecastContainer.style.display = "block";
}