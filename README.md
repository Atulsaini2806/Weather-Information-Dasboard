# 🌦️ Weather Information Dashboard

A responsive and user-friendly Weather Information Dashboard built using **HTML, CSS, and JavaScript**. This application allows users to search for any city and view its current weather conditions using the OpenWeatherMap API.

The dashboard provides real-time weather information, including temperature, weather conditions, humidity, wind speed, and weather icons, along with loading indicators and error handling for a better user experience.

## 🚀 Live Demo

*Add your deployed project link here.*

## 📸 Project Preview

*Add a screenshot of your Weather Information Dashboard here.*

## ✨ Features

* **City-Based Weather Search:** Search for current weather information by entering a city name.
* **Real-Time Weather Data:** Fetch weather information using the OpenWeatherMap API.
* **Temperature Display:** Shows the current temperature in Celsius.
* **Weather Conditions:** Displays weather descriptions such as clear sky, clouds, rain, etc.
* **Dynamic Weather Icons:** Displays weather icons based on current conditions.
* **Humidity Information:** Shows the humidity percentage of the selected city.
* **Wind Speed:** Displays the current wind speed in meters per second.
* **Loading State:** Displays a loading indicator while fetching weather data.
* **Error Handling:** Shows appropriate error messages for invalid city names, empty inputs, and API errors.
* **Input Validation:** Prevents invalid searches, including inputs containing commas.
* **Keyboard Support:** Allows users to search by pressing the Enter key.
* **Responsive Design:** Provides a user-friendly interface across different screen sizes.

## 🛠️ Technologies Used

| Technology         | Purpose                                |
| ------------------ | -------------------------------------- |
| HTML5              | Structure of the application           |
| CSS3               | Styling, layout, and responsive design |
| JavaScript (ES6+)  | Application logic and dynamic updates  |
| Fetch API          | Fetching weather data from the API     |
| OpenWeatherMap API | Providing current weather information  |

## 📂 Project Structure

```text
Weather-Information-Dashboard/
│
├── index.html       # Main HTML structure
├── style.css        # Styling and responsive design
├── script.js        # JavaScript logic and API integration
└── README.md        # Project documentation
```

## ⚙️ How to Run the Project Locally

Follow these steps to run the application on your computer.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Weather-Information-Dashboard.git
```

### 2. Navigate to the Project Folder

```bash
cd Weather-Information-Dashboard
```

### 3. Open the Project

Open the project folder in Visual Studio Code.

You can run the application using the **Live Server** extension or open the `index.html` file directly in your browser.

## 🔑 API Configuration

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to retrieve current weather information.

To configure your own API key:

1. Visit [OpenWeatherMap](https://openweathermap.org/).
2. Create an account or sign in.
3. Generate an API key from your account.
4. Open the `script.js` file.
5. Replace the placeholder API key with your own key.

```javascript
const API_KEY = "YOUR_API_KEY";
```

**Important:** Never share your API key publicly or commit a real API key to a public GitHub repository. For a public project, use a secure backend to protect API credentials.

## 📡 API Endpoint

The application uses the Current Weather Data API.

```text
https://api.openweathermap.org/data/2.5/weather
```

The API request includes the following parameters:

* `q` – City name entered by the user.
* `appid` – Your OpenWeatherMap API key.
* `units=metric` – Returns temperature in Celsius.

Example request:

```text
https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric
```

## 🧠 Key Concepts Implemented

This project helped me practice and understand several important JavaScript concepts:

* DOM Manipulation
* Event Listeners
* Asynchronous JavaScript
* Async/Await
* Fetch API
* Promises
* JSON Data Handling
* Try-Catch Error Handling
* Conditional Statements
* Input Validation
* Dynamic Content Rendering
* API Integration

## ⚠️ Error Handling

The application handles different scenarios to improve reliability and user experience.

| Scenario                | Application Behavior                                         |
| ----------------------- | ------------------------------------------------------------ |
| Empty input             | Displays a message asking the user to enter a city name      |
| Invalid city name       | Displays a city-not-found error                              |
| Input containing commas | Requests the user to enter only the city name                |
| Invalid API key         | Displays an appropriate API error message                    |
| Network failure         | Displays an error message if the request fails               |
| Data loading            | Shows a loading indicator while fetching weather information |

## 🔮 Future Improvements

* Add a 5-day weather forecast.
* Display sunrise and sunset times.
* Add automatic location detection.
* Implement recent search history.
* Add dark and light mode.
* Improve animations and transitions.
* Add temperature unit conversion between Celsius and Fahrenheit.

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Building a responsive web application using HTML and CSS.
* Understanding and implementing the Fetch API.
* Connecting a frontend application with a public API.
* Fetching and displaying dynamic data based on user input.
* Managing loading states and API errors.
* Working with asynchronous JavaScript.
* Improving user experience through input validation and error handling.

## 👨‍💻 Author

**Atul Saini**

* GitHub: [Atulsaini2806](https://github.com/Atulsaini2806)
* LinkedIn: *Add your LinkedIn profile link here.*

---

⭐ If you find this project useful, feel free to star the repository!
