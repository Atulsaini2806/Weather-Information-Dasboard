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
const forecastContainer =
    document.getElementById("forecastContainer");

const forecastCards =
    document.getElementById("forecastCards");

// Current location elements
const locationBtn =
    document.getElementById("locationBtn");

const locationStatus =
    document.getElementById("locationStatus");

// Recent search elements
const recentSearches =
    document.getElementById("recentSearches");

const clearRecentBtn =
    document.getElementById("clearRecentBtn");

const recentHeader =
    document.getElementById("recentHeader");

const recentArrow =
    document.getElementById("recentArrow");


// =========================
// DARK MODE
// =========================

const darkModeBtn =
    document.getElementById("darkModeBtn");

// Dark mode ON by default
document.body.classList.add("dark-mode");

darkModeBtn.textContent =
    "☀️ Light Mode";

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        darkModeBtn.textContent =
            "☀️ Light Mode";

    } else {

        darkModeBtn.textContent =
            "🌙 Dark Mode";
    }

});


// =========================
// LOAD RECENT SEARCHES
// =========================

let recentCities =
    JSON.parse(localStorage.getItem("recentCities")) || [];

displayRecentSearches();


// =========================
// RECENT SEARCH TOGGLE
// =========================

recentHeader.addEventListener("click", () => {

    recentSearches.classList.toggle("recent-hidden");

    recentSearches.classList.toggle("recent-visible");


    if (
        recentSearches.classList.contains(
            "recent-visible"
        )
    ) {

        recentArrow.textContent = "▲";

    } else {

        recentArrow.textContent = "▼";
    }

});


// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener("click", () => {

    const city =
        cityInput.value.trim();

    if (city === "") {

        error.textContent =
            "Please enter a city name.";

        forecastContainer.style.display =
            "none";

        return;
    }


    // Prevent comma
    if (city.includes(",")) {

        error.textContent =
            "Please enter only the city name.";

        forecastContainer.style.display =
            "none";

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
// CURRENT LOCATION BUTTON
// =========================

locationBtn.addEventListener("click", () => {

    error.textContent = "";

    locationStatus.textContent =
        "📍 Getting your location...";

    loading.textContent =
        "Finding your current location...";


    // Check browser support
    if (!navigator.geolocation) {

        locationStatus.textContent = "";

        loading.textContent = "";

        error.textContent =
            "Geolocation is not supported by your browser.";

        return;
    }


    navigator.geolocation.getCurrentPosition(

        // SUCCESS
        async (position) => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;


            console.log(
                "Latitude:",
                lat
            );

            console.log(
                "Longitude:",
                lon
            );

            console.log(
                "Accuracy:",
                position.coords.accuracy,
                "meters"
            );


            locationStatus.textContent =
                "📍 Location found!";


            await getWeatherByLocation(
                lat,
                lon
            );
        },


        // ERROR
        (err) => {

            loading.textContent = "";

            locationStatus.textContent = "";


            if (err.code === 1) {

                error.textContent =
                    "Location permission was denied. Please allow location access.";

            } else if (err.code === 2) {

                error.textContent =
                    "Unable to determine your location.";

            } else if (err.code === 3) {

                error.textContent =
                    "Location request timed out.";

            } else {

                error.textContent =
                    "Unable to get your current location.";
            }

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});


// =========================
// GET WEATHER BY LOCATION
// =========================

async function getWeatherByLocation(lat, lon) {

    loading.textContent =
        "Fetching weather information......";

    error.textContent = "";

    try {

        // =================================
        // 1. GET WEATHER USING GPS
        // =================================

        const weatherUrl =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;


        const weatherResponse =
            await fetch(weatherUrl);


        if (!weatherResponse.ok) {

            throw new Error(
                "Unable to get weather."
            );
        }


        const data =
            await weatherResponse.json();


        // =================================
        // 2. GET LOCALITY / VILLAGE NAME
        // =================================

        let locationName =
            data.name;


        try {

            const reverseUrl =
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`;


            const reverseResponse =
                await fetch(reverseUrl);


            if (reverseResponse.ok) {

                const locationData =
                    await reverseResponse.json();


                if (
                    locationData &&
                    locationData.length > 0
                ) {

                    console.log(
                        "Reverse location data:",
                        locationData
                    );


                    // Look for the most local name
                    const localLocation =
                        locationData.find(
                            (place) =>
                                place.local_names
                        );


                    if (
                        localLocation &&
                        localLocation.name
                    ) {

                        locationName =
                            localLocation.name;

                    } else if (
                        locationData[0].name
                    ) {

                        locationName =
                            locationData[0].name;
                    }

                }

            }

        } catch (locationError) {

            console.log(
                "Reverse geocoding error:",
                locationError
            );

            // Keep OpenWeather weather location
            locationName =
                data.name;
        }


        // =================================
        // REMOVE INITIAL CENTERED MODE
        // =================================

        document.body.classList.add("searched");


        // =================================
        // LOCATION / VILLAGE NAME
        // =================================

        cityName.textContent =
            locationName;

        cityInput.value =
            locationName;


        // =================================
        // TEMPERATURE
        // =================================

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;


        // =================================
        // CONDITION
        // =================================

        condition.textContent =
            data.weather[0].description;


        // =================================
        // HUMIDITY
        // =================================

        humidity.textContent =
            data.main.humidity;


        // =================================
        // WIND SPEED
        // =================================

        windSpeed.textContent =
            (data.wind.speed * 3.6).toFixed(1);


        // =================================
        // WEATHER ICON
        // =================================

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


        // =================================
        // SHOW WEATHER CARD
        // =================================

        weatherCard.style.display =
            "block";


        // =================================
        // ADD TO RECENT SEARCHES
        // =================================

        addRecentSearch(
            locationName
        );


        // =================================
        // GET 5-DAY FORECAST
        // USING GPS COORDINATES
        // =================================

        getForecast(
            lat,
            lon
        );


        // =================================
        // LOCATION STATUS
        // =================================

        locationStatus.textContent =
            `📍 Showing weather for ${locationName}`;


    } catch (err) {

        console.log(err);

        weatherCard.style.display =
            "none";

        forecastContainer.style.display =
            "none";

        error.textContent =
            "Unable to get weather for your current location.";

    } finally {

        loading.textContent = "";
    }
}


// =========================
// GET CURRENT WEATHER
// =========================

async function getWeather(city) {

    loading.textContent =
        "Fetching weather information......";

    error.textContent = "";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        const response =
            await fetch(url);


        if (!response.ok) {

            const errorData =
                await response.json();

            throw new Error(
                errorData.message
            );
        }


        const data =
            await response.json();


        // Remove initial centered mode
        document.body.classList.add("searched");


        // =========================
        // CITY NAME
        // =========================

        cityName.textContent =
            data.name;


        // =========================
        // TEMPERATURE
        // =========================

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;


        // =========================
        // CONDITION
        // =========================

        condition.textContent =
            data.weather[0].description;


        // =========================
        // HUMIDITY
        // =========================

        humidity.textContent =
            data.main.humidity;


        // =========================
        // WIND SPEED
        // =========================

        windSpeed.textContent =
            (data.wind.speed * 3.6).toFixed(1);


        // =========================
        // WEATHER ICON
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
        // SHOW WEATHER CARD
        // =========================

        weatherCard.style.display =
            "block";


        // =========================
        // ADD TO RECENT SEARCHES
        // =========================

        addRecentSearch(
            data.name
        );


        // =========================
        // GET 5-DAY FORECAST
        // =========================

        getForecast(
            data.coord.lat,
            data.coord.lon
        );


    } catch (err) {

        weatherCard.style.display =
            "none";

        forecastContainer.style.display =
            "none";


        if (
            err.message ===
            "city not found"
        ) {

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


// ==================================================
// RECENT SEARCHES
// ==================================================


// =========================
// ADD RECENT SEARCH
// =========================

function addRecentSearch(city) {

    // Remove duplicate
    recentCities =
        recentCities.filter(
            item =>
                item.toLowerCase() !==
                city.toLowerCase()
        );


    // Add newest city first
    recentCities.unshift(city);


    // Keep last 5
    recentCities =
        recentCities.slice(0, 5);


    // Save
    localStorage.setItem(
        "recentCities",
        JSON.stringify(recentCities)
    );


    displayRecentSearches();
}


// =========================
// DISPLAY RECENT SEARCHES
// =========================

function displayRecentSearches() {

    recentSearches.innerHTML = "";


    // No searches
    if (recentCities.length === 0) {

        recentSearches.innerHTML =
            `
            <p class="no-recent">
                No recent searches
            </p>
            `;

        return;
    }


    recentCities.forEach(
        (city, index) => {

            const item =
                document.createElement("div");


            item.classList.add(
                "recent-item"
            );


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


            // Click city
            item
                .querySelector(
                    ".recent-city"
                )
                .addEventListener(
                    "click",
                    () => {

                        cityInput.value =
                            city;

                        getWeather(city);
                    }
                );


            // Remove city
            item
                .querySelector(
                    ".remove-recent"
                )
                .addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();

                        removeRecentSearch(
                            index
                        );
                    }
                );


            recentSearches.appendChild(
                item
            );

        }
    );

}


// =========================
// REMOVE ONE RECENT SEARCH
// =========================

function removeRecentSearch(index) {

    recentCities.splice(
        index,
        1
    );


    localStorage.setItem(
        "recentCities",
        JSON.stringify(recentCities)
    );


    displayRecentSearches();
}


// =========================
// CLEAR ALL RECENT SEARCHES
// =========================

clearRecentBtn.addEventListener(
    "click",
    () => {

        recentCities = [];


        localStorage.removeItem(
            "recentCities"
        );


        displayRecentSearches();
    }
);


// =========================
// GET 5-DAY FORECAST
// =========================

async function getForecast(lat, lon) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to fetch forecast"
            );
        }


        const data =
            await response.json();


        displayForecast(data);

    } catch (err) {

        console.log(err);

        forecastContainer.style.display =
            "none";
    }
}


// =========================
// DISPLAY FORECAST
// =========================

function displayForecast(data) {

    // Clear previous forecast
    forecastCards.innerHTML = "";


    // Select 12:00 PM forecast
    const dailyForecast =
        data.list.filter(
            (item) => {

                return item.dt_txt.includes(
                    "12:00:00"
                );

            }
        );


    // Display first 5 days
    dailyForecast
        .slice(0, 5)
        .forEach(
            (item) => {

                const date =
                    new Date(
                        item.dt * 1000
                    );


                // Day name
                const day =
                    date.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short"
                        }
                    );


                // Temperature
                const temp =
                    Math.round(
                        item.main.temp
                    );


                // Description
                const description =
                    item.weather[0]
                        .description;


                // Weather icon
                const icon =
                    item.weather[0].icon;


                // Create card
                const card =
                    document.createElement(
                        "div"
                    );


                card.classList.add(
                    "forecast-card"
                );


                card.innerHTML = `
                    <h3>${day}</h3>

                    <img
                        src="https://openweathermap.org/img/wn/${icon}@2x.png"
                        alt="${description}"
                    >

                    <p>${temp}°C</p>

                    <p>${description}</p>
                `;


                forecastCards.appendChild(
                    card
                );

            }
        );


    // Show forecast
    forecastContainer.style.display =
        "block";
}