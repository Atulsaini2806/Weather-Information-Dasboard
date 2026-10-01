const API_KEY = "4d327cc30cf9fb80e21af83b31893258";


const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const currentDate = document.getElementById("currentDate");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

// Initial Weather Message
const initialWeatherMessage = document.getElementById("initialWeatherMessage");
const weatherContent = document.getElementById("weatherContent");

initialWeatherMessage.style.display = "flex";
weatherContent.style.display = "none";

// Forecast Elements
const forecastContainer = document.getElementById("forecastContainer");
const forecastCards = document.getElementById("forecastCards");

// Current Location Elements
const locationBtn = document.getElementById("locationBtn");
const locationStatus = document.getElementById("locationStatus");

// Recent Search Elements
const recentSearches = document.getElementById("recentSearches");
const clearRecentBtn = document.getElementById("clearRecentBtn");
const recentHeader = document.getElementById("recentHeader");
const recentArrow = document.getElementById("recentArrow");

// Dark Mode Button
const darkModeBtn = document.getElementById("darkModeBtn");

// Dark Mode
document.body.classList.add("dark-mode");
darkModeBtn.textContent = "☀️ Light Mode";

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});

// Load Recent Searches
let recentCities = JSON.parse(
    localStorage.getItem("recentCities")
) || [];

displayRecentSearches();

// Recent Search Toggle
recentHeader.addEventListener("click", () => {
    recentSearches.classList.toggle("recent-hidden");
    recentSearches.classList.toggle("recent-visible");

    if (recentSearches.classList.contains("recent-visible")) {
        recentArrow.textContent = "▲";
    } else {
        recentArrow.textContent = "▼";
    }
});

// Search Button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        error.textContent = "Please enter a city name.";
        forecastContainer.style.display = "none";
        return;
    }

    // Prevent comma
    if (city.includes(",")) {
        error.textContent = "Please enter only the city name.";
        forecastContainer.style.display = "none";
        return;
    }

    getWeather(city);
});

// Press Enter to Search
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// Current Location Button
locationBtn.addEventListener("click", () => {
    error.textContent = "";
    locationStatus.textContent = "📍 Getting your location...";
    loading.textContent = "Finding your current location...";

    // Fallback Location
    const fallbackLatitude = 30.1714;
    const fallbackLongitude = 77.6200;

    // Check Browser Support
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported.");

        locationStatus.textContent = "📍 Showing weather near Behat";

        getWeatherByLocation(
            fallbackLatitude,
            fallbackLongitude
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(
        // Success
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            console.log("Latitude:", lat);
            console.log("Longitude:", lon);
            console.log("Accuracy:", accuracy, "meters");

            // Good Location Accuracy
            if (accuracy <= 10000) {
                console.log("Good location accuracy.");

                locationStatus.textContent = "📍 Location found!";

                await getWeatherByLocation(lat, lon);
                return;
            }

            // Poor Location Accuracy
            console.log("Location accuracy is too poor.");
            console.log("Using Murtazapur / Behat coordinates.");

            locationStatus.textContent = "📍 Showing weather near Behat";

            await getWeatherByLocation(
                fallbackLatitude,
                fallbackLongitude
            );
        },

        // Location Error
        async (err) => {
            console.log("Location error:", err);

            locationStatus.textContent = "📍 Showing weather near Behat";

            await getWeatherByLocation(
                fallbackLatitude,
                fallbackLongitude
            );
        },

        // Location Options
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        }
    );
});

// Get Weather by Location
async function getWeatherByLocation(lat, lon) {
    loading.textContent = "Fetching weather information......";
    error.textContent = "";

    try {
        // Weather Using Latitude and Longitude
        const weatherUrl =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error("Unable to get weather.");
        }

        const data = await weatherResponse.json();

        // Location Name
        let locationName = data.name;

        // Reverse Geocoding
        try {
            const reverseUrl =
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`;

            const reverseResponse = await fetch(reverseUrl);

            if (reverseResponse.ok) {
                const locationData = await reverseResponse.json();

                if (
                    locationData &&
                    locationData.length > 0
                ) {
                    console.log(
                        "Reverse location data:",
                        locationData
                    );

                    if (locationData[0].name) {
                        locationName = locationData[0].name;
                    }
                }
            }
        } catch (locationError) {
            console.log(
                "Reverse geocoding error:",
                locationError
            );

            locationName = data.name;
        }

        // Change to Searched Layout
        document.body.classList.add("searched");

        // Show Actual Weather
        initialWeatherMessage.style.display = "none";
        weatherContent.style.display = "block";

        // Location Name
        cityName.textContent = locationName;
        cityInput.value = locationName;

        // Current Date
        currentDate.textContent = formatCurrentDate(data.dt);

        // Temperature
        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        // Condition
        condition.textContent =
            data.weather[0].description;

        // Humidity
        humidity.textContent =
            data.main.humidity;

        // Wind Speed
        windSpeed.textContent =
            (data.wind.speed * 3.6).toFixed(1);

        // Weather Icon
        setWeatherIcon(
            data.weather[0].main,
            data.weather[0].description
        );

        // Show Weather Card
        weatherCard.style.display = "block";

        // Add to Recent Searches
        addRecentSearch(locationName);

        // Get Forecast
        getForecast(lat, lon);

        // Location Status
        locationStatus.textContent =
            `📍 Showing weather for ${locationName}`;
    } catch (err) {
        console.log(err);

        weatherCard.style.display = "none";
        forecastContainer.style.display = "none";

        error.textContent =
            "Unable to get weather for your current location.";
    } finally {
        loading.textContent = "";
    }
}

// Get Current Weather by City
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

        // Change to Searched Layout
        document.body.classList.add("searched");

        // Show Actual Weather
        initialWeatherMessage.style.display = "none";
        weatherContent.style.display = "block";

        // City Name
        cityName.textContent = data.name;

        // Current Date
        currentDate.textContent = formatCurrentDate(data.dt);

        // Temperature
        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        // Condition
        condition.textContent =
            data.weather[0].description;

        // Humidity
        humidity.textContent =
            data.main.humidity;

        // Wind Speed
        windSpeed.textContent =
            (data.wind.speed * 3.6).toFixed(1);

        // Weather Icon
        setWeatherIcon(
            data.weather[0].main,
            data.weather[0].description
        );

        // Show Weather Card
        weatherCard.style.display = "block";

        // Add to Recent Searches
        addRecentSearch(data.name);

        // Get Forecast
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

// Format Current Date
function formatCurrentDate(timestamp) {
    const date = new Date(timestamp * 1000);

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );
}

// Weather Icon
function setWeatherIcon(weatherType, description) {
    const weather = weatherType.toLowerCase();

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

    weatherIcon.alt = description;
}

// Add Recent Search
function addRecentSearch(city) {
    // Remove Duplicate
    recentCities = recentCities.filter(
        item =>
            item.toLowerCase() !== city.toLowerCase()
    );

    // Add Newest City First
    recentCities.unshift(city);

    // Keep Last 5
    recentCities = recentCities.slice(0, 5);

    // Save
    localStorage.setItem(
        "recentCities",
        JSON.stringify(recentCities)
    );

    displayRecentSearches();
}

// Display Recent Searches
function displayRecentSearches() {
    recentSearches.innerHTML = "";

    // No Searches
    if (recentCities.length === 0) {
        recentSearches.innerHTML = `
            <p class="no-recent">
                No recent searches
            </p>
        `;

        return;
    }

    recentCities.forEach((city, index) => {
        const item = document.createElement("div");

        item.classList.add("recent-item");

        item.innerHTML = `
            <span class="recent-city">
                🔎 ${city}
            </span>

            <button
                class="remove-recent"
                data-index="${index}"
                title="Remove"
            >
                ✕
            </button>
        `;

        // Click City
        item
            .querySelector(".recent-city")
            .addEventListener("click", () => {
                cityInput.value = city;
                getWeather(city);
            });

        // Remove City
        item
            .querySelector(".remove-recent")
            .addEventListener("click", (event) => {
                event.stopPropagation();
                removeRecentSearch(index);
            });

        recentSearches.appendChild(item);
    });
}

// Remove One Recent Search
function removeRecentSearch(index) {
    recentCities.splice(index, 1);

    localStorage.setItem(
        "recentCities",
        JSON.stringify(recentCities)
    );

    displayRecentSearches();
}

// Clear All Recent Searches
clearRecentBtn.addEventListener("click", () => {
    recentCities = [];

    localStorage.removeItem("recentCities");

    displayRecentSearches();
});

// Get 5-Day Forecast
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

// Display Forecast
function displayForecast(data) {
    // Clear Previous Forecast
    forecastCards.innerHTML = "";

    // Select 12:00 PM Forecast
    const dailyForecast = data.list.filter((item) => {
        return item.dt_txt.includes("12:00:00");
    });

    // Display First 5 Days
    dailyForecast
        .slice(0, 5)
        .forEach((item) => {
            const date = new Date(item.dt * 1000);

            // Day Name
            const day = date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );

            // Forecast Date
            const forecastDate = date.toLocaleDateString(
                "en-US",
                {
                    day: "2-digit",
                    month: "short"
                }
            );

            // Temperature
            const temp = Math.round(item.main.temp);

            // Description
            const description =
                item.weather[0].description;

            // Weather Icon
            const icon = item.weather[0].icon;

            // Create Card
            const card = document.createElement("div");

            card.classList.add("forecast-card");

            card.innerHTML = `
                <h3>
                    ${day}
                </h3>

                <p class="forecast-date">
                    ${forecastDate}
                </p>

                <img
                    src="https://openweathermap.org/img/wn/${icon}@2x.png"
                    alt="${description}"
                >

                <p>
                    ${temp}°C
                </p>

                <p>
                    ${description}
                </p>
            `;

            forecastCards.appendChild(card);
        });

    // Show Forecast
    forecastContainer.style.display = "block";
}